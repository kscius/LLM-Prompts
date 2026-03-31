---
name: auth-best-practices
description: Secure authentication and session implementation patterns — JWT vs sessions, token storage, OAuth2/OIDC, PKCE, refresh tokens, CSRF, cookie flags, Auth.js/better-auth/Lucia. Use when implementing login, registration, session management, OAuth flows, or any authentication-related code. Proactively apply when touching auth boundaries.
---

# Auth Best Practices

Authentication is where agents cause the most security regressions. Apply this skill whenever touching auth code.

**Rule:** If in doubt, use an established auth library. Rolling your own crypto is always wrong.

## Decision Tree: What to Implement

```
Need auth?
├── Using Next.js / Node.js → Auth.js (next-auth) or better-auth
├── Using an existing library in the repo → follow its patterns
├── Need fine-grained control → JWT (stateless) or sessions (stateful)
└── OAuth/OIDC provider → use PKCE flow, never implicit
```

## Session Storage: Where to Put Tokens

| Storage | Security | CSRF Risk | XSS Risk | Recommendation |
|---------|----------|-----------|----------|----------------|
| HttpOnly cookie | ✓ Best | Yes (need CSRF token) | Protected | **Preferred for sessions** |
| Memory (JS variable) | ✓ Good | No | Protected | OK for short-lived tokens |
| `localStorage` | ✗ Worst | No | Fully exposed | **Never for auth tokens** |
| `sessionStorage` | ✗ Bad | No | Fully exposed | **Never for auth tokens** |

**Rule:** Never store JWTs or session tokens in `localStorage` or `sessionStorage`.

## JWT Patterns

### Secure JWT Setup

```typescript
// Signing
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,   // min 256 bits, from env — never hardcoded
  {
    expiresIn: '15m',        // short-lived: 15min for access tokens
    algorithm: 'HS256',      // or RS256 for asymmetric
    issuer: 'your-app',
    audience: 'your-app',
  }
);

// Verification
try {
  const payload = jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],   // explicit allowlist — never omit
    issuer: 'your-app',
    audience: 'your-app',
  });
} catch (err) {
  // Handle: TokenExpiredError, JsonWebTokenError, NotBeforeError
  return res.status(401).json({ error: 'Invalid or expired token' });
}
```

### Access + Refresh Token Pattern

```
Access token: 15 min, in-memory or short-lived cookie
Refresh token: 7-30 days, HttpOnly cookie, rotated on each use
```

```typescript
// Refresh endpoint — rotate refresh token on use
app.post('/auth/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  const stored = await db.refreshTokens.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    res.clearCookie('refreshToken');
    return res.status(401).json({ error: 'Session expired' });
  }
  
  // Rotate: delete old, issue new
  await db.refreshTokens.delete({ where: { id: stored.id } });
  const newRefreshToken = generateSecureToken();
  await db.refreshTokens.create({ data: { token: newRefreshToken, userId: stored.userId, expiresAt: ... } });
  
  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  const accessToken = jwt.sign({ userId: stored.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
  res.json({ accessToken });
});
```

## Cookie Security Flags

Always set all three:

```typescript
res.cookie('sessionId', value, {
  httpOnly: true,           // JS cannot read — prevents XSS token theft
  secure: process.env.NODE_ENV === 'production',  // HTTPS only in prod
  sameSite: 'strict',       // or 'lax' for cross-site GET flows (OAuth callbacks)
  maxAge: 7 * 24 * 60 * 60 * 1000,  // explicit expiry
  path: '/',
});
```

`sameSite: 'strict'` blocks CSRF for same-site forms. If OAuth callbacks break, use `'lax'`.

## CSRF Protection

**When needed:** any state-changing request (POST/PUT/DELETE) from a browser using cookie-based auth.

**Not needed when:** using JWT in Authorization header (not cookies).

```typescript
// CSRF token pattern (double-submit cookie)
// 1. On login: generate CSRF token, store in session, set non-httpOnly cookie
// 2. Client reads cookie, sends in X-CSRF-Token header
// 3. Server compares header value to session value

// With modern frameworks:
// - Next.js: use next-auth which handles this
// - Express: use 'csurf' or 'csrf' package
// - Or use SameSite=Strict cookies (blocks most CSRF without tokens)
```

## Password Handling

```typescript
// Hashing: bcrypt (cost factor 12) or argon2id
import bcrypt from 'bcrypt';
const COST_FACTOR = 12;

// Registration
const hash = await bcrypt.hash(password, COST_FACTOR);
await db.users.create({ data: { email, passwordHash: hash } });

// Login
const isValid = await bcrypt.compare(candidatePassword, user.passwordHash);
if (!isValid) {
  // Use timing-safe comparison — bcrypt.compare is already timing-safe
  return res.status(401).json({ error: 'Invalid credentials' });
}
```

**Never:** store plain text passwords, use MD5/SHA1 for passwords, log passwords.

## OAuth2 / OIDC — Use PKCE

```typescript
// Authorization code flow + PKCE (for public clients: SPAs, mobile)
// 1. Generate code_verifier (random, 43-128 chars)
// 2. Derive code_challenge = base64url(sha256(code_verifier))
// 3. Send code_challenge in authorization request
// 4. Exchange code + code_verifier for tokens

// Never use implicit flow (deprecated, unsafe)
// Never expose client_secret in frontend code
// Always validate state parameter to prevent CSRF in OAuth flow
// Always validate id_token claims: iss, aud, exp, nonce
```

## Rate Limiting Auth Endpoints

```typescript
// Login endpoint: strict rate limiting
app.post('/auth/login', rateLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 10,                     // 10 attempts per IP
  message: 'Too many login attempts. Please try again later.',
  skipSuccessfulRequests: true,
}));

// Registration: less strict but still limited
// Password reset: strict (prevents enumeration + abuse)
```

## Auth.js / next-auth Patterns

```typescript
// next-auth v5 / Auth.js
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 1. Validate credentials shape
        // 2. Find user in DB
        // 3. Compare password with bcrypt
        // 4. Return user object (or null — never throw for bad credentials)
        const user = await db.users.findUnique({ where: { email: credentials.email } });
        if (!user || !await bcrypt.compare(credentials.password, user.passwordHash)) {
          return null;  // triggers CredentialsSignin error
        }
        return { id: user.id, email: user.email, role: user.role };
      }
    }),
    Google({ clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET }),
  ],
  session: { strategy: 'jwt' },  // or 'database' for server-side sessions
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
```

## Error Messages — Don't Leak Info

```typescript
// Bad: tells attacker which accounts exist
"No account found with that email"
"Wrong password for that account"

// Good: generic, timing-safe
"Invalid email or password"

// Bad: exposes internal errors
"Error: Connection to database failed at..."

// Good: generic
"Authentication failed. Please try again."
```

Use the same error message and same response time for "wrong password" and "user not found" — prevents user enumeration.

## Security Checklist

### Tokens and Storage
- [ ] JWT stored in HttpOnly cookie or memory — never localStorage
- [ ] JWT secret ≥ 256 bits, stored in env var
- [ ] Access tokens expire in ≤ 15 minutes
- [ ] Refresh tokens rotate on use, stored server-side or in HttpOnly cookie

### Cookies
- [ ] `httpOnly: true` on all auth cookies
- [ ] `secure: true` in production
- [ ] `sameSite: 'strict'` or `'lax'` set explicitly

### Passwords
- [ ] Hashed with bcrypt (cost ≥ 12) or argon2id
- [ ] Never logged, never returned in API responses
- [ ] Password reset tokens are single-use, short-lived (≤ 1h)

### Rate Limiting
- [ ] Login endpoint: ≤ 10 attempts per 15 min per IP
- [ ] Password reset: ≤ 5 attempts per hour

### Error Handling
- [ ] Generic messages for auth failures (no user enumeration)
- [ ] Internal error details never sent to client

### OAuth
- [ ] PKCE used for all public clients
- [ ] State parameter validated
- [ ] id_token claims validated (iss, aud, exp)
- [ ] Client secret never in frontend code

## Integration with this Setup

- Always triggers `security-review` skill for auth-related PRs
- Pairs with `review-and-secure` as final quality gate
- Referenced by `backend-patterns` for API security
- Apply when `ship-feature` touches any auth path

## References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Auth.js Documentation](https://authjs.dev)
- [PKCE RFC 7636](https://tools.ietf.org/html/rfc7636)
