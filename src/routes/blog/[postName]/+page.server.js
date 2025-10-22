import { getPosts } from '$lib/utils/posts.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  const posts = await getPosts();
  const post = posts.find(p => p.postName === params.postName);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return {
    post
  };
}

export async function entries() {
  const posts = await getPosts();
  return posts.map(post => ({
    postName: post.postName
  }));
}

export const prerender = true;