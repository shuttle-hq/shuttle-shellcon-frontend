# 🦀 ShellCon Frontend - Smart Aquarium Dashboard 🐚

## 🔍 Overview

This repository contains the frontend application for the ShellCon Smart Aquarium Dashboard. It's designed to work with three Rust backend microservices deployed using Shuttle. The application provides an interactive interface for solving shell scripting challenges in the context of managing a smart aquarium system.

## 📋 Prerequisites

- Node.js 16+ and npm
- A deployed instance of the ShellCon backend services on Shuttle Cloud
  - **Backend Repository**: [https://github.com/shuttle-hq/shuttle-shellcon](https://github.com/shuttle-hq/shuttle-shellcon)

## 🔧 Backend Services

The frontend communicates with three separate backend microservices:

1. **Aqua Monitor** (Port 8000): Environmental monitoring system and challenge #1 validation
2. **Species Hub** (Port 8001): Species database management and challenge #2 validation
3. **Aqua Brain** (Port 8002): System status reporting and challenges #3-4 validation

## 🚀 Deployment Guide

### Step 1: Deploy Backend Services to Shuttle Cloud

Before setting up the frontend, you need to deploy the backend services to Shuttle Cloud:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/shuttle-hq/shuttle-shellcon.git
   cd shuttle-shellcon
   ```

2. Deploy the services to Shuttle Cloud:
   ```bash
   # Make sure you're at the root of the rust project where the shuttle.toml file is located
   shuttle deploy
   ```

3. After successful deployment, Shuttle will provide URLs for each service. Note these URLs as you'll need them for the frontend configuration.

### Step 2: Configure the Frontend

1. Clone this frontend repository:
   ```bash
   git clone https://github.com/shuttle-hq/shuttle-shellcon-frontend.git
   cd shuttle-shellcon-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.prod` file in the project root with your Shuttle-deployed backend URLs:
   ```bash
   # Create the .env.prod file (this file is in .gitignore and won't exist in the cloned repo)
   touch .env.prod
   ```

4. Add your Shuttle-deployed backend URLs to the `.env.prod` file:
   ```env
   # Replace with your actual Shuttle-deployed service URLs
   VITE_AQUA_MONITOR_URL=https://your-aqua-monitor-service.shuttleapp.app
   VITE_SPECIES_HUB_URL=https://your-species-hub-service.shuttleapp.app
   VITE_AQUA_BRAIN_URL=https://your-aqua-brain-service.shuttleapp.app
   VITE_API_BASE_URL=/api
   ```

### Step 3: Run the Frontend with Cloud Backend

1. Start the frontend with the production configuration:
   ```bash
   npm run dev:prod
   ```

2. Access the application at `http://localhost:8080`

   This will run the frontend locally but connect to your cloud-deployed backend services.

### Step 4: Verify the Connection

1. Access the frontend application at `http://localhost:8080`
2. Ensure all three backend services are connected properly
3. Verify that you can view and interact with all challenges

## 💻 Running with Local Backend

To run the backend services locally:

1. Clone the backend repository if you haven't already:
   ```bash
   git clone https://github.com/shuttle-hq/shuttle-shellcon.git
   cd shuttle-shellcon
   ```

2. Start all services locally with Shuttle:
   ```bash
   # Make sure you're at the root of the rust project where the shuttle.toml file is located
   shuttle run
   ```

   The services will be available at:
   - Aqua Monitor: `http://localhost:8000`
   - Species Hub: `http://localhost:8001`
   - Aqua Brain: `http://localhost:8002`

3. Create a `.env.localhost` file in your frontend project:
   ```bash
   # Create the .env.localhost file (this file is in .gitignore and won't exist in the cloned repo)
   touch .env.localhost
   ```

4. Add the local backend URLs to the `.env.localhost` file:
   ```env
   VITE_AQUA_MONITOR_URL=http://localhost:8000
   VITE_SPECIES_HUB_URL=http://localhost:8001
   VITE_AQUA_BRAIN_URL=http://localhost:8002
   VITE_API_BASE_URL=/api
   ```

5. Start the frontend with the local configuration:
   ```bash
   npm run dev:localhost
   ```

6. Access the application at `http://localhost:8080`

## 🔄 Switching Between Local and Cloud Backends

### To Use Local Backend

1. Start the backend services locally:
   ```bash
   cd shuttle-shellcon
   shuttle run
   ```

2. Run the frontend with local configuration:
   ```bash
   npm run dev:localhost
   ```

### To Use Cloud Backend

1. If not already deployed, deploy the backend to Shuttle Cloud:
   ```bash
   cd shuttle-shellcon
   shuttle deploy
   ```

2. Make sure your `.env.prod` file has the correct URLs:
   ```env
   VITE_AQUA_MONITOR_URL=https://your-aqua-monitor-service.shuttleapp.app
   VITE_SPECIES_HUB_URL=https://your-species-hub-service.shuttleapp.app
   VITE_AQUA_BRAIN_URL=https://your-aqua-brain-service.shuttleapp.app
   VITE_API_BASE_URL=/api
   ```

3. Run the frontend with the production configuration:
   ```bash
   npm run dev:prod
   ```

In both cases, the application will be available at `http://localhost:8080`.

## 🛠️ Troubleshooting

### Common Issues

1. **Backend Connection Errors**:
   - Verify that all three backend services are running (check the Shuttle dashboard or run `shuttle logs --latest`)
   - Ensure the URLs in your `.env.localhost` or `.env.prod` file are correct
   - Check the browser console for specific error messages
   - Make sure you're using the correct command (`npm run dev:localhost` for local backend, `npm run dev:prod` for cloud backend)

2. **CORS Issues**:
   - If you see CORS errors in the console, ensure the backend services are configured to accept requests from your frontend domain
   - For local development, the backend services should allow requests from `http://localhost:8080`
   - Try clearing your browser cache or using an incognito/private window

3. **Challenge Validation Problems**:
   - Check the backend logs for any errors: `shuttle logs --latest`
   - Verify that you're following the challenge instructions exactly as specified
   - Make sure you've completed all the prerequisites for each challenge
   - Check if your solution matches the expected format (case-sensitive, exact spacing, etc.)

5. **Frontend Loading Issues**:
   - If challenges don't load, check the Network tab in your browser's developer tools
   - Verify that the API requests are being sent to the correct URLs
   - Try restarting both the frontend and backend services

## ❓ Frequently Asked Questions (FAQ)

### General Questions

1. **Q: Do I need to deploy the frontend to a hosting service?**
   A: No, you can run the frontend locally using `npm run dev:localhost` (for local backend) or `npm run dev:prod` (for cloud backend).

2. **Q: Can I work on the challenges without deploying the backend to Shuttle Cloud?**
   A: Yes, you can run the backend locally using `shuttle run` and connect to it with `npm run dev:localhost`.

3. **Q: How do I know if my backend services are running correctly?**
   A: Use `shuttle logs --latest` to check the logs. You should see successful startup messages for all three services.

### Shuttle-Specific Questions

1. **Q: Where should I run the `shuttle deploy` command?**
   A: Always run it at the root of the Rust project where the `shuttle.toml` file is located.

2. **Q: How can I check if my Shuttle services are running in the cloud?**
   A: Visit the Shuttle dashboard.

3. **Q: How do I update my cloud deployment after making changes?**
   A: Simply run `shuttle deploy` again from the root directory of your project.

### Challenge-Specific Questions

1. **Q: The challenge validation isn't working even though my solution seems correct. What should I check?**
   A: Verify that:
   - You're connected to the correct backend (local or cloud)
   - Your solution exactly matches the expected format
   - The backend logs don't show any validation errors
   - You've completed all prerequisites for the challenge

2. **Q: My challenge progress isn't being saved between sessions. Why?**
   A: The challenge progress is stored in your browser's localStorage. Try:
   - Using the same browser and device
   - Not clearing your browser data
   - Completing each challenge fully before moving to the next

3. **Q: The code examples in the challenges aren't displaying correctly. How can I fix this?**
   A: If code blocks aren't rendering properly:
   - Try refreshing the page
   - Clear your browser cache
   - Try a different browser if the issue persists

### Environment Setup Questions

1. **Q: Do I need to modify the `.env.localhost` or `.env.prod` files?**
   A: Only if your backend services are running on different URLs than the defaults. For local development, the default ports should work fine.

2. **Q: Can I run the frontend and backend on different machines?**
   A: Yes, but you'll need to update the URLs in your environment files to point to the correct IP addresses or hostnames.

3. **Q: What Node.js version is required for the frontend?**
   A: Node.js 16+ is recommended for optimal compatibility.

## 🏆 Challenge Information

The challenges and their solutions are described in the backend repository. The frontend simply provides an interface for interacting with these challenges.

For details on each challenge and how to solve them, please refer to the documentation in the backend repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
