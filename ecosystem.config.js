module.exports = {
  apps: [
    {
      name: "production", // Name of your app
      script: "./app.js", // Path to your entry file (e.g., app.js, server.js, etc.)
      instances: "max", // Run maximum instances of your app based on available CPU cores
      exec_mode: "cluster", // Use cluster mode for load balancing (optional)
      watch: false, // Disable file watching (set to true if you want PM2 to restart on file changes)
      env: {
        NODE_ENV: "production", // Set the environment variable to "production"
      },
      env_production: {
        NODE_ENV: "production", // Set environment variable for production explicitly (optional)
        PORT: 3000, // Define the port for production (optional)
      },
    },
    {
      name: "staging", // Name of your staging app
      script: "./app.js", // Path to your entry file
      instances: "max", // Run maximum instances of your app based on available CPU cores
      exec_mode: "cluster", // Use cluster mode for load balancing (optional)
      watch: false, // Disable file watching (set to true if you want PM2 to restart on file changes)
      env: {
        NODE_ENV: "staging", // Set the environment variable to "staging"
      },
      env_staging: {
        NODE_ENV: "staging", // Set environment variable for staging explicitly (optional)
        PORT: 4000, // Define the port for staging
      },
    },
  ],
};
