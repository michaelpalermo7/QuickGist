# QuickGist

QuickGist is a web application that generates concise summaries of YouTube videos using OpenAI's API.  
It automatically fetches video transcripts and produces structured summaries in seconds.

## 🚀 Live Demo

- **Website:** [https://quick-gist-ten.vercel.app](https://quick-gist-ten.vercel.app)

---

## 🛠️ Technologies Used

- **Frontend:** React.js, TypeScript, TailwindCSS, Vite, MUI
- **Backend:** Node.js, Express, Python 3, YouTube Transcript API
- **AI:** OpenAI API for summarization
- **Proxies:** Webshare Residential Rotating Proxies
- **Deployment:** Vercel (frontend), Render (backend)
- **Other Tools:** Docker, CORS

---

## 📂 Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Setup](#setup)
4. [Usage](#usage)
5. [Deployment](#deployment)
6. [Known Issues](#known-issues)
7. [Contact](#contact)

---

## ✨ Features

- Fetches YouTube video transcripts automatically
- Summarizes content using OpenAI's GPT models
- Uses rotating proxies to avoid IP blocking
- Fast frontend with React + TailwindCSS
- Live deployment on Vercel + Render

---

## 📦 Installation

1. Clone the repository:

git clone https://github.com/yourusername/QuickGist.git
cd QuickGist

2. Install dependencies for both client and server:

npm install

## Setup

1. Backend Environment Variables

Create server/.env:

    OPENAI_API_KEY=your_openai_key
    YT_PROXY_USERNAME=your_webshare_username
    YT_PROXY_PASSWORD=your_webshare_password
    YT_PROXY_LOCATIONS=us,de # optional 2. Frontend Environment Variables

Create client/.env:

    VITE_API_BASE_URL=https://quickgist-mda4.onrender.com

## Usage

Development Mode

1. Start the backend:

cd server
npm run dev

2. Start the frontend:

cd client
npm run dev

3. Open the app in your browser at http://localhost:5173.

Production Mode

1. Pushing to main will automatically redeploy on Vercel + Render.

## Deployment

Frontend: Vercel handles hosting + build pipeline.

Backend: Render runs Express + Python services.

Proxies: Webshare rotating residential proxies to prevent YouTube IP blocking.

## Known Issues

❌ Videos with disabled subtitles cannot be summarized.

🕒 If the proxy pool is exhausted, transcript fetching may fail temporarily.

---
