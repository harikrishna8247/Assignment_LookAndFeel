/*document.addEventListener('DOMContentLoaded', loadReviews);

let currentlyEditingIndex = null; // Track which review is being edited

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviewsForFern') || '[]');
    const reviewsContainer = document.getElementById('reviewsContainer');
    reviewsContainer.innerHTML = reviews.map((review, index) => `
        <div class="review">
            <p>${review}</p>
            <button onclick="editReview(${index})">Edit</button>
            <button onclick="deleteReview(${index})">Delete</button>
        </div>
    `).join('');
}

function submitReview() {
    const reviewText = document.getElementById('reviewText').value.trim();
    if (reviewText) {
        const reviews = JSON.parse(localStorage.getItem('reviewsForFern') || '[]');
        if (currentlyEditingIndex !== null) {
            // Update existing review
            reviews[currentlyEditingIndex] = reviewText;
        } else {
            // Add new review
            reviews.push(reviewText);
        }
        localStorage.setItem('reviewsForFern', JSON.stringify(reviews));
        clearForm();
        loadReviews();
    } else {
        alert('Please enter a review.');
    }
}

function editReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviewsForFern') || '[]');
    document.getElementById('reviewText').value = reviews[index];
    currentlyEditingIndex = index; // Set the index to the currently editing review
    // Optionally, scroll to the review input area
    document.getElementById('reviewText').scrollIntoView();
}

function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem('reviewsForFern') || '[]');
    reviews.splice(index, 1);
    localStorage.setItem('reviewsForFern', JSON.stringify(reviews));
    loadReviews();
}

function clearForm() {
    document.getElementById('reviewText').value = '';
    currentlyEditingIndex = null; // Reset the editing index
}
*/
// Assume that localStorage keys are structured like 'reviews_Spider_Plant', 'reviews_Peace_Lily', etc.
// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Get the plant name from the URL query parameters
  const params = new URLSearchParams(window.location.search);
  const plantName = params.get('plant') || 'default';
  document.getElementById('plantTitle').textContent = `Plant Reviews for ${plantName}`;
  loadReviews(plantName);
});

function loadReviews(plantName) {
  const reviews = JSON.parse(localStorage.getItem('reviews_' + plantName) || '[]');
  const reviewsContainer = document.getElementById('reviewsContainer');
  reviewsContainer.innerHTML = reviews.map((review, index) => `
      <div class="review">
          <p>${review}</p>
          <button onclick="startEditReview(${index}, '${plantName}')">Edit</button>
          <button onclick="deleteReview(${index}, '${plantName}')">Delete</button>
      </div>
  `).join('');
}

function submitReview() {
  const reviewText = document.getElementById('reviewText').value.trim();
  const params = new URLSearchParams(window.location.search);
  const plantName = params.get('plant') || 'default';
  const reviews = JSON.parse(localStorage.getItem('reviews_' + plantName) || '[]');

  if (reviewText) {
      if (currentlyEditingIndex !== null) {
          reviews[currentlyEditingIndex] = reviewText;
          currentlyEditingIndex = null;
      } else {
          reviews.push(reviewText);
      }
      localStorage.setItem('reviews_' + plantName, JSON.stringify(reviews));
      document.getElementById('reviewText').value = ''; // Clear input
      loadReviews(plantName);
  } else {
      alert('Please enter a review.');
  }
}

function startEditReview(index, plantName) {
  const reviews = JSON.parse(localStorage.getItem('reviews_' + plantName) || '[]');
  document.getElementById('reviewText').value = reviews[index];
  currentlyEditingIndex = index;
  document.getElementById('submitReviewButton').style.display = 'none';
  document.getElementById('editButton').style.display = 'block';
}

function updateReview() {
  submitReview();
}

function deleteReview(index, plantName) {
  const reviews = JSON.parse(localStorage.getItem('reviews_' + plantName) || '[]');
  reviews.splice(index, 1);
  localStorage.setItem('reviews_' + plantName, JSON.stringify(reviews));
  loadReviews(plantName);
}

let currentlyEditingIndex = null; // Moved here for visibility

function clearForm() {
  document.getElementById('reviewText').value = '';
  currentlyEditingIndex = null;
  document.getElementById('submitReviewButton').style.display = 'block';
  document.getElementById('editButton').style.display = 'none';
}
