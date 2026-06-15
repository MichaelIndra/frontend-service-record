const { spawn } = require('child_process');

const nodePath = '/root/.nvm/versions/node/v20.14.0/bin/node';
const nextPath = './node_modules/next/dist/bin/next';

console.log('Memulai Next.js dengan Node v20 via Spawn...');

// Menjalankan Next.js menggunakan spawn agar log langsung terlihat
const nextProcess = spawn(nodePath, [nextPath, 'start'], {
  env: { ...process.env, NODE_ENV: 'production', PORT: '84' }
});

// Alirkan log standar dari Next.js ke PM2
nextProcess.stdout.on('data', (data) => {
  console.log(data.toString().trim());
});

// Alirkan log ERROR dari Next.js ke PM2
nextProcess.stderr.on('data', (data) => {
  console.error(data.toString().trim());
});

nextProcess.on('close', (code) => {
  console.log(`Proses Next.js berhenti dengan kode: ${code}`);
});
