//Lit HTML - Begin
//formats html in a template literal using the lit-html library
let html = (strings, ...values) => {
    let str = "";
    strings.forEach((string, i) => {
      str += string + (values[i] || "");
    });
    return str;
  };
  //Lit HTML - End

let submitBtn = document.getElementById("submitBtn")
submitBtn.addEventListener("click",() =>{
    let searchByFood = document.getElementById("foodSearch").value 
    console.log(searchByFood);
})
  
async function createFoodApp(foodGroup){
    const apikey = "4415612910a64dc9a7243128dc4b6ac0"
    const apiEndPointUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apikey}`
    console.log("createFoodApp foodGroup")

    // makes GET request to the API & catches the error if there is one
    const apiData = await $.ajax({
        url: apiEndPointUrl,
        type: "GET",
        contentType: "application/json"
    }).catch((error) => {
        console.log("Oh no there was an error:", error);
    });
    console.log(apiData.recipes);
    let recipeData = apiData.recipes[0]
     let recipeImageURL = recipeData.image
     let recipeID = recipeData.id
     let recipeInstructions = recipeData.instructions
     let recipePrepTime = recipeData.readyInMinutes
     let foodImageCard = document.getElementById("foodImageCard")
     let foodTitle = recipeData.title
     let cuisineType = recipeData.cuisines
       foodImageCard.innerHTML = html`<div id ="recipeID-${recipeID}"><img src="${recipeImageURL}" class="recipeImage img-fluid">
        <br>
        <span>Dish Name:</span><div class = "foodTitle">${foodTitle}</div>
        <br>
        <span>Cuisine Type:</span><div class = "cuisineType">${cuisineType}</div>
        <br>
        <span>Time To Cook:</span><div class = "foodTime">${recipePrepTime} minutes</div>
        <br>
        ${recipeInstructions}
    </div>`
}
// Calls the Create Food Function
createFoodApp()
