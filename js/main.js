import { getAllPosts } from './data.js';
import { renderGallery } from './gallery.js';
import './validation.js';
import { uploadPost } from './upload-form.js';

uploadPost();
const posts = getAllPosts();
renderGallery(posts);
