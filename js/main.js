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


function openBuyForm(plantName) {
    
    alert('Thank you for your purchase of ' + plantName + '!');
}

// Add this to handle the event when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all the Buy buttons
    var buyButtons = document.getElementsByClassName('buy-btn');

    // Add click event listeners to each Buy button
    for (var i = 0; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener('click', function() {
            var plantName = this.closest('.plant-item').getElementsByTagName('h3')[0].textContent;
            openBuyForm(plantName);
        });
    }
});
