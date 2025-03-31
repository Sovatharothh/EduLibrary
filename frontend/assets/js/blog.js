document.addEventListener('DOMContentLoaded', async function() {
  try {
    const API_KEY = 'AIzaSyBeC6YhKITdDOQkJR3RiYrcikTdB8J2LZI';
    const BLOG_ID = '2399953';
    
    // Option 1: Direct API (works on deployed sites)
    const API_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
    
    // Option 2: CORS Proxy (for local testing)
    // const API_URL = `https://corsproxy.io/?${encodeURIComponent(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`)}`;
    
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
    
    if (!data.items || data.items.length === 0) {
      throw new Error('No posts found in response');
    }
    
    displayPosts(data.items);
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
    // handle possible undefined values
    const title = post.title || 'Untitled Post';
    const content = post.content ? post.content.replace(/<[^>]*>/g, '') : 'No content available';
    const url = post.url || '#';
    
    return `
      <div class="blog-card">
        <h3>${title}</h3>
        <p>${content.substring(0, 150)}...</p>
        <a href="${url}" class="read-more" target="_blank">Read More</a>      
      </div>
    `;
  }).join('');
}