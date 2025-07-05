# PhishIntel: AI-Powered Phishing Simulation Tool

### What is PhishIntel?
**[PhishIntel](https://phishintel.com)** is an open-source, AI-powered phishing simulation tool designed for realistic cybersecurity awareness training. It helps organizations assess their cybersecurity posture by simulating real-world phishing attacks to improve user awareness and minimize risks.

With PhishIntel, you can create custom phishing campaigns tailored to your organization's needs. The tool provides detailed analytics and insights into user behavior, helping you understand the effectiveness of your training programs and identify areas for improvement.

### Key Features
- **AI-Driven Campaigns**: Leverage artificial intelligence to craft highly convincing phishing campaigns, mirroring real-world attack techniques.
- **User Awareness Tracking**: Analyze how users respond to simulated attacks, helping identify high-risk individuals or groups.
- **Comprehensive Reporting**: Generate reports that provide insights into user interactions with phishing emails, including click rates and campaign results.
- **Customization**: Configure the phishing content, scheduling, and campaign parameters to align with your organization's training objectives.

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

# Start backend with auto-reload
nodemon app.js
```
> Make sure you have `nodemon` installed globally. If not, run: `npm install -g nodemon`.

### Step 5: Start the Frontend
In a separate terminal:
```bash
cd client
npm install
npm start
```

### Step 9: Access the Application
- **Admin Console**: http://localhost:3000/console
- **Backend API**: http://localhost:8080  

## Docker Deployment
You can run PhishIntel using the official Docker image:

```bash
docker pull cloudsecnetwork/phishintel:latest
```
Then start the container with the necessary environment variables:
```bash
docker run -e NODE_ENV=production \
           -e DB_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/phishintel" \
           -e ADMIN_PASSWORD=YourSecurePassword \
           -e SESSION_SECRET=de0b1b13-5e94-4daa-900e-5b4ec8a4fd7d \
           -p 8080:8080 cloudsecnetwork/phishintel:latest
```

### Notes

- The `DB_URL` provided above uses **MongoDB Atlas**, a fully managed cloud database service. The `+srv` format allows the driver to automatically resolve the cluster nodes.
- You may use **any MongoDB instance** whether locally hosted, on a private server, or any cloud provider, as long as it is network accessible by the container.
- Replace `<username>` and `<password>` in the example with your actual MongoDB credentials.
- If you're using MongoDB Atlas, make sure to whitelist your host IP address under **Network Access** settings in the Atlas dashboard.
- To access the application after the container starts, open:  
  `http://<your-server-domain-or-public-ip>:8080/console`  
  > ℹ️ The `:8080` is required if you're accessing the container directly, as the app runs on port 8080 by default.  
  > If you're using a reverse proxy (e.g., NGINX, Load Balancer) that maps port 8080 to a standard port like 80 or 443, you can omit the port and access it via your domain as usual.

## Environment Variables

PhishIntel relies on several environment variables for proper configuration. These should be defined in a `.env` file for local development, or passed in at runtime for Docker deployments.

| Variable         | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| `NODE_ENV`       | Defines the environment mode. Use `development` for local setups or `production` for live deployments. |
| `DB_URL`         | MongoDB connection string. Can point to a local MongoDB instance or a managed cluster like MongoDB Atlas. Example: `mongodb://localhost:27017/phishintel` or `mongodb+srv://<username>:<password>@cluster.mongodb.net/phishintel`. |
| `ADMIN_PASSWORD` | Initial login password for the default `admin` user. Required to access the Admin Console. |
| `SESSION_SECRET` | A secure, random string used to sign user sessions. Keep this value private, especially in production. |
| `PORT`           | The port the backend server listens on. Defaults to `8080`. You can change this if needed. |

> ⚠️ For production deployments, avoid hardcoding sensitive credentials in configuration files. Use environment injection tools, secret managers, or CI/CD pipeline variables for security.

## Getting Help

If you run into any issues while using or setting up PhishIntel, here’s how to get support:

- **Browse Existing Issues**  
  Start by checking the [Issues section on GitHub](https://github.com/cloudsecnetwork/phishintel/issues) to see if your question or problem has already been addressed.

- **Open a New Issue**  
  If you can’t find a solution, [open a new GitHub issue](https://github.com/cloudsecnetwork/phishintel/issues/new). Be sure to include:
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
  We maintain a private Discord server for contributors and early adopters. While public access isn’t available yet, you can reach out to us directly via email at [hello@cloudsecnetwork.com](mailto:hello@cloudsecnetwork.com) and we’ll be happy to assist or extend an invite if appropriate.

Your feedback is valuable, and we’re here to help you succeed with PhishIntel!
