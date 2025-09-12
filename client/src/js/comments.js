export function initComments() {
  const commentForm = document.getElementById('comment-form');
  const commentsContainer = document.getElementById('comments');
  
  if (!commentForm || !commentsContainer) return;

  // Load comments from API
  loadComments();
  
  // Handle form submission
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userName = document.getElementById('user-name').value.trim() || 'Anonim';
    const userComment = document.getElementById('user-comment').value.trim();
    
    if (!userComment) {
      alert('Tulis sesuatu dulu ya!');
      return;
    }
    
    // Add user comment to top
    addUserComment(userName, userComment);
    
    // Clear form
    document.getElementById('user-name').value = '';
    document.getElementById('user-comment').value = '';
    
    // Show success message
    showSuccessMessage();
  });
}

async function loadComments() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const comments = await response.json();
    
    // Get first 5 comments
    const recentComments = comments.slice(0, 5);
    
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = recentComments.map(comment => 
      createCommentHTML(comment.name, comment.body, false)
    ).join('');
    
  } catch (error) {
    console.error('Error loading comments:', error);
    document.getElementById('comments').innerHTML = 
      '<p class="text-gray-500 text-center py-4">Gagal memuat komentar. Coba lagi nanti ya!</p>';
  }
}

function addUserComment(name, body) {
  const commentsContainer = document.getElementById('comments');
  const userCommentHTML = createCommentHTML(name, body, true);
  
  // Add to top of comments
  commentsContainer.insertAdjacentHTML('afterbegin', userCommentHTML);
}

function createCommentHTML(name, body, isUserComment = false) {
  const nameColor = isUserComment ? 'text-pink-600' : 'text-gray-800';
  const badge = isUserComment ? '<span class="text-xs text-pink-500 ml-2">(Baru)</span>' : '';
  const avatarColor = isUserComment ? 'bg-pink-500' : 'bg-gray-500';
  
  return `
    <div class="border-b border-gray-100 pb-3 mb-3">
      <div class="flex items-center mb-2">
        <div class="w-6 h-6 ${avatarColor} rounded-full flex items-center justify-center text-white text-xs font-medium mr-2">
          ${name.charAt(0).toUpperCase()}
        </div>
        <h5 class="font-medium ${nameColor}">${name}${badge}</h5>
      </div>
      <p class="text-gray-600 text-sm leading-relaxed ml-8">${body}</p>
    </div>
  `;
}

function showSuccessMessage() {
  const message = document.createElement('div');
  message.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded text-sm z-50';
  message.textContent = 'Komentar berhasil dikirim!';
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 2000);
}