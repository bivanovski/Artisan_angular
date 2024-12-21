module.exports = {
    apps: [{
      name: 'artisan-market',
      script: 'npx serve',
      args: '-s /home/site/wwwroot -l 8080',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }]
  }