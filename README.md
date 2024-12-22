# PhishIntel: AI-Powered Phishing Simulation Tool

### What is PhishIntel?
**[PhishIntel](https://phishintel.com)** is an open-source, AI-powered phishing simulation tool designed for realistic cybersecurity awareness training. It helps organizations assess their cybersecurity posture by simulating real-world phishing attacks to improve user awareness and minimize risks.

With PhishIntel, you can create custom phishing campaigns tailored to your organization's needs. The tool provides detailed analytics and insights into user behavior, helping you understand the effectiveness of your training programs and identify areas for improvement.

### Key Features
- **AI-Driven Campaigns**: Leverage artificial intelligence to craft highly convincing phishing campaigns, mirroring real-world attack techniques.
- **User Awareness Tracking**: Analyze how users respond to simulated attacks, helping identify high-risk individuals or groups.
- **Comprehensive Reporting**: Generate reports that provide insights into user interactions with phishing emails, including click rates and campaign results.
- **Customization**: Configure the phishing content, scheduling, and campaign parameters to align with your organization's training objectives.

### How to Use This Image
To use this Docker image, pull it from Docker Hub:
```bash
docker pull cloudsecnetwork/phishintel:latest
```

Run the image with the appropriate environment variables:
```bash
docker run -e NODE_ENV=production \
           -e DB_URL=mongodb://localhost:27017/phishintel \
           -e ADMIN_PASSWORD=YourSecurePassword \
           -e SESSION_SECRET=de0b1b13-5e94-4daa-900e-5b4ec8a4fd7d \
           -p 8080:8080 cloudsecnetwork/phishintel:latest
```

### Supported Environment Variables
- **`NODE_ENV`**: Defines the environment mode (e.g., `development`, `production`).
- **`DB_URL`**: URL for connecting to the MongoDB instance (e.g., `mongodb://localhost:27017/phishintel`).
- **`ADMIN_PASSWORD`**: Sets the default admin password. The default username is **`admin`**.
- **`SESSION_SECRET`**: A unique string for signing the authentication session.

### Access the Phishing Campaign Console
Once the container is running, you can access the PhishIntel console to set up your campaigns:
- **Local Environment**: http://localhost:8080/console
- **Production URL**: https://example.com/console

With PhishIntel, you can quickly set up, customize, and deploy phishing simulations to enhance your organization's cybersecurity awareness effectively.
