# coco

![Docker](https://github.com/chrisvrose/coco/workflows/Docker/badge.svg)

Opinionated attempt at dev.

## API standard response

### Standard

A corresponding status code

```json
{
    "ok":true,
    "response": {}
}
```
### Error

A corresponding status code is returned

```json
{
    "ok":false,
    "status":"<error>"
}