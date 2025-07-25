# PhishIntel: AI-Powered Phishing Simulation Tool

### What is PhishIntel?
**[PhishIntel](https://phishintel.com)** is an open-source, AI-powered phishing simulation tool designed for realistic cybersecurity awareness training. It helps organizations assess their cybersecurity posture by simulating real-world phishing attacks to improve user awareness and minimize risks.

With PhishIntel, you can create custom phishing campaigns tailored to your organization's needs. The tool provides detailed analytics and insights into user behavior, helping you understand the effectiveness of your training programs and identify areas for improvement.

### Key Features
- **AI-Driven Campaigns**: Leverage artificial intelligence to craft highly convincing phishing campaigns that mirror real-world attack techniques and adapt to your organization's context.
- **User Awareness Tracking**: Analyze how users respond to simulated attacks, helping identify high-risk individuals or groups for targeted training interventions.
- **Comprehensive Reporting**: Generate detailed reports that provide insights into user interactions with phishing emails, including click rates, submission patterns, and campaign effectiveness metrics.
- **Customization**: Configure the phishing content, scheduling, and campaign parameters to align with your organization's training objectives and security policies.

## Local Development Setup

### Prerequisites
Before setting up the project locally, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Docker** (for running MongoDB container)
- **Git** (for cloning the repository)

### Step 1: Clone the Repository
```bash
git clone https://github.com/cloudsecnetwork/phishintel.git
cd phishintel
```

### Step 2: Set Up MongoDB with Docker

#### Start MongoDB Container
```bash
docker run -d --name mongodb -p 27017:27017 mongo:8.0
```

#### Verify MongoDB is Running
```bash
docker ps
```

#### Stop MongoDB (when needed)
```bash
docker stop mongodb
```

#### Start MongoDB (after stopping)
```bash
docker start mongodb
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory:
```env
NODE_ENV=development
DB_URL=mongodb://localhost:27017/phishintel
ADMIN_PASSWORD=admin123
SESSION_SECRET=your-unique-session-secret-here
PORT=8080
```

### Step 4: Start the Backend (API)
From the root project directory:
```bash
# Install backend dependencies
npm install

# After starting MongoDB, initialize the root admin (first time only):
node scripts/initRootAdmin.js

# Start backend with auto-reload
nodemon app.js
```
> Make sure you have `nodemon` installed globally. If not, run: `npm install -g nodemon`.
> 
> **Alternative**: You can also run `npx nodemon app.js` without installing globally.

### Step 5: Configure Frontend Environment (Optional)
If you need to customize the API endpoint, create a `.env` file in the `client` directory:
```env
REACT_APP_API_URL=http://localhost:8080
```

### Step 6: Start the Frontend
In a separate terminal:
```bash
cd client
npm install
npm start
```

### Step 7: Access the Application
- **Admin Console**: http://localhost:3000/console
- **Backend API**: http://localhost:8080

## Production Deployment

For production deployments, consider the following:

### Backend Production
```bash
# Install dependencies
npm install

# Set NODE_ENV to production
export NODE_ENV=production

# Start the application (without nodemon)
npm start
```

### Frontend Production Build
```bash
cd client
npm run build
```

The optimized build will be created in the `client/build` folder, which can be served by your web server or integrated with the backend.

### Security Considerations
- Use strong, unique passwords for `ADMIN_PASSWORD` and `SESSION_SECRET`
- Configure HTTPS in production
- Set up a reverse proxy (nginx, Apache) for better security and performance
- Use environment variables for all sensitive configuration
- Regularly update dependencies

## Docker Deployment
You can run PhishIntel using Docker in two ways. **Do not run both approaches at the same time to avoid container and port conflicts.**

### 1. Using `docker-compose` (recommended for most users)

- **Pros:** Easiest, manages both app and MongoDB, automatic data persistence via Docker volume, one-command startup and shutdown.
- **Cons:** Slightly more setup if you want to customize ports or container names.

To start both the app and MongoDB:

```bash
docker-compose up
```

- MongoDB data is persisted in the `phishintel_mongo_data` Docker volume.
- To stop and remove containers (but keep data):
  ```bash
  docker-compose down
  ```
- To stop and remove containers **and** delete all MongoDB data:
  ```bash
  docker-compose down -v
  ```

### 2. Using `docker run` (manual, advanced)

- **Pros:** More control, can run app or DB separately, useful for advanced scenarios.
- **Cons:** You must manage MongoDB and data persistence yourself.

Start MongoDB (with data persisted in a Docker volume):
```bash
docker run -d --name mongodb -p 27017:27017 -v phishintel_mongo_data:/data/db mongo:8.0
```

Start the PhishIntel app (connects to the running MongoDB):
```bash
docker run --name phishintel \
  -e NODE_ENV=development \
  -e DB_URL="mongodb://host.docker.internal:27017/phishintel" \
  -e ADMIN_PASSWORD=YourSecurePassword \
  -e SESSION_SECRET=your-session-secret \
  -e PORT=8080 \
  -p 8080:8080 \
  cloudsecnetwork/phishintel:latest
```

- Data is persisted in the `phishintel_mongo_data` Docker volume (same as compose).
- To stop and remove containers (but keep data):
  ```bash
  docker stop phishintel mongodb
  docker rm phishintel mongodb
  ```
- To remove the data volume (danger: deletes all MongoDB data):
  ```bash
  docker volume rm phishintel_mongo_data
  ```

### **Important: Avoid Conflicts**
- Do **not** run both approaches at the same time. Both use the same container names and host ports.
- Use `docker ps` to see running containers.
- Use `docker-compose down` or `docker stop`/`docker rm` to clean up before switching approaches.

## Environment Variables

PhishIntel relies on several environment variables for proper configuration. These should be defined in a `.env` file for local development, or passed in at runtime for Docker deployments.

| Variable         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `NODE_ENV`       | Defines the environment mode. Use `development` for local setups or `production` for live deployments. If NODE_ENV is not set, it defaults to 'production'. Set it to 'development' only if you want development logging and features. |
| `DB_URL`         | MongoDB connection string. Can point to a local MongoDB instance or a managed cluster like MongoDB Atlas. Example: `mongodb://localhost:27017/phishintel` or `mongodb+srv://<username>:<password>@cluster.mongodb.net/phishintel`. |
| `ADMIN_PASSWORD` | Initial password for the default `admin` user. **Used only once during setup to create the root admin account. After initial setup, you can change the admin password through the web interface.** |
| `SESSION_SECRET` | A secure, random string used to sign user sessions. Keep this value private, especially in production. |
| `PORT`           | The port the backend server listens on. Defaults to `8080`. You can change this if needed. |

### Frontend Environment Variables
The frontend (client) may require additional environment variables. Create a `.env` file in the `client` directory if needed:

| Variable              | Description                                    | Default                    |
|-----------------------|------------------------------------------------|----------------------------|
| `REACT_APP_API_URL`  | Backend API endpoint URL                       | `http://localhost:8080`   |

> ⚠️ For production deployments, avoid hardcoding sensitive credentials in configuration files. Use environment injection tools, secret managers, or CI/CD pipeline variables for security.

## Testing

### Backend Testing
To run backend tests (if available):
```bash
npm test
```

### Frontend Testing
To run frontend tests:
```bash
cd client
npm test
```

## Getting Help

If you run into any issues while using or setting up PhishIntel, here's how to get support:

- **Browse Existing Issues**  
  Start by checking the [Issues section on GitHub](https://github.com/cloudsecnetwork/phishintel/issues) to see if your question or problem has already been addressed.

- **Open a New Issue**  
  If you can't find a solution, [open a new GitHub issue](https://github.com/cloudsecnetwork/phishintel/issues/new). Be sure to include:
  - A clear and concise description of the issue
  - Steps to reproduce it
  - Any relevant error messages or logs
  - Your environment details (OS, Node.js version, MongoDB version, etc.)

- **Check Logs**  
  Logs can often help identify the problem:
  - For backend issues, check the terminal where the app is running
  - For Docker users, use:
    ```bash
    docker logs <container-name>
    ```

- **Validate Your Environment**  
  Double-check that your `.env` file is properly configured and that services like MongoDB are running and reachable.

- **Need Direct Support?**  
  We maintain a private Discord server for contributors and early adopters. While public access isn't available yet, you can reach out to us directly via email at [hello@cloudsecnetwork.com](mailto:hello@cloudsecnetwork.com) and we'll be happy to assist or extend an invite if appropriate.

Your feedback is valuable, and we're here to help you succeed with PhishIntel!
