
    function saveRecipe() {
        var title = document.getElementById("title").value;
        var ingredients = document.getElementById("ingredients").value;
        var instructions = document.getElementById("instructions").value;

        if (title && ingredients && instructions) {
            var recipe = {
                title: title,
                ingredients: ingredients,
                instructions: instructions
            };

            var savedRecipes = localStorage.getItem("recipes");
            savedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

            savedRecipes.push(recipe);
            localStorage.setItem("recipes", JSON.stringify(savedRecipes));

            displayRecipes();
            alert("Saved!")
            clearForm();
        } else {
            alert("Please fill in all fields.");
        }
    }

    function deleteRecipe(index) {
        var savedRecipes = localStorage.getItem("recipes");
        savedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

        savedRecipes.splice(index, 1); // Remove the recipe at the specified index
        localStorage.setItem("recipes", JSON.stringify(savedRecipes));

        displayRecipes(); // Update the displayed list of recipes
    }

    function displayRecipes() {
        var savedRecipes = localStorage.getItem("recipes");
        savedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

        var recipesList = document.getElementById("recipes");
        recipesList.innerHTML = "";

        savedRecipes.forEach(function(recipe, index) {
            var li = document.createElement("li");
            li.className = "recipe-item";
            li.innerHTML =
                "<strong>" + recipe.title + "</strong><br>" +
                "Ingredients: " + recipe.ingredients + "<br>" +
                "Instructions: " + recipe.instructions;

            var deleteButton = document.createElement("button");
            

            deleteButton.className = "delete-btn"
            deleteButton.innerText = "Delete";
            deleteButton.onclick = function() {
                deleteRecipe(index);
            };
            li.appendChild(deleteButton);

            recipesList.appendChild(li);
        });
    }

    function clearForm() {
        document.getElementById("title").value = "";
        document.getElementById("ingredients").value = "";
        document.getElementById("instructions").value = "";
    }

    displayRecipes(); // Calls the displayRecipes() function to show any previously saved recipes when the page loads.

