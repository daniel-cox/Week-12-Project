//formats html in a template literal using the lit-html library
let html = (strings, ...values) => {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (values[i] || "");
  });
  return str;
};

// Get submit button by ID
let submitBtn = document.getElementById("submitBtn");

async function postReview(reviewData, foodTitleReview) {
  // console.log("testing the post", reviewData);
  let reviewPostURL =
    "https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods";
  return await $.ajax({
    //return the ajax request
    url: reviewPostURL,
    data: JSON.stringify({
      Stars: reviewData.Stars,
      Title: foodTitleReview,
      Review: reviewData.Review,
    }), //pass the food group to be created and turns it into JSON data
    dataType: "json", //set the data type to be json
    type: "POST", //set the type of request to be a POST request
    contentType: "application/json", //set the content type to be json
    crossDomain: true, //set the cross domain to be true
  });
}

// Create an async function to retrieve random recipe data from Spoonacular API
async function createFoodApp(foodGroup) {
  // Set API key and endpoint URL
  const apikey = "4415612910a64dc9a7243128dc4b6ac0";
  const apiEndPointUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apikey}`;

  // console.log("createFoodApp foodGroup");

  //Make a GET request to the API to retrieve random recipe data
  const apiData = await $.ajax({
    url: apiEndPointUrl,
    type: "GET",
    contentType: "application/json",
  }).catch((error) => {
    // console.log("Oh no there was an error:", error);
  });

  //NOTE - uncomment only if API is not working, then comment lines 41-47

  // Create an object called "apiData" that contains an array called "recipes"
  // let apiData = {
  //   recipes: [
  //     {
  //       id: 123,
  //       title: "Chicken Pasta Salad",
  //       instructions:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit dictum ipsum. Sed id scelerisque risus, eget tincidunt sem. Nullam at pellentesque lorem. Maecenas rhoncus euismod ex in pulvinar. Suspendisse nec magna leo. Ut congue ipsum ut augue mollis, vel vestibulum ex ultricies. Fusce sit amet tortor nibh. Praesent mollis molestie urna, in posuere ligula egestas quis. Vivamus porta aliquet justo, sollicitudin commodo ex. Praesent sit amet purus tortor. Nunc pellentesque risus erat, non posuere lacus vestibulum ac. Integer posuere sapien nec nunc fringilla scelerisque. Pellentesque quis neque laoreet, laoreet tellus in, suscipit justo",
  //     },
  //   ],
  // };

  // console.log(apiData.recipes);

  //TODO -  Search functionality to be added later
  // async function searchFood() {
  //   const searchQuery = document.getElementById("foodSearch").value;
  //   const apiEndPointUrl =
  //     "https://api.spoonacular.com/recipes/findByIngredients?apiKey=4415612910a64dc9a7243128dc4b6ac0=" +
  //     searchQuery;

  //   fetch(apiEndPointUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  // }

  // Extract relevant recipe data from the API response
  let recipeData = apiData.recipes[0];
  let recipeImageURL = recipeData.image;
  let recipeID = recipeData.id;
  let recipeInstructions = recipeData.instructions;
  let recipePrepTime = recipeData.readyInMinutes;
  let foodImageCard = document.getElementById("foodImageCard");
  let foodTitle = recipeData.title;
  let cuisineType = recipeData.cuisines;

  // Set the HTML content of the "foodImageCard" element to display the recipe data using a template literal
  foodImageCard.innerHTML = html`<div id="recipeID-${recipeID}">
    <img src="${recipeImageURL}" class="recipeImage img-fluid" />
    <br />
    <span>Dish Name:</span>
    <div class="foodTitle">${foodTitle}</div>
    <br />
    <span>Cuisine Type:</span>
    <div class="cuisineType">${cuisineType}</div>
    <br />
    <span>Time To Cook:</span>
    <div class="foodTime">${recipePrepTime} minutes</div>
    <br />
    <div class="foodDescription">${recipeInstructions}</div>
  </div>`;
}

// Get all stars by class
let stars = document.querySelectorAll(".star");

// Add click event listener to each star
stars.forEach((star) => {
  star.addEventListener("click", () => {
    let value = star.getAttribute("data-value");

    // Remove active class from all stars
    stars.forEach((s) => s.classList.remove("active"));

    // Add active class to clicked star and all previous stars
    for (let i = 0; i < value; i++) {
      stars[i].classList.add("active");
    }
  });
});

// Get the submit button element with the ID "submitReview"
let submitReviewBtn = document.getElementById("submitReview");

class StoredStarProperties {
  constructor(reviewValue) {
    this.Stars = 0;
    this.Title = "";
    this.Review = reviewValue;
  }
}

// Add an event listener to the submit button that runs a function when clicked
submitReviewBtn.addEventListener("click", () => {
  // console.log("this is a test");

  let newReviewInstance = new StoredStarProperties();

  //Get all the elements with the class "star"
  let currentStars = document.querySelectorAll(".star");
  // console.log(currentStars);

  //Loop through each element in the "currentStars" Nodelist
  for (let i = 0; i < currentStars.length; i++) {
    let activeStars = currentStars[i].classList.contains("active");

    // Check if the current star is active
    if (activeStars === true) {
      newReviewInstance.Stars++;
    }
  }

  // Get the value of the text area with the ID "foodRatingTextArea"
  let StoredReview = document.getElementById("foodRatingTextArea").value;
  // console.log("stored data", StoredReview);

  // Set the Review property of newReviewInstance to the stored review
  newReviewInstance.Review = StoredReview;
  // console.log("incremented star rating", newReviewInstance);
  let foodTitle = document.querySelector(".foodTitle").textContent;
  // console.log("logging food title", foodTitle.textContent);

  // Call the postReview function with the new review instance as an argument
  postReview(newReviewInstance, foodTitle);
  setTimeout(() => {
    getReviews();
  }, "100");
});

// Asynchronously get review data from Mock API
async function getReviews() {
  // console.log("getting reviews");
  try {
    // Fetch review data from mock API
    let reviewData = await $.get(
      "https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods"
    );

    // Get a reference to the review container element
    let reviewContainer = document.getElementById("reviewContainer");
    reviewContainer.innerHTML = "";
    let bottomCard = document.querySelectorAll(".bottom-card");
    bottomCard[0].style.opacity = 0;
    console.log("bottom card error", bottomCard);

    // Loop through the array and create a new review element for each review
    reviewData.forEach((review) => {
      // console.log(review);
      // Create a new review element
      let reviewElement = document.createElement("div");
      review.id;
      // Set the review element's content to the review text
      reviewElement.innerHTML = html`<div class="card reviewCard">
          <button
            type="button"
            id="delete-btn-${review.id}"
            class="btn btn-danger"
          >
            Delete Review
          </button>
          <br />
          <br />
          <b>Rating:</b> ${review.Stars} stars
        </div>
        <br />
        <b>Food Name:</b> ${review.Title}
        <br />
        <b>Review:</b> ${review.Review}
        <br />
        <button
          type="button"
          id="edit-btn-${review.id}"
          class="btn btn-warning"
        >
          Edit Review
        </button>
        <hr />
        <div id="editForm"></div> `;

      setTimeout(() => {
        editExistingReview(review.id);
        deleteExistingReview(review.id);
      }, "0");
      // Append the review element to the review container

      setTimeout(() => {
        bottomCard[0].style.opacity = 1;
        bottomCard[0].style.transition = "opacity 4s ease-in";
      }, "500");

      reviewContainer.appendChild(reviewElement);
    });
  } catch (error) {
    console.error(
      "There was an error displaying the product review, please try again.",
      error
    );
  }
}

function RetrieveReviews(RetrieveReviews) {
  // console.log("Review Data displayed here:", RetrieveReviews);
}

// Call the GetReviews function to retrieve review data from the API
getReviews();

//TODO Delete specific reviews by ID

function deleteExistingReview(deleteReviewID) {
  // console.log("Deleting review", deleteReviewID);

  let deleteReviewBtn = document.getElementById(`delete-btn-${deleteReviewID}`);
  // console.log(deleteReviewBtn);
  deleteReviewBtn.addEventListener("click", () => {
    // console.log("review has been deleted");
    let deleteReviewURL = `https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods/${deleteReviewID}`;
    $.ajax({
      //return the ajax request
      url: deleteReviewURL,
      type: "DELETE", //set the type of request to be a DELETE request
      crossDomain: true, //set the cross domain to be true
    });
    setTimeout(() => {
      getReviews();
    }, "100");
  });
}

//TODO Update Existing review Data by ID

async function editReview() {
  let FoodValueArray = [];
  // Get the edit form and create a new modal element
  let editForm = document.getElementById("editForm");
  let reviewModal = document.createElement("modal");

  // Initialize variables for closing and pausing the modal
  let closeModal = false;
  let pauseModal = true;

  // Set the HTML for the modal, including star ratings and review text area
  reviewModal.innerHTML = "";
  reviewModal.innerHTML = html`
    <div id="rating">
      <span class="editStar" value="star-1" data-value="1">&#9733;</span>
      <span class="editStar" value="star-2" data-value="2">&#9733;</span>
      <span class="editStar" value="star-3" data-value="3">&#9733;</span>
      <span class="editStar" value="star-4" data-value="4">&#9733;</span>
      <span class="editStar" value="star-5" data-value="5">&#9733;</span>
    </div>

    <label for="foodRatingLabel" class="form-label"
      >Update your Review (max 150 characters)</label
    >
    <textarea
      class="form-control"
      id="editFoodRatingTextArea"
      rows="5"
      maxlength="150"
    ></textarea>
    <button type="button" class="btn btn-primary mt-2" id="editReview">
      Update Review
    </button>
  `;

  // Append the modal to the edit form
  editForm.appendChild(reviewModal);

  // Add event listeners to the stars to update the selected rating value
  const stars = document.querySelectorAll(".editStar");

  // Add event listener to each star
  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const ratingValue = star.getAttribute("data-value");
      // console.log(`Selected rating value: ${ratingValue}`);

      // Remove all previous star values from the array
      FoodValueArray = [];
      // Push the selected star value to the array
      FoodValueArray.push(ratingValue);

      // Update the CSS to highlight the selected edited star
      stars.forEach((s) => s.classList.remove("editStar-selected"));
      star.classList.add("editStar-selected");
    });
  });

  // Wrap the event listener in a Promise and wait for it to resolve
  const editReviewBtn = document.getElementById("editReview");
  await new Promise((resolve) => {
    console.log("this is a test");

    let newReviewInstance = new StoredStarProperties();

    //Get all the elements with the class "star"
    let currentStars = document.querySelectorAll(".editStar");

    stars.forEach((star) => {
      star.addEventListener("click", () => {
        console.log("test", star);
        let value = star.getAttribute("data-value");
        console.log("test2", value);
        // Remove active class from all stars
        stars.forEach((s) => s.classList.remove("active"));

        // Add active class to clicked star and all previous stars
        for (let i = 0; i < value; i++) {
          console.log("test3", stars[i]);
          stars[i].classList.add("active");
        }
      });
    });

    console.log(currentStars);

    //Loop through each element in the "currentStars" Nodelist
    for (let i = 0; i < currentStars.length; i++) {
      let activeStars = currentStars[i].classList.contains("active");

      // Check if the current star is active
      if (activeStars === true) {
        newReviewInstance.Stars++;
      }
    }

    editReviewBtn.addEventListener("click", () => {
      // console.log("review Paused, editing review");

      pauseModal = false;
      const editFoodRatingTextArea = document.getElementById(
        "editFoodRatingTextArea"
      ).value;
      // console.log("edit review btn", editFoodRatingTextArea);
      FoodValueArray.push(editFoodRatingTextArea);
      reviewModal.innerHTML = "";
      resolve();
    });
  });

  // console.log("edit form div", editForm);
  return FoodValueArray;
}

//NOTE This function is called when the user clicks the "Edit Review" button for an existing review
function editExistingReview(editReviewID) {
  // console.log("Editing review", editReviewID);
  let editReviewBtn = document.getElementById(`edit-btn-${editReviewID}`);
  // console.log(editReviewID);
  editReviewBtn.addEventListener("click", () => {
    // console.log("You have edited your review", editReviewID);
    let editReviewURL = `https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods/${editReviewID}`;

    //have a form specifically for editing the review

    // pass stars and review values into 268/269

    async function updateReview() {
      let FoodeditVar = await editReview();
      // console.log("after function has ran", FoodeditVar);
      let newStarRating = FoodeditVar[0];
      let newReviewData = FoodeditVar[1];
      // console.log(newReviewData);

      $.ajax({
        //return the ajax request
        url: editReviewURL,
        data: JSON.stringify({
          Stars: newStarRating,
          Review: newReviewData,
        }), //pass the food group to be created and turns it into JSON data
        dataType: "json", //set the data type to be json
        type: "PUT", //set the type of request to be a POST request
        contentType: "application/json", //set the content type to be json
        crossDomain: true, //set the cross domain to be true
      });

      // NOTE timeout being set for getting reviews
      setTimeout(() => {
        getReviews();
      }, "100");
    }
    updateReview();
  });
}
// Call the createFoodApp function to display a random recipe on page load
createFoodApp();
