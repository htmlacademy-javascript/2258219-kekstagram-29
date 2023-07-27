import { getAllPosts } from './data.js';
import { renderGallery } from './gallery.js';
import { sendForm } from './upload-form.js';
import './api.js';
sendForm();
const posts = getAllPosts();
renderGallery(posts);
