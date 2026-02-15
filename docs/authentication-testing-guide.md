# Authentication Testing Guide

Practical guide for QA engineers testing the UPEX DOJO authentication system.

## Table of Contents

1. [Test Environment](#test-environment)
2. [Test Credentials](#test-credentials)
3. [Testing UI Authentication](#testing-ui-authentication)
4. [Testing API Authentication](#testing-api-authentication)
5. [Test Cases](#test-cases)
6. [Automation Examples](#automation-examples)
7. [Common Issues & Debugging](#common-issues--debugging)

---

## Test Environment

| Environment | URL | Branch |
|-------------|-----|--------|
| **Staging (Production)** | https://dojo.upexgalaxy.com | `staging` |
| **Local** | http://localhost:3000 | - |

### API Documentation

- **Swagger UI**: https://dojo.upexgalaxy.com/api/docs
- **OpenAPI Spec**: https://dojo.upexgalaxy.com/api/swagger.json

---

## Test Credentials

| User Type | Email | Password | Notes |
|-----------|-------|----------|-------|
| Test User | `testuser@upex.dev` | `Test123!` | Standard test account |
| Admin | `admin@upex.dev` | `Admin123!` | Admin test account |

These accounts are seeded in the database and available in both staging and local environments.

---

## Testing UI Authentication

### Login Flow

**Page**: `/login`

**Elements (data-testid)**:
| Element | data-testid | Type |
|---------|-------------|------|
| Email input | `login-email-input` | text field |
| Password input | `login-password-input` | password field |
| Submit button | `login-submit-button` | button |

**Expected Behavior**:

1. **Successful Login**:
   - User enters valid credentials
   - Clicks "Sign in"
   - Redirected to `/dashboard`
   - Session cookie set (`__Secure-authjs.session-token`)

2. **Failed Login**:
   - User enters invalid credentials
   - Error message displayed
   - Stays on `/login` page
   - No session cookie set

3. **Already Logged In**:
   - User navigates to `/login` while authenticated
   - Automatically redirected to `/dashboard`

### Registration Flow

**Page**: `/register`

**Elements (data-testid)**:
| Element | data-testid | Type |
|---------|-------------|------|
| Name input | `register-name-input` | text field |
| Email input | `register-email-input` | text field |
| Password input | `register-password-input` | password field |
| Submit button | `register-submit-button` | button |

**Expected Behavior**:

1. **Successful Registration**:
   - User fills all fields with valid data
   - Clicks submit
   - Account created
   - Redirected to `/login` (or auto-logged in)

2. **Duplicate Email**:
   - User tries to register with existing email
   - Error: "User already exists"
   - Status: 409 Conflict

3. **Validation Errors**:
   - Invalid email format: Error shown
   - Password < 6 characters: Error shown
   - Name < 2 characters: Error shown

### Logout Flow

**Location**: Dashboard navigation menu

**Expected Behavior**:
- User clicks logout
- Session cookie deleted
- Redirected to `/login` or home page
- Protected routes no longer accessible

---

## Testing API Authentication

### Base URL

```
Staging: https://dojo.upexgalaxy.com
Local:   http://localhost:3000
```

### API Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   API Authentication Flow                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   1. Login Request                                           │
│   POST /api/auth/login                                       │
│   Body: { "email": "...", "password": "..." }               │
│                         │                                    │
│                         ▼                                    │
│   2. Receive Token                                           │
│   Response: { "access_token": "eyJ...", ... }               │
│                         │                                    │
│                         ▼                                    │
│   3. Use Token in Requests                                   │
│   Header: Authorization: Bearer eyJ...                       │
│                         │                                    │
│                         ▼                                    │
│   4. Access Protected Resources                              │
│   GET /api/tasks, GET /api/auth/me, etc.                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Login Endpoint

**Request**:
```bash
curl -X POST https://dojo.upexgalaxy.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "testuser@upex.dev", "password": "Test123!"}'
```

**Success Response (200)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

**Error Responses**:

| Status | Condition | Response |
|--------|-----------|----------|
| 400 | Invalid format | `{ "error": "Invalid email or password format" }` |
| 401 | Wrong credentials | `{ "error": "Invalid credentials" }` |
| 500 | Server error | `{ "error": "Internal server error" }` |

### Using the Token

```bash
# Store token
TOKEN="eyJhbGciOiJIUzI1NiIs..."

# Use in requests
curl https://dojo.upexgalaxy.com/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

curl https://dojo.upexgalaxy.com/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

### Get Current User

**Request**:
```bash
curl https://dojo.upexgalaxy.com/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

**Success Response (200)**:
```json
{
  "user": {
    "id": "uuid-here",
    "email": "testuser@upex.dev",
    "name": "Test User",
    "createdAt": "2026-02-10T05:42:07.533Z",
    "updatedAt": "2026-02-10T05:42:07.533Z"
  }
}
```

---

## Test Cases

### TC-AUTH-001: Successful UI Login

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/login` | Login page displayed |
| 2 | Enter `testuser@upex.dev` in email field | Email accepted |
| 3 | Enter `Test123!` in password field | Password accepted (masked) |
| 4 | Click "Sign in" button | Loading state shown |
| 5 | Wait for redirect | Redirected to `/dashboard` |
| 6 | Verify session cookie | `__Secure-authjs.session-token` present |

### TC-AUTH-002: Failed UI Login - Wrong Password

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/login` | Login page displayed |
| 2 | Enter `testuser@upex.dev` in email field | Email accepted |
| 3 | Enter `wrongpassword` in password field | Password accepted |
| 4 | Click "Sign in" button | Loading state shown |
| 5 | Wait for response | Error message displayed |
| 6 | Verify URL | Still on `/login` |
| 7 | Verify cookies | No session cookie set |

### TC-AUTH-003: Failed UI Login - Invalid Email Format

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `/login` | Login page displayed |
| 2 | Enter `notanemail` in email field | Email field shows error |
| 3 | Click "Sign in" button | Form validation prevents submit |

### TC-AUTH-004: Successful API Login

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | POST to `/api/auth/login` with valid credentials | Status: 200 |
| 2 | Verify response body | Contains `access_token`, `token_type`, `expires_in` |
| 3 | Decode JWT payload | Contains `id`, `email`, `name`, `iat`, `exp` |
| 4 | Use token in `/api/auth/me` request | Returns user info |

### TC-AUTH-005: API Token Expiration

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login and get token | Token received |
| 2 | Verify `expires_in` value | Should be `86400` (24 hours) |
| 3 | Decode JWT and check `exp` claim | Should be `iat + 86400` |
| 4 | Use expired token (mock or wait) | Status: 401 Unauthorized |

### TC-AUTH-006: Protected Route Without Auth

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Clear all cookies | No session |
| 2 | Navigate to `/dashboard` | Redirected to `/login?callbackUrl=%2Fdashboard` |
| 3 | After login | Redirected back to `/dashboard` |

### TC-AUTH-007: API Request Without Token

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | GET `/api/tasks` without Authorization header | Status: 401 |
| 2 | Verify response | `{ "error": "Unauthorized" }` |

### TC-AUTH-008: API Request With Invalid Token

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | GET `/api/tasks` with `Authorization: Bearer invalid` | Status: 401 |
| 2 | Verify response | `{ "error": "Unauthorized" }` |

### TC-AUTH-009: User Registration

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | POST to `/api/auth/register` with new user data | Status: 201 |
| 2 | Try to register same email again | Status: 409 |
| 3 | Login with new credentials | Success |

### TC-AUTH-010: Multi-Tenant Data Isolation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login as User A, create task | Task created with User A's ID |
| 2 | Login as User B, list tasks | User A's task NOT visible |
| 3 | User B tries to access User A's task by ID | Status: 404 |

---

## Automation Examples

### JavaScript (Playwright)

```javascript
import { test, expect } from '@playwright/test';

test('successful login flow', async ({ page }) => {
  await page.goto('/login');

  await page.getByTestId('login-email-input').fill('testuser@upex.dev');
  await page.getByTestId('login-password-input').fill('Test123!');
  await page.getByTestId('login-submit-button').click();

  await expect(page).toHaveURL('/dashboard');

  // Verify session cookie exists
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name.includes('session-token'));
  expect(sessionCookie).toBeDefined();
});

test('API authentication', async ({ request }) => {
  // Login
  const loginResponse = await request.post('/api/auth/login', {
    data: {
      email: 'testuser@upex.dev',
      password: 'Test123!'
    }
  });

  expect(loginResponse.status()).toBe(200);
  const { access_token } = await loginResponse.json();

  // Use token
  const tasksResponse = await request.get('/api/tasks', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  expect(tasksResponse.status()).toBe(200);
});
```

### Python (pytest + requests)

```python
import pytest
import requests

BASE_URL = "https://dojo.upexgalaxy.com"

@pytest.fixture
def auth_token():
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "testuser@upex.dev",
        "password": "Test123!"
    })
    assert response.status_code == 200
    return response.json()["access_token"]

def test_successful_login():
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "testuser@upex.dev",
        "password": "Test123!"
    })

    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "Bearer"
    assert data["expires_in"] == 86400

def test_invalid_credentials():
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "email": "testuser@upex.dev",
        "password": "wrongpassword"
    })

    assert response.status_code == 401
    assert response.json()["error"] == "Invalid credentials"

def test_get_tasks_with_token(auth_token):
    response = requests.get(
        f"{BASE_URL}/api/tasks",
        headers={"Authorization": f"Bearer {auth_token}"}
    )

    assert response.status_code == 200
    assert "tasks" in response.json()

def test_unauthorized_without_token():
    response = requests.get(f"{BASE_URL}/api/tasks")

    assert response.status_code == 401
```

### Java (RestAssured)

```java
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.*;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class AuthenticationTest {

    private static String baseUrl = "https://dojo.upexgalaxy.com";
    private String accessToken;

    @BeforeAll
    static void setup() {
        RestAssured.baseURI = baseUrl;
    }

    @BeforeEach
    void login() {
        Response response = given()
            .contentType("application/json")
            .body("{\"email\":\"testuser@upex.dev\",\"password\":\"Test123!\"}")
        .when()
            .post("/api/auth/login")
        .then()
            .statusCode(200)
            .extract().response();

        accessToken = response.jsonPath().getString("access_token");
    }

    @Test
    void testSuccessfulLogin() {
        given()
            .contentType("application/json")
            .body("{\"email\":\"testuser@upex.dev\",\"password\":\"Test123!\"}")
        .when()
            .post("/api/auth/login")
        .then()
            .statusCode(200)
            .body("access_token", notNullValue())
            .body("token_type", equalTo("Bearer"))
            .body("expires_in", equalTo(86400));
    }

    @Test
    void testGetTasksWithToken() {
        given()
            .header("Authorization", "Bearer " + accessToken)
        .when()
            .get("/api/tasks")
        .then()
            .statusCode(200)
            .body("tasks", notNullValue());
    }

    @Test
    void testUnauthorizedWithoutToken() {
        when()
            .get("/api/tasks")
        .then()
            .statusCode(401);
    }
}
```

### Bash (curl)

```bash
#!/bin/bash
# auth-test.sh

BASE_URL="https://dojo.upexgalaxy.com"

echo "=== Test 1: Successful Login ==="
RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@upex.dev","password":"Test123!"}')

TOKEN=$(echo $RESPONSE | jq -r '.access_token')

if [ "$TOKEN" != "null" ]; then
  echo "PASS: Login successful"
else
  echo "FAIL: Login failed"
  exit 1
fi

echo ""
echo "=== Test 2: Get Current User ==="
USER_RESPONSE=$(curl -s "$BASE_URL/api/auth/me" \
  -H "Authorization: Bearer $TOKEN")

EMAIL=$(echo $USER_RESPONSE | jq -r '.user.email')

if [ "$EMAIL" == "testuser@upex.dev" ]; then
  echo "PASS: User info retrieved"
else
  echo "FAIL: Could not get user info"
  exit 1
fi

echo ""
echo "=== Test 3: Unauthorized Without Token ==="
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/tasks")

if [ "$STATUS" == "401" ]; then
  echo "PASS: Correctly returned 401"
else
  echo "FAIL: Expected 401, got $STATUS"
  exit 1
fi

echo ""
echo "All tests passed!"
```

---

## Common Issues & Debugging

### Issue: Login succeeds but dashboard redirects back to login

**Symptoms**:
- API returns 200 with token
- Session cookie is set
- Navigating to `/dashboard` redirects to `/login`

**Cause**: Middleware using wrong auth check (legacy `getToken` vs Auth.js v5 `auth()`)

**Solution**: Middleware should use `auth()` wrapper, not `getToken` from `next-auth/jwt`

**Debug**:
```bash
# Check cookies
curl -v https://dojo.upexgalaxy.com/login 2>&1 | grep -i cookie

# Verify session with API
curl https://dojo.upexgalaxy.com/api/auth/me \
  -H "Cookie: __Secure-authjs.session-token=YOUR_TOKEN"
```

### Issue: 401 Unauthorized with valid token

**Possible Causes**:
1. Token expired (check `exp` claim)
2. Token malformed (check for extra whitespace/newlines)
3. Wrong header format (must be `Bearer TOKEN`, not `bearer TOKEN`)

**Debug**:
```bash
# Decode JWT (without verification)
echo "YOUR_TOKEN" | cut -d. -f2 | base64 -d 2>/dev/null | jq

# Check expiration
echo "YOUR_TOKEN" | cut -d. -f2 | base64 -d 2>/dev/null | jq '.exp'
```

### Issue: Cookie not being set

**Possible Causes**:
1. HTTPS required for `__Secure-` cookies
2. Different domain (cookies are domain-specific)
3. SameSite policy blocking

**Debug**:
```javascript
// In browser console
document.cookie
// or
await cookieStore.getAll()
```

### Issue: CORS errors in browser

**Cause**: API requests from different origin without proper CORS headers

**Solution**: Use same-origin requests or configure CORS in Next.js

### Network Analysis Checklist

When debugging auth issues, capture:

1. **Login Request**:
   - Request URL, method, headers, body
   - Response status, headers, body

2. **Subsequent Requests**:
   - `Authorization` header present?
   - Cookie header present?

3. **Cookies**:
   - `__Secure-authjs.session-token` set?
   - Domain, path, expiration correct?

```bash
# Verbose curl for debugging
curl -v -X POST https://dojo.upexgalaxy.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@upex.dev","password":"Test123!"}' 2>&1
```
