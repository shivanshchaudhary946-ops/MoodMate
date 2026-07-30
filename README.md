# MoodMate 🌱

A full-stack mental wellness application that helps users track their moods, maintain a personal journal, and visualize their emotional wellbeing over time.

## Features

- **Secure Authentication** — JWT-based login/register with hashed passwords (bcrypt)
- **Mood Tracker** — Log daily moods with optional notes
- **Journal** — Create, read, update, and delete personal journal entries
- **Dashboard** — Visualize mood trends with interactive charts (Recharts)
- **Data Isolation** — Each user's data is private and securely scoped to their account

## Tech Stack

**Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Axios, Recharts, Lucide Icons

**Backend:** [MoodMate Backend](https://github.com/shivanshchaudhary946-ops/moodmate-backend) — Node.js, Express, MongoDB (Mongoose), JWT, bcrypt

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/shivanshchaudhary946-ops/MoodMate.git
cd MoodMate
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

**Note:** This frontend requires the [backend server](https://github.com/shivanshchaudhary946-ops/moodmate-backend) to be running for full functionality.

## Screenshots

*(Add screenshots of your app here once you're happy with the design)*

## What I Learned

Building this project helped me understand:
- Full-stack architecture and how frontend/backend communicate via REST APIs
- Authentication flows using JWT and secure password hashing
- State management with React Context API
- Debugging real-world issues (DNS resolution, CORS configuration, database connectivity)

**🔗 Live Demo:** [https://mood-mate-two.vercel.app](https://mood-mate-two.vercel.app)

