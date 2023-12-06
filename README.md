# s3cmd

Creates a docker image containing the s3cmd CLI to help migrate data into S3 buckets

## Usage

```bash
$ docker run -e ACCESS_KEY=test -e SECRET_KEY=test architectio/s3cmd:latest --help
```

### Environment Variables

| Variable | Description |
| -------- | ----------- |
| ACCESS_KEY | AWS Access Key |
| SECRET_KEY | AWS Secret Key |
| REGION | AWS Region |
| USE_HTTPS | Use HTTPS to connect to the S3 host |
| HOST_BASE | S3 host base URL |
| HOST_BUCKET | S3 host bucket URL |
| WEBSITE_ENDPOINT | S3 website endpoint |