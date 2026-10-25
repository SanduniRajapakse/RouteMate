# RouteMate - One-Day Local Trip Planner & Route Guidance Web Application

RouteMate is a full-stack, responsive web application designed for one-day local excursion planning within a 25 km radius. The system combines an interactive **Leaflet / OpenStreetMap** view with real-time category filtering, great-circle **Haversine** distance and travel time calculations, a guest-to-user account claim workflow, view-only cryptographic itinerary sharing, and a secure PIN-authenticated administrator management dashboard.

---

## Tech Stack & Architecture


### Frontend (Client)
* **Framework**: React.js (Vite)
* **Styling**: Tailwind CSS, Custom Utility Animations
* **Mapping Library**: Leaflet & react-leaflet (OpenStreetMap tiles)
* **Icons**: Inline SVG Components & Lucide Icons


### Backend (Server)
* **Runtime**: Node.js
* **Web Framework**: Express.js
* **Database Driver**: mysql2/promise (Connection Pooling & Transaction Support)
* **Security & Utilities**: crypto (8-character hex share codes), cors, dotenv


### Database
* **DBMS**: MySQL 8.0 (routemate_db)
* **Tables**: users, categories, places, place_photos, itineraries, itinerary_items

---

## Prerequisites

1. **Node.js** (v18.x or v20.x or higher)
2. **npm** (v9.x or higher)
3. **MySQL Server** (v8.0+ or MySQL Workbench)

---

## Database Setup Instructions

1. Open **MySQL Workbench** or your preferred MySQL terminal client.
2. Open and execute the provided  file.
3. The script will:
   * Create the database .
   * Create the 6 relational tables with primary keys and foreign key constraints.
   * Seed initial categories and 10 Southern Province tourist attractions with direct Imgur photo links.



---

## Project Folder and Frontend/Backend Folders Setup

1. Open your terminal and create project folder (mldir routemate -> Enter)

2. Navigate to project folder (cd routemate -> Enter)  

3. Create frontend folder (mldir client -> Enter)

4. Navigate back to main project folder (cd .. -> Enter)

5. Create backend folder (mldir server -> Enter)


## Backend Installation & Setup (/server)

1. Open your terminal and navigate to the directory: cd routemate/server

2. Install required Node.js dependencies: 
     * ```routemate/server> npm install
     
3. Configure database credentials in  or :  
     * Create a **`.env`** file inside the `server/` directory with your local MySQL credentials:
         ```env
         PORT=5000
         DB_HOST=localhost
         DB_USER=root
         DB_PASSWORD=your_mysql_password
         DB_NAME=routemate_db
         ```

4. Start the Express server: 
      * ```routemate/server> node server.js 

5. Terminal will display:
      *Expected Terminal Output:*
      ```text
      Database connected successfully to routemate_db!
      Backend server running on port 5000
      ```


## Frontend Installation & Setup (/client)

1. Open a new terminal window and navigate to : cd routemate/client

2. Install required frontend dependencies:
      * ```routemate/client> npm install

3. Install Leaflet mapping packages (if not pre-installed):
      * ```routemate/client> npm install

4. Verify that `client/public/index.html` includes the Leaflet stylesheet in the `<head>` section:
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
   ```

5. Start the Vite development server:  
      * ```routemate/client> npm run dev

6. Terminal will display:
      *Expected Terminal Output:*
   ```text
      VITE v8.3.2  ready in 1384 ms
  ➜  Local:   http://localhost:5173/

---
## After Backend and Frontend Completion

       Access the web app in your browser:
    

---

## Key System Features

1. **Attraction Discovery & Category Filtering**: Real-time text search, category chips, and lightbox photo gallery.
2. **Interactive Leaflet Map View**: OpenStreetMap pinpoints with metadata popups and Haversine distance guidance (~40 km/h avg driving speed).
3. **One-Day Itinerary Builder**: Add/remove/reorder stops with dynamic distance and travel time updates.
4. **Guest Account Claiming & Cryptographic Share Links**: Generates unique 8-character share codes () for view-only itinerary links ().
5. **Admin Management Portal**: Authenticate with PIN  to add/edit/delete places, photos, and categories.

---

## Key Admin Credentials
* **Admin Portal PIN:** `1234`

----


## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /api/categories | Returns all category taxonomies |
| GET | /api/places | Returns attraction listings with photo gallery arrays |
| POST | /api/itineraries | Persists ordered itinerary stops and travel metrics; returns shareCode & shareLink |
| GET | /api/itineraries/shared/:code | Fetches view-only itinerary details by share code |
| DELETE | /api/itineraries/:id | Deletes the saved itinerary |
| POST | /api/admin/places | Protected endpoint to add a new attraction with photo array |
| PUT | /api/admin/places/:id | Protected endpoint to update a attraction |
| DELETE | /api/admin/places/:id | Protected endpoint to delete a destination by ID |
| POST | /api/admin/categories | Protected endpoint to create a category |
| POST | /api/admin/categories/reassign | Protected endpoint to reassign attractions between categories |
| DELETE | /api/admin/categories/:id | Protected endpoint to delete a category |
|POST | /api/auth/register | Register new users |
| POST | /api/auth/login | Authenticates the user login |

---

## Troubleshooting & Common Fixes

* **500 Internal Server Error**: Verify MySQL service status and credentials in .
* **Leaflet Map Styling Issues**: Ensure  is present in .
* **CORS Errors**: Confirm  is enabled in Express.


## Academic Integrity & Acknowledgments
Developed individually by H.M.L.S.N. Rajapakse
