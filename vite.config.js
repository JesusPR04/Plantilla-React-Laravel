import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import copy from '@vite-plugin-copy';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        copy({
            targets: [
                { src: 'resources/js/react/assets/favicon.ico', dest: 'dist' }
            ]
        })
    ],
});
