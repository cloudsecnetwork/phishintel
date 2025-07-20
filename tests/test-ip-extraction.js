/*
 * test-ip-extraction.js
 *
 * Standalone script to test the getClientIP utility function with various mock request scenarios.
 *
 * Usage:
 *   node tests/test-ip-extraction.js
 *
 * Requirements:
 *   - Run from the project root or ensure the relative import to '../utils/utils.js' is correct.
 *   - Node.js (no extra dependencies required)
 *
 * This script will print the results of each test case to the console.
 */
// Test script for IP extraction
import { getClientIP } from '../utils/utils.js';

// Mock request objects to test different scenarios
const testCases = [
    {
        name: 'X-Forwarded-For header',
        req: {
            headers: {
                'x-forwarded-for': '203.0.113.1, 10.0.0.1'
            },
            ip: '::ffff:127.0.0.1'
        },
        expected: '203.0.113.1'
    },
    {
        name: 'X-Real-IP header',
        req: {
            headers: {
                'x-real-ip': '203.0.113.2'
            },
            ip: '::ffff:127.0.0.1'
        },
        expected: '203.0.113.2'
    },
    {
        name: 'CF-Connecting-IP header (Cloudflare)',
        req: {
            headers: {
                'cf-connecting-ip': '203.0.113.3'
            },
            ip: '::ffff:127.0.0.1'
        },
        expected: '203.0.113.3'
    },
    {
        name: 'X-Client-IP header',
        req: {
            headers: {
                'x-client-ip': '203.0.113.4'
            },
            ip: '::ffff:127.0.0.1'
        },
        expected: '203.0.113.4'
    },
    {
        name: 'IPv6 mapped IPv4 in req.ip',
        req: {
            headers: {},
            ip: '::ffff:203.0.113.5'
        },
        expected: '203.0.113.5'
    },
    {
        name: 'No headers, fallback to req.ip',
        req: {
            headers: {},
            ip: '203.0.113.6'
        },
        expected: '203.0.113.6'
    },
    {
        name: 'Connection remote address fallback',
        req: {
            headers: {},
            ip: null,
            connection: {
                remoteAddress: '203.0.113.7'
            }
        },
        expected: '203.0.113.7'
    }
];

console.log('Testing IP extraction function...\n');

testCases.forEach((testCase, index) => {
    const result = getClientIP(testCase.req);
    const passed = result === testCase.expected;
    
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`  Expected: ${testCase.expected}`);
    console.log(`  Got:      ${result}`);
    console.log(`  Status:   ${passed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('');
});

console.log('IP extraction test completed!'); 