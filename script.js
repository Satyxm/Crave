document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.innerHTML = navLinks.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
});


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
      displayRecipeCards(recipes);
    } else {
      console.error("Failed to get recipes:", response.statusText);
      // Display sample recipes when API fails
      displaySampleRecipes();
    }
  } catch (error) {
    console.error("Error getting recipes:", error);
    // Display sample recipes when there's an error
    displaySampleRecipes();
  }
}

function displayRecipeCards(recipes) {
  var recipesList = document.getElementById("recipe-list");
  recipesList.innerHTML = "";

  // Group recipes into pairs
  for (let i = 0; i < recipes.length; i += 2) {
    const row = document.createElement("div");
    row.className = "recipe-row";

    // First recipe in the row
    if (recipes[i]) {
      const card1 = createRecipeCard(recipes[i], i);
      row.appendChild(card1);
    }

    // Second recipe in the row
    if (recipes[i + 1]) {
      const card2 = createRecipeCard(recipes[i + 1], i + 1);
      row.appendChild(card2);
    }

    recipesList.appendChild(row);
  }
}

function displaySampleRecipes() {
  const sampleRecipes = [
    {
      title: "Classic Margherita Pizza",
      description: "A traditional Italian pizza with fresh tomatoes, mozzarella, and basil.",
      image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cookingTime: "25",
      difficulty: "Medium"
    },
    {
      title: "Chicken Stir Fry",
      description: "Quick and healthy Asian-inspired stir fry with fresh vegetables.",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cookingTime: "20",
      difficulty: "Easy"
    },
    {
      title: "Chocolate Lava Cake",
      description: "Rich and decadent chocolate cake with a molten center.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cookingTime: "15",
      difficulty: "Medium"
    },
    {
      title: "Fresh Pasta Carbonara",
      description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      cookingTime: "30",
      difficulty: "Hard"
    }
  ];

  displayRecipeCards(sampleRecipes);
}

function createRecipeCard(recipe, index) {
  const card = document.createElement("div");
  card.className = "recipe-card";

  card.innerHTML = `
    <img src="${recipe.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'}" 
         alt="${recipe.title}" 
         class="recipe-image">
    <div class="recipe-content">
      <h3 class="recipe-title">${recipe.title}</h3>
      <p class="recipe-description">${recipe.description || 'A delicious recipe waiting to be discovered.'}</p>
      <div class="recipe-meta">
        <span><i class="fas fa-clock"></i> ${recipe.cookingTime || '30'} mins</span>
        <span><i class="fas fa-utensils"></i> ${recipe.difficulty || 'Medium'}</span>
      </div>
      <button class="delete-btn" onclick="deleteRecipe(${index})">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  `;

  return card;
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

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});

// Mobile Menu Functionality
const menuToggle = document.createElement('div');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('header nav').appendChild(menuToggle);

const navMenu = document.querySelector('header nav ul');
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Handle auth state
function updateAuthLinks() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const loginLinks = document.querySelectorAll('.login-link');
  const signupLinks = document.querySelectorAll('.signup-link');
  const accountLinks = document.querySelectorAll('.account-link');

  loginLinks.forEach(link => {
    link.classList.toggle('hidden', isLoggedIn);
  });

  signupLinks.forEach(link => {
    link.classList.toggle('hidden', isLoggedIn);
  });

  accountLinks.forEach(link => {
    link.classList.toggle('hidden', !isLoggedIn);
  });
}

// Call updateAuthLinks when the page loads
document.addEventListener('DOMContentLoaded', updateAuthLinks);  