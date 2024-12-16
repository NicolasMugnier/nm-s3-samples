# Sample Website

## Deploy

```bash
sls deploy
```

```bash
aws s3 cp --recursive src s3://nm-sample-website
aws s3 website s3://nm-sample-website --index-document index.html --error-document error.html
```

```bash
aws s3api put-bucket-policy --bucket nm-sample-website --policy file://policy.json
```

## Access

```bash
curl -XGET http://nm-sample-website.s3-website-eu-west-1.amazonaws.com/
```

## Clean

```bash
aws s3 rm --recursive s3://nm-sample-website/
sls remove
```
