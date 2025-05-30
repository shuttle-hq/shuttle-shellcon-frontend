# ShellCon Frontend - Smart Aquarium Dashboard

## Overview

This repository contains the frontend application for the ShellCon Smart Aquarium Dashboard. It's designed to work with three Rust backend microservices deployed using Shuttle. The application provides an interactive interface for solving shell scripting challenges in the context of managing a smart aquarium system.

## Prerequisites

- Node.js 16+ and npm
- A deployed instance of the ShellCon backend services on Shuttle Cloud
  - **Backend Repository**: [INSERT YOUR BACKEND REPO URL HERE]

## Backend Services

The frontend communicates with three separate backend microservices:

1. **Aqua Monitor** (Port 8000): Environmental monitoring system and challenge #1 validation
2. **Species Hub** (Port 8001): Species database management and challenge #2 validation
3. **Aqua Brain** (Port 8002): System status reporting and challenges #3-4 validation

## Deployment Guide

### Step 1: Deploy Backend Services to Shuttle Cloud

Before setting up the frontend, you need to deploy the backend services to Shuttle Cloud:

1. Clone the backend repository:
   ```bash
   git clone [INSERT YOUR BACKEND REPO URL HERE]
   cd [backend-repo-name]
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
   git clone https://github.com/yourusername/shellcon-frontend.git
   cd shellcon-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.prod` file in the project root with your Shuttle-deployed backend URLs:
   ```env
   # Replace with your actual Shuttle-deployed service URLs
   VITE_AQUA_MONITOR_URL=https://your-aqua-monitor-service.shuttleapp.rs
   VITE_SPECIES_HUB_URL=https://your-species-hub-service.shuttleapp.rs
   VITE_AQUA_BRAIN_URL=https://your-aqua-brain-service.shuttleapp.rs
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

## Running Locally

### Local Backend Setup

To run the backend services locally:

1. Clone the backend repository if you haven't already:
   ```bash
   git clone [INSERT YOUR BACKEND REPO URL HERE]
   cd [backend-repo-name]
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

### Local Frontend Setup

1. Use the existing `.env.localhost` file for local development:
   ```env
   VITE_AQUA_MONITOR_URL=http://localhost:8000
   VITE_SPECIES_HUB_URL=http://localhost:8001
   VITE_AQUA_BRAIN_URL=http://localhost:8002
   VITE_API_BASE_URL=/api
   ```

2. Start the development server:
   ```bash
   npm run dev:localhost
   ```

3. Access the application at `http://localhost:8080`

## Switching Between Local and Cloud Backends

### Using Local Backend

1. **Start Local Backend Services**:
   ```bash
   # Make sure you're at the root of the rust project where the shuttle.toml file is located
   cd [backend-repo-name]
   shuttle run
   ```

2. **Start Frontend with Local Configuration**:
   ```bash
   # This will use the .env.localhost configuration
   npm run dev:localhost
   ```

3. **Access the application** at `http://localhost:8080`

### Using Cloud Backend

1. **Deploy Backend to Cloud** (if not already deployed):
   ```bash
   # Make sure you're at the root of the rust project where the shuttle.toml file is located
   cd [backend-repo-name]
   shuttle deploy
   ```

2. **Update `.env.prod` File** (if needed):
   ```env
   # Replace with your actual Shuttle-deployed service URLs
   VITE_AQUA_MONITOR_URL=https://your-aqua-monitor-service.shuttleapp.rs
   VITE_SPECIES_HUB_URL=https://your-species-hub-service.shuttleapp.rs
   VITE_AQUA_BRAIN_URL=https://your-aqua-brain-service.shuttleapp.rs
   VITE_API_BASE_URL=/api
   ```

3. **Start Frontend with Production Configuration**:
   ```bash
   # This will use the .env.prod configuration
   npm run dev:prod
   ```

4. **Access the application** at `http://localhost:8080`

## Troubleshooting

### Common Issues

1. **Backend Connection Errors**:
   - Verify that all three backend services are running (check the Shuttle dashboard or run `shuttle logs --latest`)
   - Ensure the URLs in your `.env.localhost` or `.env.prod` file are correct
   - Check the browser console for specific error messages

2. **CORS Issues**:
   - Ensure the backend services are configured to accept requests from your frontend domain
   - For local development, make sure the backend services allow requests from `http://localhost:8080`

3. **Challenge Validation Problems**:
   - Check the backend logs for any errors:
     ```bash
     shuttle logs --latest
     ```
   - Verify that you're following the challenge instructions correctly

4. **Shuttle Deployment Issues**:
   - Make sure you're running the deployment command from the root directory where the `shuttle.toml` file is located
   - Check that you have the latest version of the Shuttle CLI installed

## Challenge Information

The challenges and their solutions are described in the backend repository. The frontend simply provides an interface for interacting with these challenges.

For details on each challenge and how to solve them, please refer to the documentation in the backend repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
