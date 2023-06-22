import marked from 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';

document.addEventListener('DOMContentLoaded', function() {
    fetch('/assets/blog-posts.json')
        .then(response => response.json())
        .then(data => {
            // Sort posts by date in descending order (most recent first)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const postsLinks = document.getElementById('posts-links');
            data.forEach(post => {
                const postLink = document.createElement('a');
                postLink.href = '#';
                postLink.textContent = post.title;
                postLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    fetch(`/assets/${post.link}`)
                        .then(response => response.text())
                        .then(md => {
                            document.getElementById('post-content').innerHTML = marked(md);
                        });
                });
                postsLinks.appendChild(postLink);
            });
        });
});
