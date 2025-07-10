# PhishIntel Frontend (Client)

This folder contains the frontend code for the PhishIntel project. The application is built with [React](https://reactjs.org/) using [Create React App](https://create-react-app.dev/).

## Project Overview

PhishIntel is a phishing simulation and awareness platform. The client (this folder) provides the user interface for managing campaigns, audiences, templates, sender profiles, and viewing analytics.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Open a terminal and navigate to this `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
To start the development server:
```bash
npm start
```
This will open the app at [http://localhost:3000](http://localhost:3000).

### Running Tests
To launch the test runner:
```bash
npm test
```

### Building for Production
To build the app for production:
```bash
npm run build
```
The optimized build will be output to the `build` folder.

## Environment Variables
You may need to configure environment variables for API endpoints. Create a `.env` file in this directory if needed:

| Variable              | Description                                    | Default                    |
|-----------------------|------------------------------------------------|----------------------------|
| `REACT_APP_API_URL`  | Backend API endpoint URL                       | `http://localhost:8080`   |

Example `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080
```

> **Note**: All environment variables must be prefixed with `REACT_APP_` to be accessible in the React application.

## Production Deployment

### Building for Production
```bash
npm run build
```

### Serving the Production Build
The production build can be served in several ways:

1. **Using a static file server** (like `serve`):
   ```bash
   npm install -g serve
   serve -s build -l 3000
   ```

2. **Integrated with the backend**: Copy the contents of the `build` folder to your backend's static file serving directory.

3. **Using nginx or Apache**: Configure your web server to serve the `build` directory.

### Environment Configuration for Production
For production deployments, ensure your environment variables are properly configured:
- Set `REACT_APP_API_URL` to your production backend URL
- Use HTTPS URLs in production
- Consider using a reverse proxy for better security

## Project Structure
- `src/` - Main source code
  - `components/` - Reusable UI components
  - `pages/` - Page-level components (Dashboard, Campaign, Audience, etc.)
  - `hooks/` - Custom React hooks
  - `services/` - API and utility services
  - `assets/` - Images and icons
  - `config/` - API configuration
  - `utils/` - Utility functions

## Additional Notes
- This project uses [Create React App](https://create-react-app.dev/) under the hood. For advanced configuration, refer to their documentation.
- For backend setup, see the main project README in the root directory.
- The development server includes hot reloading for a better development experience.
- All API calls are made to the backend running on port 8080 by default.
