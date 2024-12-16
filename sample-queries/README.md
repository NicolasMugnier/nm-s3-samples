# S3 Queries

## Deploy

```bash
sls deploy
```

```bash
aws s3 ls
```

```bash
2022-09-20 15:14:52 nm-sample-queries
2022-09-20 15:14:08 sample-queries-dev-serverlessdeploymentbucket-xxxxxxxxxxxxx
```

```bash
gzip file.json
aws s3 cp --recursive ./samples s3://nm-sample-queries
```

```bash
aws s3 ls nm-sample-queries
```

## Sample query

### CSV

```SQL
SELECT * FROM s3object s LIMIT 5
SELECT * FROM s3Object s WHERE s.City = "Chicago"
```

### JSON (Document)

```SQL
SELECT * FROM s3Object s LIMIT 5
SELECT * FROM s3object[*][*] s WHERE s.city = 'Chicago'
```

### JSON (Lines)

```SQL
SELECT * FROM s3Object s LIMIT 5
SELECT * FROM s3object s WHERE s.city = 'Chicago'
```

### Compressed file

```SQL
SELECT * FROM s3Object s LIMIT 5
SELECT * FROM s3object[*][*] s WHERE s.city = 'Chicago'
```

## Documentation

- [S3 Select](https://aws.amazon.com/blogs/storage/querying-data-without-servers-or-databases-using-amazon-s3-select/)
- [S3 API - SelectObjectContent](https://docs.aws.amazon.com/AmazonS3/latest/API/API_SelectObjectContent.html)
- [S3 SQL Reference](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-glacier-select-sql-reference.html)
