
async function saveRecipe() {
  var title = document.getElementById("title").value;
  var ingredients = document.getElementById("ingredients").value;
  var instructions = document.getElementById("instructions").value;

  if (title && ingredients && instructions) {
    var recipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
    };

    try {
      const response = await fetch(`${baseURL}/api/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Recipe saved:", data);
        alert("Recipe Saved!");
        displayRecipes();
        clearForm();
      } else {
        console.error("Failed to save recipe:", response.statusText);
        alert("Failed to save recipe.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("Error saving recipe.");
    }
  } else {
    alert("Please fill in all fields.");
  }
}

async function deleteRecipe(index) {
  var savedRecipes = localStorage.getItem("recipes");
  savedRecipes = savedRecipes ? JSON.parse(savedRecipes) : [];

  if (savedRecipes.length <= index) {
    alert("Recipe not found at the specified index.");
    return;
  }

  var recipeToDelete = savedRecipes[index];

  var confirmDelete = confirm(
    "This action will delete your recipe from our database. Are you sure you want to proceed?"
  );

  if (confirmDelete) {
    try {
      const response = await fetch(`${baseURL}/api/recipes/${recipeToDelete._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        savedRecipes.splice(index, 1);
        localStorage.setItem("recipes", JSON.stringify(savedRecipes));

        displayRecipes();

        alert("Recipe deleted successfully!");
      } else {
        console.error("Recipe deletion failed:", response.statusText);
        alert("Failed to delete recipe.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }
}



async function displayRecipes() {
  try {
    const response = await fetch(`${baseURL}/api/recipes`);

    if (response.ok) {
      const recipes = await response.json();
      
      localStorage.setItem("recipes", JSON.stringify(recipes));

      var recipesList = document.getElementById("recipes");
      recipesList.innerHTML = "";

      recipes.forEach(function (recipe, index) {
        var li = document.createElement("li");
        li.className = "recipe-item";
        li.innerHTML =
          "<strong>" +
          recipe.title +
          "</strong><br>" +
          "Ingredients: " +
          recipe.ingredients +
          "<br>" +
          "Instructions: " +
          recipe.instructions;

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerText = "Delete";

        deleteButton.onclick = function () {
          deleteRecipe(index);
        };
        li.appendChild(deleteButton);

        recipesList.appendChild(li);
      });
    } else {
      console.error("Failed to get recipes:", response.statusText);
      alert("Failed to get recipes.");
    }
  } catch (error) {
    console.error("Error getting recipes:", error);
    alert("Error getting recipes.");
  }
}



    function clearForm() {
        document.getElementById("title").value = "";
        document.getElementById("ingredients").value = "";
        document.getElementById("instructions").value = "";
    }

    document.addEventListener("DOMContentLoaded", () => {
        displayRecipes(); 
      });  


// registration
const baseURL = "http://localhost:10000";
; 

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", registerUser);

async function registerUser(event) { // func acts as event handler and the para event will be given the arg when the event such as form submission (in this case) occurs
  event.preventDefault(); // prevents page-reload

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${baseURL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }), // Converts JS Obj to JSON and Stores in Request body
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
    } else {
      console.error("Registration failed:", response.statusText); // statusText is a prop. of the response Obj
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

const loginForm = document.getElementById("loginForm"); 
loginForm.addEventListener("submit", loginUser); 

// login
async function loginUser(event) {
  
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;
  
    try {
      const response = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  