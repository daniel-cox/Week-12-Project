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

async function postReview(reviewData) {
  console.log("testing the post", reviewData);
  let reviewPostURL =
    "https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods";
  return await $.ajax({
    //return the ajax request
    url: reviewPostURL,
    data: JSON.stringify({
      Stars: reviewData.Stars,
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

  // Log a message to indicate that the function is running
  console.log("createFoodApp foodGroup");

  // Make a GET request to the API to retrieve random recipe data
  // const apiData = await $.ajax({
  //   url: apiEndPointUrl,
  //   type: "GET",
  //   contentType: "application/json",
  // }).catch((error) => {
  //   console.log("Oh no there was an error:", error);
  // });

  // Create an object called "apiData" that contains an array called "recipes"
  let apiData = {
    recipes: [
      {
        // Adds an object to the "recipes" array
        id: 123,
        title: "Chicken Pasta Salad",
        instructions:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit dictum ipsum. Sed id scelerisque risus, eget tincidunt sem. Nullam at pellentesque lorem. Maecenas rhoncus euismod ex in pulvinar. Suspendisse nec magna leo. Ut congue ipsum ut augue mollis, vel vestibulum ex ultricies. Fusce sit amet tortor nibh. Praesent mollis molestie urna, in posuere ligula egestas quis. Vivamus porta aliquet justo, sollicitudin commodo ex. Praesent sit amet purus tortor. Nunc pellentesque risus erat, non posuere lacus vestibulum ac. Integer posuere sapien nec nunc fringilla scelerisque. Pellentesque quis neque laoreet, laoreet tellus in, suscipit justo",
      },
    ],
  };

  // Log the recipe data to the console for debugging purposes
  console.log(apiData.recipes);

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
const stars = document.querySelectorAll(".star");

// Add click event listener to each star
stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");

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
    this.Review = reviewValue;
  }
}

// Add an event listener to the submit button that runs a function when clicked
submitReviewBtn.addEventListener("click", () => {
  console.log("this is a test");

  let newReviewInstance = new StoredStarProperties();

  //Get all the elements with the class "star"
  let currentStars = document.querySelectorAll(".star");
  console.log(currentStars);

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
  console.log("stored data", StoredReview);

  // Set the Review property of newReviewInstance to the stored review
  newReviewInstance.Review = StoredReview;
  console.log("incremented star rating", newReviewInstance);

  // Call the postReview function with the new review instance as an argument
  postReview(newReviewInstance);
});

// Asynchronously get review data from Mock API
async function GetReviews() {
  try {
    // Fetch review data from mock API using jQuery's $.get() method
    const reviewData = await $.get(
      "https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods"
    );

    // Get a reference to the review container element
    const reviewContainer = document.getElementById("reviewContainer");

    // Get the first review in the response data array
    const firstReview = reviewData[0];

    console.log();

    // Create a new review element
    const reviewElement = document.createElement("div");

    // Set the review element's content to the review text
    reviewElement.textContent = firstReview.reviewText;

    // Append the review element to the review container
    reviewContainer.appendChild(reviewElement);
  } catch (error) {
    console.error(
      "There was an error displaying the product review, please try again.",
      error
    );
  }
}

// let foodReviews = document.getElementById("reviewContainer")
// let reviewData = await $.get(
//   "https://63fe9c51c5c800a72382eca5.mockapi.io/Promineo_Tech_Week12/happyfoods"
// );
// console.log(reviewData);

// Call the GetReviews function to retrieve review data from the API
GetReviews();

//TODO

//TODO Delete specific reviews by ID

//TODO Update Existing review Data by ID

// Call the createFoodApp function to display a random recipe on page load
createFoodApp();
