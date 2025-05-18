# Arnifi Blog

This is a full-stack blogging application consisting of a **React** frontend and a **Node.js/Express** backend. The app allows users to create, edit, delete, and view blogs with features like filtering by category and author.

---

## Frontend

### URL  
[https://arnifiblog.netlify.app/](https://arnifiblog.netlify.app/)

### Tech Stack  
- React.js  
- React Router v6  
- Bootstrap 5  
- Axios  
- React Toastify  

### Features  
- User authentication (login/signup) with JWT stored in `localStorage`  
- View all blogs with filtering by category and author  
- Create, edit, and delete blogs (protected routes)  
- Responsive UI with Bootstrap  
- Toast notifications for user feedback  
- Real-time filtering and updates  

### Setup & Run Locally

1. Clone the frontend repository:

   ```bash
   git clone <frontend-repo-url>
   cd frontend

2. Install dependencies:

bash
Copy
Edit
npm install

3. Create a .env file in the root folder and add your backend API URL:

REACT_APP_API_URL=https://arnifi-blog-backend-3s0g.onrender.com/api
Start the development server:

npm start
Open http://localhost:3000 to view it in the browser.
