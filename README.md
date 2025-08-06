# Mern-URLShortner
A full-stack URL shortener app that transforms long URLs into short, shareable links. Built with React for the frontend and Node.js/Express for the backend, it stores URLs and visit history in a database. Users can create, manage, copy short URLs, and view detailed click analytics—all with a clean, interactive interface.

# URL Shortener App

A full-stack URL shortener application that converts long URLs into short, shareable links.  
Built with React (frontend) and Node.js/Express (backend), it stores URLs and tracks visit history in a MongoDB database.  
Users can create, manage, copy short URLs, and view detailed click analytics in a clean and interactive interface.

---

## Features

- Generate short URLs from long URLs instantly
- View list of all shortened URLs
- Track visit count and visit timestamps for each URL
- Copy short URLs to clipboard with a click
- View detailed analytics including total clicks and recent visit history
- Responsive and easy-to-use UI built with React

---

## Technologies Used

- Frontend: React, CSS
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)
- Other: nanoid (for unique shortId generation), CORS, dotenv for environment variables

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- MongoDB instance (local or cloud)
- npm or yarn

### Setup

1. **Clone the repository**

git clone https://github.com/yourusername/url-shortener.git
cd url-shortener


2. **Backend setup**

cd backend
npm install


- Create a `.env` file in `backend` folder:
  ```
  PORT=4005
  MONGO_URL=your_mongodb_connection_string
  ```
  
- Start the backend server:
  ```
  npm start
  ```

3. **Frontend setup**

cd ../frontend
npm install


- Update `API_BASE` in your React code (`src` folder) to point to your backend URL, e.g.:

  ```
  const API_BASE = 'http://localhost:4005/api';
  ```

- Start the React development server:

  ```
  npm start
  ```

4. **Open your browser and visit** `http://localhost:3000` (or the port React runs on).

---

## Usage

- Enter a long URL in the input box and click "Shorten URL"
- Copy the generated short URL or visit it directly
- View all your shortened URLs, along with their click stats and creation date
- Click on analytics icons to see detailed visit history and total clicks

---

## Deployment

You can deploy this application for free using platforms like:

- Backend: [Render](https://render.com), [Railway](https://railway.app), [Glitch](https://glitch.com)
- Frontend: [Netlify](https://netlify.com), [Vercel](https://vercel.com), [GitHub Pages](https://pages.github.com)

Make sure to add your environment variables securely on the hosting platform and update the frontend `API_BASE` accordingly.

---

## Important Notes

- Sensitive data like MongoDB URLs and secret keys must be stored in `.env` files and never committed to GitHub.
- Use `.gitignore` to exclude `.env` from version control.
- Backend and frontend communicate via RESTful APIs.
- CORS middleware is enabled for proper cross-origin requests.

---

## License

This project is open source and free to use.

---

## Contact

For any questions or issues, please raise an issue on the GitHub repository or contact [your-email@example.com].

