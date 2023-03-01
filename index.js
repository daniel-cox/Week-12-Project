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
  const apiData = await $.ajax({
    url: apiEndPointUrl,
    type: "GET",
    contentType: "application/json",
  }).catch((error) => {
    console.log("Oh no there was an error:", error);
  });

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
    ${recipeInstructions}
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

    if (activeStars === true) {
      newReviewInstance.Stars++;
    }
  }

  let StoredReview = document.getElementById("foodRatingTextArea").value;
  console.log("stored data", StoredReview);

  newReviewInstance.Review = StoredReview;
  console.log("incremented star rating", newReviewInstance);

  postReview(newReviewInstance);
});

// Call the createFoodApp function to display a random recipe on page load
createFoodApp();
