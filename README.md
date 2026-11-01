# ExploreMate V2

ExploreMate is a travel app with three kinds of users:

- **Travellers** plan trips with live weather, real nearby sights and a packing list, then book hotels and taxis.
- **Hotel owners** list hotels and manage guest bookings.
- **Taxi operators** list vehicles and drivers and accept or decline ride requests.

Built with React + Vite + Tailwind on the front end and Node + Express + MongoDB on the back end.

---

## Quick start (Windows, macOS or Linux)

You need **Node.js 20 or newer**: https://nodejs.org

```bash
# 1. In this folder, install everything (the first run takes a few minutes)
npm run setup

# 2. Add the sample data (optional, but recommended)
npm run seed

# 3. Start the API and the website together
npm run dev
```

Open **http://localhost:5173**. Demo logins all use the password `Explore@123`:

| Role | Email |
|---|---|
| Traveller | traveller@exploremate.dev |
| Hotel owner | hotel@exploremate.dev |
| Taxi operator | taxi@exploremate.dev |
| More travellers | sara@, tom@, priya@exploremate.dev |

The sample data has 22 hotels and 17 taxis across 13 Sri Lankan towns, past and upcoming bookings in every state (confirmed, awaiting a driver, declined, cancelled), saved trips and reviews. Every business and person in it is fictional: listings end in "(demo)" and reviews are labelled "Sample review" on the site.

> **No database setup needed.** When `MONGODB_URL` in `server/.env` is empty, the app starts its own local MongoDB and keeps the data in `server/.data`. The first start downloads MongoDB once (about 100 MB).
> To use MongoDB Atlas instead, paste your connection string into `MONGODB_URL`.

## API keys

| Service | Used for | Key needed? |
|---|---|---|
| Open-Meteo | Current weather + 16-day forecast, place search | **No** |
| OpenStreetMap (Leaflet) | Maps | **No** |
| Wikipedia | Nearby sights, place summaries, photos | **No** |
| Google Gemini *or* OpenAI | AI-written itineraries & budget day plans | Optional |

Without an AI key, the planner still works. It builds the itinerary from real nearby places and the forecast. For AI-written plans, add a key to `server/.env` and restart:

- **Gemini (free tier):** create a key at https://aistudio.google.com/apikey, then set `GEMINI_API_KEY=...`
  (default model `gemini-3.1-flash-lite`; change `GEMINI_MODEL` if Google retires it)
- **OpenAI (paid):** set `OPENAI_API_KEY=...` (default model `gpt-4.1-mini`)

The API prints which planner is active when it starts. You can also check `http://localhost:5000/api/v1/health`.

## Production build

```bash
npm run build     # builds the website into client/dist
npm start         # serves the API and the website on http://localhost:5000
```

Set a strong `JWT_SECRET` and a real `MONGODB_URL` before deploying.

## Free hosting on Render

`render.yaml` deploys the website and API together as one free Render web service.

1. Push this folder to a GitHub repository.
2. On https://dashboard.render.com, choose **New → Blueprint** and pick the repository.
3. Optional: when Render asks, paste a MongoDB Atlas connection string (free M0 cluster) into `MONGODB_URL` and a Gemini key into `GEMINI_API_KEY`.

Without `MONGODB_URL` the site uses the built-in database and adds the sample data automatically. That data is wiped whenever the free instance restarts or wakes from sleep, so use Atlas for anything real. Free instances sleep after 15 minutes without visitors, and the first visit after that takes about a minute.

## Project structure

```
client/                React app (Vite + Tailwind)
  src/pages/traveller  Planner, trips, budget planner, Travelpedia, stays, rides, bookings
  src/pages/hotel      Hotel listings + form
  src/pages/taxi       Fleet + form
  src/pages/shared     Owner overview, incoming bookings, profile, feedback
server/                Express API
  src/routes           auth, planner, hotels, taxis, bookings, budget, feedback, stats, uploads
  src/services         weather (Open-Meteo), places (Wikipedia), ai (Gemini/OpenAI), planner, packing, budget
  src/models           User, Hotel, Taxi, Booking, TravelPlan, Feedback
  src/seed.js          Demo data
```

## What changed from V1

**Security & bugs fixed**
- Removed hard-coded OpenAI, OpenWeather and Google Maps keys. The leaked OpenAI key is still in the old repo's git history, so revoke it in your OpenAI account if you haven't already.
- Registration saved a second copy of every user with a **plain-text password**. Each user is now saved once, with a hashed password, and password strength is checked.
- The auth middleware crashed the server on a bad or expired token. It now returns a clear 401.
- Anyone could edit or delete any hotel, taxi or booking. Every change is now checked against the owner and the user's role.
- The hotel booking endpoint never sent a response, so the page hung. Double bookings were also possible. Bookings now check for overlapping dates on the server.
- The budget planner compared the **nightly** price against the **whole** budget and ignored taxis. It now checks nights × price plus taxi days × rate against the budget.
- Fixed broken relative API paths (feedback), wrong role redirects, a `bcrypt` native build that often fails on Windows (replaced with `bcryptjs`), and the stub `/taxi` controller.

**Missing workflows added**
- Travellers can now find and hire taxis. Taxi operators get ride requests to accept or decline.
- Hotel owners can see guest bookings, cancel them and print reports.
- Added logout, role-protected routes, change password, a dashboard for each role, saved-trip rename and notes, a packing checklist and image uploads for listings.
- Travelpedia is now a standalone page: weather, map and nearby sights for any place.
- Feedback has star ratings, and you can choose to show it on the home page.

**New UI**: a full redesign that works on phones, tablets and desktops.
