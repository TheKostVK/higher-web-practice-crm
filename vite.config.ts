import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    base: '/higher-web-practice-crm/',
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            '@': path.resolve(projectRoot, 'src'),
        },
    },
});
