#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

console.log('🚀 Starting comprehensive test suite...\n');

// Set test environment
process.env.NODE_ENV = 'test';

try {
  // Run backend tests
  console.log('📦 Testing Backend...');
  execSync('npm run test:ci', { 
    cwd: rootDir, 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' }
  });
  console.log('✅ Backend tests passed!\n');

  // Run frontend tests
  console.log('🎨 Testing Frontend...');
  execSync('npm run test:ci', { 
    cwd: join(rootDir, 'client'), 
    stdio: 'inherit',
    env: { ...process.env, CI: 'true' }
  });
  console.log('✅ Frontend tests passed!\n');

  // Run linting
  console.log('🔍 Running linting...');
  execSync('npm run lint', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });
  console.log('✅ Linting passed!\n');

  // Security audit
  console.log('🔒 Running security audit...');
  execSync('npm audit --audit-level moderate', { 
    cwd: rootDir, 
    stdio: 'inherit' 
  });
  console.log('✅ Security audit passed!\n');

  console.log('🎉 All tests passed successfully!');
  process.exit(0);

} catch (error) {
  console.error('❌ Test suite failed:', error.message);
  process.exit(1);
} 