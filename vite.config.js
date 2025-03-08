import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Make environment variables available to the application
	server: {
		fs: {
			// Allow serving files from one level up the project root, such as .env
			allow: ['..']
		}
	}
});
