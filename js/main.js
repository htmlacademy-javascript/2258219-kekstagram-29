import { getAllPosts } from './data.js';
import { renderGallery } from './gallery.js';

const posts = getAllPosts();
renderGallery(posts);
