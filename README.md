# 🍽️ SvelteKit Recipes App

This is a **SvelteKit** frontend application that displays a list of recipes and provides detailed recipe pages. Users can filter recipes, navigate paginated results, and view full recipe details.

---

## 📌 Features

- ✅ **Recipe Listing**: Displays recipes in a grid layout with images and descriptions.
- ✅ **Recipe Details Page**: Shows full recipe details including ingredients, tags, and directions.
- ✅ **Filtering**: Allows filtering recipes by title and maximum preparation time.
- ✅ **Pagination**: Supports navigation between pages of recipes.
- ✅ **Dynamic Routing**: Uses SvelteKit's dynamic routing to load individual recipe pages.
- ✅ **Loading & Error Handling**: Provides a smooth user experience by displaying loading indicators and error messages.

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/yourusername/recipes-app.git
cd recipes-app
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add:

```env
VITE_REST_API_URL=https://your-api-url.com/api
```

Replace your-api-url.com/api with the actual backend URL.

You can view the details of our backend in the [larchermat/traditionalrecipes](https://github.com/larchermat/traditionalrecipes) repository.

### 4️⃣ Run the Development Server

```sh
npm run dev
```

The app will be available at http://localhost:5173.

## 📂 Project Structure

```bash
/src
│── /lib
│   │── /api          # API services
│   │── /components   # Reusable Svelte components
│   │── /types        # TypeScript interfaces for API responses
│── /routes
│   │── +page.svelte      # Recipe listing page
│   │── /recipes/[id]     # Dynamic recipe details page
│── /static               # Static assets
│── .env                  # Environment variables
```

# 🌍 API Integration

## 📥 Fetch Recipes

- Endpoint: /recipes/list
- Method: GET
- Query Params:
  - title (optional) → Search for recipes by title.
  - maxTime (optional) → Filter by max preparation time (hh:mm format).
  - page (optional) → Pagination index (0-based).
  - size (optional) → Number of items per page.
- Example Request
  ```ts
  const response = await get('/recipes/list', {
  	title: 'cake',
  	maxTime: '01:00',
  	page: 1,
  	size: 10
  });
  ```
- Example Response
  ```json
  {
  	"content": [{ "id": 1, "title": "Chocolate Cake", "time": "01:00", "imgUrl": "image.jpg" }],
  	"totalPages": 5,
  	"totalElements": 50
  }
  ```

## 📥 Fetch Recipe Details

- Endpoint: /recipes/{id}
- Method: GET
- Example Request
  ```ts
  const recipe = await recipesAPI.fetchRecipeById(1);
  ```
- Example Response
  ```json
  {
  	"id": 1,
  	"title": "Chocolate Cake",
  	"tags": "dessert, chocolate",
  	"ingredients": "<ul><li>Flour</li><li>Sugar</li></ul>",
  	"preparation": "<p>Mix all ingredients and bake.</p>",
  	"imgUrl": "image.jpg",
  	"people": 4,
  	"time": "01:00"
  }
  ```

## 📥 Fetch Shops

- Endpoint: /shops/find
- Method: GET
- Query Parameters:
  - distance (optional, default: 20) → Search radius in kilometers.
  - latitude (optional, default: 46.4983) → Latitude of the user's location.
  - longitude (optional, default: 11.3548) → Longitude of the user's location.
- Example Request
  ```ts
  const response = await fetchShops(10, 46.5, 11.36);
  ```
- Example Response
  ```json
  {
  	"content": [
  		{
  			"id": 1,
  			"name": "South Tyrol Bakery",
  			"distance": 1200,
  			"latitude": 46.5001,
  			"longitude": 11.3599
  		}
  	],
  	"totalPages": 3,
  	"totalElements": 25
  }
  ```
