# Tinder-Like App - Backend API Specification & Setup

## 1. Project Overview

This is a simple Tinder-like app built with Next.js (frontend) and a REST API backend.
Users can swipe through profiles and perform actions: `LIKE` or `DISLIKE`.
The app handles matches, API errors, and edge cases such as running out of profiles.

---

## 2. Environment Setup

### 2.1 Environment Variables

Create a `.env.local` file for local development, `.env.staging` for staging, and `.env.production` for production:

<pre class="overflow-visible!" data-start="714" data-end="813"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-env"><span>NEXT_PUBLIC_API_URL=http://localhost:4000   # change to staging/prod URL in other stages
</span></code></div></div></pre>

### 2.2 Installing Dependencies

<pre class="overflow-visible!" data-start="847" data-end="920"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span># Install dependencies</span><span>
npm install
</span><span># Run frontend</span><span>
npm run dev
</span></span></code></div></div></pre>

### 2.3 Running Tests

<pre class="overflow-visible!" data-start="944" data-end="1012"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm run </span><span>test</span><span>
</span><span># Check coverage</span><span>
npm run </span><span>test</span><span> -- --coverage
</span></span></code></div></div></pre>

---

## 3. API Specification

### 3.1 Base URL

<pre class="overflow-visible!" data-start="1061" data-end="1073"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>/api
</span></span></code></div></div></pre>

Full endpoints will be:

* Local: `http://localhost:4000/api/...`
* Staging/Prod: set via `NEXT_PUBLIC_API_URL`

---

### 3.2 Endpoints

#### 3.2.1 Get Random User

<pre class="overflow-visible!" data-start="1237" data-end="1262"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>GET /users/random
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
* `500 Internal Server Error` - unexpected failure

---

#### 3.2.2 Send Action (LIKE/DISLIKE)

<pre class="overflow-visible!" data-start="1839" data-end="1865"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>POST /users/action
</span></span></code></div></div></pre>

**Request Body**

<pre class="overflow-visible!" data-start="1883" data-end="1961"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"userId"</span><span>:</span><span> </span><span>1</span><span>,</span><span>
  </span><span>"targetId"</span><span>:</span><span> </span><span>2</span><span>,</span><span>
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
* `500 Internal Server Error` - unexpected failure

---

### 3.3 Error Responses

All errors return:

<pre class="overflow-visible!" data-start="2172" data-end="2218"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"><span class="" data-state="closed"></span></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"error"</span><span>:</span><span> </span><span>"Error description"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

---

## 4. Frontend Usage

* Uses **Material UI** components (`Box`, `Paper`, `Typography`, `Button`) for styling.
* Handles edge cases:
  * No users available → shows message
  * API errors → fallback message
  * Match notification → overlay with "Okay" button

---

## 5. Testing & Coverage

* Unit tests written with `@testing-library/react` and Jest
* Components covered: `UserSwiper`, `UserCard`
* Coverage: 100% statements/functions/lines
* API utils coverage should also be added to meet full project coverage

---

## 6. Multi-Stage Deployment

* Use `.env` files for each stage
* Frontend fetches API URLs via `NEXT_PUBLIC_API_URL`
* No code changes needed between DEV/STAGING/PROD

---

## 7. How to Extend

* Add new actions (e.g., SUPERLIKE) → extend `/users/action` endpoint
* Add authentication → include token in headers for `/users/random` and `/users/action`
* Integrate real database → `getRandomUser` can query DB instead of mock array
