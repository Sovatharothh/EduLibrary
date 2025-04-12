document.addEventListener('DOMContentLoaded', async function () {
  try {
    const API_URL = 'https://dev.to/api/articles?username=thepracticaldev';

    console.log('Fetching from:', API_URL);

    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Data:', data);

    if (!data || data.length === 0) {
      throw new Error('No posts found in response');
    }

    displayPosts(data);
  } catch (error) {
    console.error('Full Error:', error);
    document.getElementById('blog-list').innerHTML = `
      <div class="error">
        <p>Failed to load posts</p>
        <p>${error.message}</p>
        <small>Check console for details</small>
      </div>
    `;
  }
});

function displayPosts(posts) {
  const blogList = document.getElementById('blog-list');
  blogList.innerHTML = posts.map(post => {
    const title = post.title?.trim() || 'Untitled Post';
    const rawDescription = post.description?.trim() || '';
    const description = rawDescription.replace(/<[^>]*>/g, '');

    const url = post.url || '#';
    const image = post.cover_image || 'https://via.placeholder.com/300x150?text=No+Image';

    const showDescription = description.toLowerCase() !== title.toLowerCase();

    return `
      <div class="blog-card">
        <img src="${image}" alt="${title}" class="blog-image">
        <h3>${title}</h3>
        ${showDescription ? `<p>${description.substring(0, 150)}...</p>` : ''}
        <a href="${url}" class="read-more" target="_blank">Read More</a>      
      </div>
    `;
  }).join('');
}


function searchBlogs() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const posts = document.querySelectorAll(".blog-card");

  posts.forEach(post => {
    const title = post.querySelector("h3").textContent.toLowerCase();
    const content = post.querySelector("p").textContent.toLowerCase();

    if (title.includes(query) || content.includes(query)) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  });
}
