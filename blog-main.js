document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.getElementById('menu-btn');
    const content = document.querySelector('.content');

    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    content.addEventListener('click', function() {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

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
                    if (sidebar.classList.contains('open')) {
                        sidebar.classList.remove('open');
                    }
                    fetch(`/assets/${post.link}`)
                        .then(response => response.text())
                        .then(md => {
                            console.log(md);
                            document.getElementById('post-content').innerHTML = marked.parse(md);
                        });
                });
                postsLinks.appendChild(postLink);
            });
        });
});
