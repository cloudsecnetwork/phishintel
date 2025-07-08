process.env.NODE_ENV = process.env.NODE_ENV || 'production';
import 'dotenv/config';
import mongoose from 'mongoose';
import userService from './services/userService.js';

const DB_URL = process.env.DB_URL  || 'mongodb://localhost:27017/phishintel';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('ADMIN_PASSWORD environment variable is not set.');
  process.exit(1);
}

async function initRootAdmin() {
  try {
    await mongoose.connect(DB_URL);
    const existingRoot = await userService.findRootAdmin();
    if (existingRoot) {
      console.log('Root admin user already exists.');
      process.exit(0);
    }
    const rootAdmin = await userService.createUser({
      firstName: 'Administrator',
      lastName: '',
      username: 'admin',
      email: 'admin@localhost',
      password: ADMIN_PASSWORD,
      role: 'admin',
      accountLocked: false,
      isRoot: true,
    });
    console.log('Root admin user created successfully:', rootAdmin.username);
    process.exit(0);
  } catch (err) {
    console.error('Error initializing root admin:', err);
    process.exit(1);
  }
}

initRootAdmin(); 