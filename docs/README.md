# AutoDev Studio Documentation

## Overview

This directory contains API documentation, error handling guides, and architecture decision records for AutoDev Studio.

## Contents

- `openapi.yaml` - OpenAPI 3.0 specification for the core API
- `error-codes.md` - Common error codes and resolution guides
- `adr-001-resilience.md` - Architecture Decision Record for resilience patterns
- `examples.md` - Code examples for using observability and resilience middleware

## API Documentation

The OpenAPI specification (`openapi.yaml`) defines the following endpoints:

- `GET /health` - Health check endpoint
- `GET /metrics` - Service metrics
- `GET /api/projects` - List projects
- `POST /api/projects` - Create a project

## Error Handling

See `error-codes.md` for:
- Client errors (4xx) with resolution guides
- Server errors (5xx) with retry guidance
- Circuit breaker errors
- Retry and fallback strategies

## Architecture Decisions

The `adr-001-resilience.md` documents our decision to implement layered resilience patterns including error handling, circuit breakers, exponential backoff, and fallback strategies.

## Code Examples

`examples.md` provides practical code snippets for:
- Setting up observability middleware
- Using circuit breakers and retry patterns
- Implementing fallback strategies
- Error handling integration

## Contributing

When making changes to the API:

1. Update `openapi.yaml` with new endpoints or schemas
2. Document any new error codes in `error-codes.md`
3. Create new ADR files for significant architectural changes
4. Update code examples as needed