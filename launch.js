import { spawn } from 'child_process';
import { join } from 'path';
import { exec } from 'child_process';

const rootDir = __dirname;
const backendDir = join(rootDir, 'backend');
const frontendDir = join(rootDir, 'frontend');

// Function to open browser after a delay
function openBrowser(url, delay = 3000) {
    setTimeout(() => {
        const platform = process.platform;
        let command;

        if (platform === 'darwin') {
            command = `open ${url}`;
        } else if (platform === 'win32') {
            command = `start ${url}`;
        } else {
            command = `xdg-open ${url}`;
        }

        exec(command, (error) => {
            if (error) {
                console.log(`⚠️  Could not automatically open browser. Please navigate to ${url}`);
            } else {
                console.log(`🌐 Opened browser to ${url}`);
            }
        });
    }, delay);
}

// Start backend
console.log('🚀 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
    cwd: backendDir,
    stdio: 'inherit',
    shell: true
});

// Start frontend
console.log('🚀 Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
    cwd: frontendDir,
    stdio: 'inherit',
    shell: true
});

// Open browser after both servers start
openBrowser('http://localhost:5173');

// Handle cleanup on exit
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down servers...');
    backend.kill();
    frontend.kill();
    process.exit(0);
});

// Handle errors
backend.on('error', (error) => {
    console.error('❌ Backend error:', error);
});

frontend.on('error', (error) => {
    console.error('❌ Frontend error:', error);
});