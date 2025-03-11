module.exports = {
  apps: [
    {
      name: "app-production", // Name of your app
      script: "./app.js", // Path to your entry file (e.g., app.js, server.js, etc.)
      instances: "max", // Run maximum instances of your app based on available CPU cores
      exec_mode: "cluster", // Use cluster mode for load balancing (optional)
      watch: false, // Disable file watching (set to true if you want PM2 to restart on file changes)
      env: {
        NODE_ENV: "production", // Set the environment variable to "production"
        PORT: 3000,
      },
    },
    {
      name: "app-staging", // Name of your app
      script: "./app.js", // Path to your entry file (e.g., app.js, server.js, etc.)
      instances: "max", // Run maximum instances of your app based on available CPU cores
      exec_mode: "cluster", // Use cluster mode for load balancing (optional)
      watch: false, // Disable file watching (set to true if you want PM2 to restart on file changes)
      env: {
        NODE_ENV: "staging", // Set environment variable for production explicitly (optional)
        PORT: 4000, // Define the port your app runs on (optional)
      },
    },
  ],
};
