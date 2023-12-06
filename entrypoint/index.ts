import fs from 'fs/promises';
import { spawn } from 'child_process';
import toml from '@iarna/toml';

let configPath = process.env.CONFIG_FILE || '~/.s3cfg';
if (process.env.HOME) {
  configPath = configPath.replace('~', process.env.HOME);
}

// Read config file
let config: toml.JsonMap = {};
try {
  const contents = await fs.readFile(configPath, 'utf-8');
  config = toml.parse(contents);
} catch {
  // ignore
}

// Fill environment variables
if (process.env.HOST_BUCKET) {
  config.host_bucket = process.env.HOST_BUCKET;
}

if (process.env.HOST_BASE) {
  config.host_base = process.env.HOST_BASE;
}

if (process.env.USE_HTTPS) {
  config.use_https = process.env.USE_HTTPS === 'true';
}

if (process.env.WEBSITE_ENDPOINT) {
  config.website_endpoint = process.env.WEBSITE_ENDPOINT;
}

if (process.env.ACCESS_KEY) {
  config.access_key = process.env.AWS_ACCESS_KEY ?? process.env.ACCESS_KEY;
}

if (process.env.SECRET_KEY) {
  config.secret_key = process.env.AWS_SECRET_KEY ?? process.env.SECRET_KEY;
}

if (process.env.REGION) {
  config.region = process.env.REGION;
}

// Write config file
await fs.writeFile(configPath, toml.stringify(config));

// Run s3cmd
await new Promise((resolve, reject) => {
  const cmd = spawn('s3cmd', process.argv.slice(2));

  cmd.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  cmd.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  cmd.on('close', (code) => {
    if (code === 0) {
      resolve(code);
    } else {
      reject(new Error(`Exited with error code: ${code}`));
    }
  });
});

