module.exports = {
  apps: [
    {
      name: 'bengkel-frontend',
      script: 'node_modules/next/dist/bin/next',
      interpreter: '/root/.nvm/versions/node/v20.14.0/bin/node',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      
      // Hapus hardcode PORT di sini agar PM2 murni membaca PORT dari file .env kamu!
      env: {
        NODE_ENV: 'production', 
      }
    }
  ]
};