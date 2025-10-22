import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter()
	}
};

export default config