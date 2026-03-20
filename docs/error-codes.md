# Error Codes and Resolution Guides

## Client Errors (4xx)

### 400 Bad Request
**Code:** `BAD_REQUEST`
**Description:** The request was malformed or missing required parameters.
**Resolution:** Check request body and query parameters against the OpenAPI spec.

### 401 Unauthorized
**Code:** `UNAUTHORIZED`
**Description:** Authentication credentials were missing or invalid.
**Resolution:** Provide valid authentication token in the Authorization header.

### 403 Forbidden
**Code:** `FORBIDDEN`
**Description:** The authenticated user lacks permission for the requested resource.
**Resolution:** Contact an administrator to grant necessary permissions.

### 404 Not Found
**Code:** `NOT_FOUND`
**Description:** The requested resource does not exist.
**Resolution:** Verify the resource identifier and endpoint path.

### 429 Too Many Requests
**Code:** `RATE_LIMITED`
**Description:** Request rate limit exceeded.
**Resolution:** Wait and retry after the indicated period, or implement exponential backoff.

## Server Errors (5xx)

### 500 Internal Server Error
**Code:** `INTERNAL_ERROR`
**Description:** An unexpected server error occurred.
**Resolution:** Contact support with request details and timestamp.

### 502 Bad Gateway
**Code:** `BAD_GATEWAY`
**Description:** Service received an invalid response from an upstream service.
**Resolution:** Retry the request; if persistent, check dependency health.

### 503 Service Unavailable
**Code:** `SERVICE_UNAVAILABLE`
**Description:** Service is temporarily down or under maintenance.
**Resolution:** Retry after a delay using exponential backoff.

## Circuit Breaker Errors

### 503 Circuit Breaker Open
**Code:** `CIRCUIT_BREAKER_OPEN`
**Description:** The circuit breaker is open due to consecutive failures.
**Resolution:** Wait for the reset timeout and retry; consider fallback strategies.

## Retry Guidance

When encountering transient errors (5xx, network issues), implement exponential backoff with jitter:

1. Initial delay: 1 second
2. Maximum delay: 10 seconds
3. Maximum attempts: 3
4. Add random jitter to prevent thundering herd

## Fallback Strategies

For critical external dependencies:
1. Cache recent successful responses
2. Return default/cached data
3. Degrade gracefully with reduced functionality
4. Queue requests for later processing