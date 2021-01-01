# coco

![Docker](https://github.com/chrisvrose/coco/workflows/Docker/badge.svg)

Opinionated attempt at dev.

## What?

An application that should also yield a collection of highly reusable server components.

## Why

An exploration of tests+ORMs+AOP.

## Progress

- [X] Users
- [X] Authtokens
- [X] Decorators and Middleware for routes, controllers and models
- [X] Authorization middleware
- [ ] Test resource (Posts)
- [ ] ???


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