import { writable } from 'svelte/store';

// Create a writable store with default title
export const pageTitle = writable('');

// Helper function to set the page title with the Axentra prefix
export function setPageTitle(title) {
  if (title) {
    pageTitle.set(`Axentra | ${title}`);
  } else {
    pageTitle.set('Axentra | Snabb MVP-utveckling för innovativa startups');
  }
} 