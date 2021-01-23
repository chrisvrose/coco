# coco

![Docker](https://github.com/chrisvrose/coco/workflows/Docker/badge.svg)

Opinionated attempt at dev.

## What?

An generic server application, that has:
 - Users
 - Auth
 - Posts
 - Tests
This application also yields a collection of highly reusable server components.

## Why

- An exploration of tests+ORMs+AOP+CI/CD. 
- Attempting to combine validation and entities using decorators

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