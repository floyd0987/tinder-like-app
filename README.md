# Tinder-Like App - Backend API Specification & Setup

## Project Overview

This is a simple Tinder-like app built with Next.js (frontend) and a REST API backend implemented in NestJS.

You can preview the app deployed on Render.com:
[https://tinder-like-app-frontend.onrender.com/](https://tinder-like-app-frontend.onrender.com/)

Users interact with profiles using `LIKE` and `DISLIKE` buttons (no swipe gesture).
The database is pre-populated with several users, including the current user (ID 1).
Actions (`LIKE` and `DISLIKE`) are saved in the `actions` table.
There is also a `matches` table to record occurred matches for future development (not implemented, as it is out of scope for this assignment).
If user 1 likes another user who has already liked them (e.g., "Ekaterina"), a match is created and shown.
The app handles matches, API errors, and edge cases such as running out of profiles.

---



### Start PostgreSQL with Docker
The backend uses PostgreSQL for data storage. You can run the database locally using Docker.

Start the database using Docker Compose:**

```bash
docker-compose up -d
```


## Environment Setup

###  Environment Variables

Create a `.env` file in `apps/frontend` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```


---




**Configure backend to connect to Postgres:**


   Create a `.env` file in `apps/backend` with:

   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"
   ```


# Turborepo Starter (Backend + Frontend)

This project is organized as a **Turborepo** containing a Next.js frontend and a Node.js/Prisma backend.

---

## Installation

From the repository root, install all dependencies:
```bash
npm install

Then generate the Prisma client for the backend:
cd apps/backend
npx prisma generate
cd ../..
```

### Development
To run both frontend and backend in development mode from root (with hot reload):
```bash
npm run dev
```

### Production Build
Build all apps:
```bash
npm run build
```

### Running in Production

After building, start each app separately:
```bash
# Start backend
cd apps/backend
npm run start

# Start frontend
cd ../frontend
npm run start
```


### Running Tests

Run tests from the frontend app directory:

```bash
cd apps/frontend
npm test
```

---

## API Specification


* Local: `http://localhost:3001/api/v1`
* API documentation (Swagger): [http://localhost:3001/api/swagger](http://localhost:3001/api/swagger)

---

### Endpoints

#### User
```
http://localhost:3001/api/v1/users/
```

#### Get Random User

<pre class="overflow-visible!" data-start="1237" data-end="1262"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>POST /users/random
</span></span></code></div></div></pre>

**Query Parameters**


| Name          | Type     | Required | Description               |
| ------------- | -------- | -------- | ------------------------- |
| currentUserId | number   | yes      | ID of the logged-in user  |
| seenIds       | number[] | yes      | IDs of users already seen |

**Response**

<pre class="overflow-visible!" data-start="1607" data-end="1687"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"id"</span><span>:</span><span> </span><span>2</span><span>,</span><span>
  </span><span>"name"</span><span>:</span><span> </span><span>"Bob"</span><span>,</span><span>
  </span><span>"age"</span><span>:</span><span> </span><span>30</span><span>,</span><span>
  </span><span>"photoUrl"</span><span>:</span><span> </span><span>"bob.jpg"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

**Errors**

* `404 Not Found` - no more users available

#### Send Action (LIKE/DISLIKE)

<pre class="overflow-visible!" data-start="1839" data-end="1865"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>POST /users/action
</span></span></code></div></div></pre>

**Request Body**

</span><span>"userId"</span><span>:</span><span> </span><span>1</span><span>,</span><span>
</span><span>"recipientId"</span><span>:</span><span> </span><span>2</span><span>,</span><span>
</span><span>"action"</span><span>:</span><span> </span><span>"LIKE"</span><span> | </span><span>"DISLIKE"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

**Response**

<pre class="overflow-visible!" data-start="1976" data-end="2015"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"match"</span><span>:</span><span> </span><span>true</span><span> | </span><span>false</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

**Errors**

* `400 Bad Request` - invalid IDs or action

---

### Error Responses

All errors return:

<pre class="overflow-visible!" data-start="2172" data-end="2218"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"error"</span><span>:</span><span> </span><span>"Error description"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

---

## Frontend Usage

* Uses **Material UI** components (`Box`, `Paper`, `Typography`, `Button`) for styling.
* Handles edge cases:
  * No users available → shows message
  * API errors → fallback message
  * Match notification → overlay with "Okay" button

---

## Testing & Coverage

* Unit tests written with `@testing-library/react` and Jest
* Components covered: `UserSwiper`, `UserCard`
* Coverage: 100% statements/functions/lines

## Backend API Endpoints (NestJS)

### `/` (AppController)
- **GET /**  
  Returns a hello message (for health check or basic info).

---


### `/users` (UsersController)
- **POST /**  
  Create a new user. Body: user data.
- **GET /**  
  Get all users.
- **POST /random**  
  Get a random user for swiping. Body: `{ currentUserId, seenUserIds }`
- **GET /:id**  
  Get a user by ID.
- **PATCH /:id**  
  Update a user by ID. Body: updated user data.
- **DELETE /:id**  
  Delete a user by ID.

---

### `/actions` (ActionsController)
- **POST /**  
  Create a new action (like/dislike). Body: `{ userId, recipientId, action }`
- **GET /**  
  Get all actions.
- **GET /:id**  
  Get an action by ID.
- **PATCH /:id**  
  Update an action by ID. Body: updated action data.
- **DELETE /:id**  
  Delete an action by ID.

---

