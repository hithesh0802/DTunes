# 🎵 Dtunes – Full Stack Music Streaming App

Dtunes is a full-stack music streaming platform that combines the power of modern web technologies with seamless social interaction. It allows users to stream music, manage playlists, share songs, and explore lyrics—all in one place.

## 🌐 Live Features

- 🎧 Stream music and view real-time lyrics (via Spotify & Genius APIs)
- 🧑‍🤝‍🧑 Connect with friends, view profiles, and share playlists
- 📂 Upload, like, and organize songs into custom playlists
- 🔐 Register/login with secure authentication and session handling
- 💬 Party mode for collaborative queueing and group listening

---

## 🛠️ Tech Stack

### Frontend
- ReactJS (with Tailwind CSS)
- Context API for state management
- Axios for API calls

### Backend
- Node.js, Express.js
- MongoDB with Mongoose ODM
- JWT-based Auth and Middleware
- Integrated Spotify and Genius APIs

---

## 📁 Project Structure

```
Dtunes/
├── backend/
│   ├── config/, controllers/, middleware/, models/, routes/, utils/
│   ├── app.js, .env, package.json
├── frontend/dtunes/
│   ├── public/, src/
│   ├── components/, context/, modals/, pages/, utils/
│   ├── App.js, index.js, tailwind.css, package.json
```

---

## 🚀 Getting Started

1. **Clone the repo**  
   `git clone https://github.com/yourusername/dtunes.git`

2. **Setup backend**  
   ```
   cd backend
   npm install
   npm start
   ```

3. **Setup frontend**  
   ```
   cd frontend/dtunes
   npm install
   npm start
   ```

---
Let me know if you'd like a version with setup screenshots or badges!
