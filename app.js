import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import { getClientIP } from './utils/utils.js';

dotenv.config(); // Load environment variables

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// Validate required environment variables
const validateEnvVars = () => {
    const requiredEnvVars = ['NODE_ENV', 'DB_URL', 'ADMIN_PASSWORD', 'SESSION_SECRET'];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variable(s): ${missingVars.join(', ')}`);
    }
};

try {
    validateEnvVars(); // Validate environment variables
} catch (error) {
    console.error(error.message);
    process.exit(1); // Exit process if validation fails
}

const app = express();
const port = process.env.PORT || 8080;
const db = process.env.DB_URL;

// Trust proxy headers to get real client IP addresses when behind a reverse proxy (e.g., Nginx, Heroku)
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    logger.token("body", (req) => JSON.stringify(req.body));
    logger.token("ip", (req) => getClientIP(req));
    app.use(logger(":method :url :status :res[content-length] - :response-time ms :ip :body"));
}

// API Routes
app.use(routes);
app.use(errorHandler);

// Serve React static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

// React routing fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// DB connection and start server
mongoose.connect(db)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server started on Port ${port}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

export default app;
