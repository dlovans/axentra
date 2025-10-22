import { dev } from '$app/environment';
import matter from 'gray-matter';

// Get all post files
export async function getPosts() {
  let posts = [];

  const paths = import.meta.glob('../../content/posts/*.{md,svx}', { eager: true, query: '?raw', import: 'default' });

  for (const path in paths) {
    const rawContent = paths[path];
    const postName = path.split('/').at(-1)?.replace(/\.(md|svx)$/, '');

    if (rawContent && postName) {
      const { data: metadata } = matter(rawContent);
      const post = { ...metadata, postName };

      // Only include published posts in production
      if (dev || !post.draft) {
        posts.push(post);
      }
    }
  }

  // Sort posts by date (newest first)
  posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return posts;
}

// Get a single post by postName
export async function getPost(postName) {
  //Try .svx first, then .md
  try {
    const post = await import(`../../content/posts/${postName}.svx`);
    return {
      content: post.default,
      metadata: post.metadata
    };
  } catch (e) {
    try {
      const post = await import(`../../content/posts/${postName}.md`);
      return {
        content: post.default,
        metadata: post.metadata
      };
    } catch (e2) {
      return null;
    }
  }
}

// Get posts by tag
export async function getPostsByTag(tag) {
  const allPosts = await getPosts();
  return allPosts.filter(post => post.tags?.includes(tag));
}

// Get all unique tags
export async function getAllTags() {
  const allPosts = await getPosts();
  const tags = new Set();

  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

// Get featured posts
export async function getFeaturedPosts() {
  const allPosts = await getPosts();
  return allPosts.filter(post => post.featured);
}

// Calculate reading time estimate
export function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// Format date for display
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}