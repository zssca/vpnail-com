
perform a comprehensive code audit of this project and identify:

## Security & Hardcoded Values
- **API Keys & Secrets**: Any hardcoded API keys, tokens, passwords, or secret keys
- **URLs & Endpoints**: Hardcoded URLs, API endpoints, or domain names that should be in environment variables
- **Credentials**: Database credentials, authentication tokens, or service account keys
- **IP Addresses**: Hardcoded IP addresses or server addresses
- **File Paths**: Absolute file paths that may not work across environments
- **Environment-specific values**: Configuration values that should vary by environment (dev/staging/prod)

## Code Quality Issues
- **TODO/FIXME comments**: Incomplete work or known issues marked in code
- **Console logs**: `console.log`, `console.error` statements left in production code
- **Commented-out code**: Large blocks of commented code that should be removed
- **Magic numbers**: Unexplained numeric constants that should be named constants
- **Duplicate code**: Repeated logic that should be extracted into functions
- **Dead code**: Unused variables, functions, imports, or files

## Common Bugs & Anti-patterns
- **Error handling**: Missing try-catch blocks, unhandled promise rejections
- **Null/undefined checks**: Missing validation that could cause runtime errors
- **Type mismatches**: Implicit type coercion or incorrect type usage
- **Memory leaks**: Event listeners not cleaned up, unclosed connections
- **Race conditions**: Asynchronous code that may execute in unexpected order
- **Infinite loops**: Loops without proper exit conditions

## Performance Issues
- **Inefficient algorithms**: O(n²) or worse complexity where better solutions exist
- **Unnecessary re-renders**: In React/Vue components
- **Large bundle sizes**: Unused dependencies or imports
- **Blocking operations**: Synchronous operations that should be async
- **N+1 queries**: Database queries in loops

## Best Practices
- **Missing error messages**: Generic error handling without helpful messages
- **Inconsistent naming**: Variables/functions not following project conventions
- **Missing documentation**: Complex functions without comments or JSDoc
- **Accessibility issues**: Missing alt text, ARIA labels, keyboard navigation
- **Security headers**: Missing CORS, CSP, or other security configurations

## Output Format
For each issue found, provide:
1. **File path and line number**
2. **Issue type** (from categories above)
3. **Severity** (Critical/High/Medium/Low)
4. **Current code snippet**
5. **Recommended fix** or explanation
6. **Why it's an issue** (brief explanation)
