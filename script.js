
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

        savedRecipes.splice(index, 1); 
        localStorage.setItem("recipes", JSON.stringify(savedRecipes));

        displayRecipes(); 
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

    document.addEventListener("DOMContentLoaded", () => {
        displayRecipes(); 
      });  


// registration
const baseURL = "http://localhost:3000"; 

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${baseURL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful:", data);
    } else {
      console.error("Registration failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

const loginForm = document.getElementById("loginForm"); 
loginForm.addEventListener("submit", loginUser); 

// login
async function loginUser(event) {
    event.preventDefault();
  
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
  