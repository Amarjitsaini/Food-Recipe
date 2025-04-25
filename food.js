document.getElementById("getRecipesBtn").addEventListener("click", () => {
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian")
      .then(res => res.json())
      .then(data => {
        const meals = data.meals; 
        const container = document.getElementById("recipeContainer");
        container.innerHTML = "";
  
        meals.forEach(meal => {
          const card = document.createElement("div");
          card.className = "recipe-card";
          card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
          `;
          card.addEventListener("click", () => showDetails(meal.idMeal));
          container.appendChild(card);
        });
      });
  });
  
  function showDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(res => res.json())
      .then(data => {
        const meal = data.meals[0];
        const detailBox = document.getElementById("recipeDetails");
        detailBox.classList.remove("hidden");
  
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ing && ing.trim() !== "") {
            ingredients += `<li>${ing} - ${measure}</li>`;
          }
        }
  
        detailBox.innerHTML = `
        <div class = "cards">
        <div class = "card1" >
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" style="width: 300px; border-radius: 10px;"/>
          </div>
          <div class = "card2" >
          <h3>Ingredients:</h3>
          <ul>${ingredients}</ul>
          </div>
          </div>
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
        `;
        detailBox.scrollIntoView({ behavior: "smooth" });
      });
  }
  