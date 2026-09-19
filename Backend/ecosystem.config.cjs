module.exports = {
  apps: [
    {
      name: "my-app",
      script: "server.js",
      instances: "max", // uses all available CPU cores
      exec_mode: "cluster", // enables cluster mode
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
