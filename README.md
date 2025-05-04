# WTWR (What to Wear) - Front-End

## Overview

**WTWR** is a responsive weather-based clothing suggestion app. The front-end is built with **React** and allows users to sign up, log in, view weather data, and add clothing items to share with others. Authenticated users can like items, view their own items in their profile, and manage their wardrobe visually.

---

## Features

- ✅ **Responsive React UI** for both mobile and desktop.
- 🌤 **Weather API integration** to fetch and display current temperature and weather type.
- 👕 **Clothing catalog** where items are filtered based on current weather.
- 👤 **User authentication** with token-based login and registration.
- 🧾 **Profile page** showing only the current user's clothing items.
- 💬 **Modals** for adding clothing, editing profile, and viewing item details.
- ❤️ **Like feature** to interact with shared clothing items.
- 🔐 **Protected routes** using React Router.

---

## Technologies Used

- **React** (with Hooks and Context API)
- **React Router** for routing and page navigation
- **Fetch API** for communicating with the back-end server
- **React Context** for managing:
  - Temperature unit (F / C)
  - Current logged-in user
  - Device responsiveness (mobile vs desktop)
- **Custom Hooks** (`useFormAndValidation`) for handling form state and validation
- **CSS** with BEM methodology for styling
- **JWT** for handling authentication

---

## Link for the backend of a project
https://github.com/Pavkv/se_project_express
