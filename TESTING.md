# Testing Guide for PhishIntel

This document outlines the testing strategy and how to run tests for the PhishIntel application.

## Overview

The application uses a comprehensive testing strategy with:
- **Backend Tests**: Jest + Supertest for API testing
- **Frontend Tests**: React Testing Library + Jest
- **Integration Tests**: Full application testing
- **Unit Tests**: Individual component and utility testing
- **Code Quality**: ESLint for linting
- **Security**: npm audit for vulnerability scanning

## Test Structure

```
tests/
├── setup.js                 # Global test setup
├── app.test.js             # Main app integration tests
├── controllers/            # Controller unit tests
│   └── adminAuth.test.js
├── models/                 # Model unit tests
│   └── Campaign.test.js
└── utils/                  # Utility function tests
    └── generateShortId.test.js
```

## Running Tests

### Local Development

1. **Run all tests (recommended for development):**
   ```bash
   npm run test:all
   ```

2. **Run backend tests only:**
   ```bash
   npm test
   npm run test:watch    # Watch mode
   npm run test:coverage # With coverage report
   ```

3. **Run frontend tests only:**
   ```bash
   cd client
   npm test
   npm run test:watch    # Watch mode
   npm run test:ci       # CI mode
   ```

4. **Run linting:**
   ```bash
   npm run lint
   npm run lint:fix      # Auto-fix issues
   ```

### CI/CD Pipeline

The GitHub Actions workflow automatically runs:
- Backend tests on Node.js 18.x and 20.x
- Frontend tests on Node.js 18.x and 20.x
- Security audits
- Code coverage reporting
- Docker image building (on main branch)

## Test Environment

Tests use:
- **MongoDB Memory Server**: In-memory database for testing
- **Test Environment Variables**: Isolated configuration
- **Mocked External Services**: No real API calls during testing

## Writing Tests

### Backend Tests

```javascript
import request from 'supertest';
import app from '../app.js';

describe('API Endpoint', () => {
  it('should return expected response', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toHaveProperty('data');
  });
});
```

### Frontend Tests

```javascript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Component from './Component';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

test('renders component correctly', () => {
  renderWithRouter(<Component />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### Model Tests

```javascript
import mongoose from 'mongoose';
import Model from '../models/Model.js';

describe('Model', () => {
  it('should create with valid data', async () => {
    const data = { /* valid data */ };
    const instance = new Model(data);
    const saved = await instance.save();
    
    expect(saved._id).toBeDefined();
  });
});
```

## Coverage Requirements

- **Backend**: 70% minimum coverage
- **Frontend**: 70% minimum coverage
- **Branches**: 70% minimum coverage
- **Functions**: 70% minimum coverage

## Best Practices

1. **Test Naming**: Use descriptive test names that explain the expected behavior
2. **Arrange-Act-Assert**: Structure tests with clear sections
3. **Isolation**: Each test should be independent
4. **Mocking**: Mock external dependencies and services
5. **Edge Cases**: Test error conditions and edge cases
6. **Performance**: Keep tests fast and efficient

## Debugging Tests

### Common Issues

1. **Database Connection**: Ensure MongoDB Memory Server is running
2. **Environment Variables**: Check test environment setup
3. **Async Operations**: Use proper async/await patterns
4. **Cleanup**: Ensure proper test cleanup in afterEach/afterAll

### Debug Commands

```bash
# Run specific test file
npm test -- tests/specific.test.js

# Run with verbose output
npm test -- --verbose

# Run with coverage
npm run test:coverage

# Debug Jest
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Continuous Integration

The GitHub Actions workflow runs on:
- Pull requests to main/develop branches
- Pushes to main/develop branches

### Workflow Steps

1. **Backend Testing**: Unit and integration tests
2. **Frontend Testing**: Component and integration tests
3. **Security Audit**: Vulnerability scanning
4. **Build Verification**: Ensure application builds successfully
5. **Deployment**: Automatic deployment on main branch (if configured)

## Monitoring

- **Coverage Reports**: Available in CI/CD pipeline
- **Test Results**: Detailed logs in GitHub Actions
- **Security Alerts**: Automatic vulnerability notifications
- **Performance**: Test execution time monitoring

## Contributing

When adding new features:
1. Write tests first (TDD approach)
2. Ensure all tests pass
3. Maintain or improve coverage
4. Update this documentation if needed 