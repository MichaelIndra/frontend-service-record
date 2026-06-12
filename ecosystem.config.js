module.exports = {
  apps: [
    {
      name: 'bengkel-frontend',
      script: 'node_modules/next/dist/bin/next',
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