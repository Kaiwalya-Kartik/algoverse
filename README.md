# AlgoVerse ◈

**Learn. Visualize. Conquer.** A full-stack educational application featuring algorithm animations, interactive pathfinding, a JavaScript coding arena, accounts, saved challenge submissions, XP and a leaderboard.

## Problem and users
Algorithms are hard to understand when learners see only code. AlgoVerse helps students preparing for technical interviews and DSA exams *see* algorithm execution, compare approaches, and practice with immediate feedback.

## Features / important workflows
1. **Register / log in:** Unique usernames, salted `scrypt` password hashes, cryptographically random session tokens and authenticated profile requests.
2. **Explore algorithms:** Bubble, insertion, selection, merge and quick sort animated as comparison/write trace frames; adjust array size, speed, regenerate input, single-step, and race algorithms by operation counts.
3. **Pathfinding:** Build a grid obstacle map and animate BFS or Dijkstra from start to destination; visualize visited nodes and shortest path.
4. **Solve coding challenges:** Six built-in exercises spanning arrays, stacks, searching, DP and two pointers. Run JavaScript `solve(input)` against tests in a dedicated Web Worker, with a 2.5-second execution timeout. Save editor drafts locally and submit test summaries to track outcomes.
5. **Progress and leaderboard:** Persistent user profiles, first-solve XP, history, solved challenges, profile view and global ranking.

## Architecture
```
Browser (HTML/CSS/vanilla JS)
  |-- public/algorithms.js: algorithm trace & pathfinding engines
  |-- public/runner.js: sandboxed-by-worker code execution + timeout
  |-- public/app.js: SPA screens, auth, UI orchestration
  |-- fetch JSON over HTTP
Node.js server/index.js
  |-- HTTP routes, authentication, authorization, input validation
  |-- server/challenges.js: defined problem/test bank
  |-- server/store.js: serialized JSON database, atomic file replacement
  |-- data/db.json: created at runtime, ignored by Git
```
There are **no npm dependencies**: only built-in Node.js modules on the backend and browser APIs on the frontend.

## Run locally (VS Code)
1. Install **Node.js 20+** (Node 22 recommended).
2. Open the unzipped `algoverse` folder in VS Code.
3. Open **Terminal → New Terminal**, then run:
   ```bash
   npm start
   ```
4. Visit **http://localhost:3000**.
5. Create an account and try the Visual Lab or Code Arena.

### Development / testing
```bash
npm run dev
npm test
```
Change port with `PORT=4000 npm start` on macOS/Linux, or `$env:PORT=4000; npm start` in PowerShell.

## API endpoints
| Method | URL | Access | Action |
|---|---|---|---|
| POST | `/api/register` | Public | Create account |
| POST | `/api/login` | Public | Sign in |
| POST | `/api/logout` | Signed in | Revoke session |
| GET | `/api/me` | Signed in | User statistics/history |
| GET | `/api/challenges` | Public | List challenge metadata |
| GET | `/api/challenges/:id` | Public | Get problem statement |
| GET | `/api/challenges/:id/tests` | Public | Get educational test cases for browser runner |
| POST | `/api/submissions` | Signed in | Record test outcome |
| POST | `/api/visualizations` | Signed in | Log exploration |
| GET | `/api/leaderboard` | Public | XP rankings |
| GET | `/api/health` | Public | Service health check |

## Deployment
Push the directory to GitHub, then use Render **New → Web Service**, connect your repo, select the **Node** runtime, choose `npm install` for build and `npm start` for start (or use the included `render.yaml`). The server reads `PORT` automatically. Verify `/api/health` and test signup on the deployment URL.

**Important persistence note:** The built-in JSON database is reliable on a single local Node process but **free Render filesystem storage is ephemeral**: it can reset after deployment/restarts. A proper production deployment requires a persistent disk (`DATA_FILE` pointing to mounted storage) or migrating to a managed database. Render persistent disks may require a paid plan. Do not claim free Render preserves accounts permanently. This is an educational MVP and not a hardened production identity service.

**Code runner limitation:** Student-written JavaScript runs in a browser Web Worker, with a timeout. The server receives test outcomes from the client, so a malicious user could forge a success request. Thus leaderboard scoring is **not tamper-proof**. Secure competitive grading would need an isolated server-side judge with server-held test cases not exposed to browsers, execution quotas and sandboxing. No API secrets are sent to the worker. Run only code you trust in this learning MVP.

## Error and security considerations
- Duplicate usernames, weak passwords, incorrect credentials, unrecognized challenges, bad request payloads, and unauthorized calls return JSON errors.
- Passwords are salted and hashed; sessions use random bearer tokens with expiration.
- No secrets or user data are committed to Git. DOM-rendered user-provided strings are HTML escaped.
- Code execution is isolated from the application UI by a Web Worker and interrupted after 2.5 seconds, but is **not an adversarial-grade security boundary**.
- Runs on one Node process; concurrent/multi-instance production would require transactional data storage.

## Demo walkthrough (3–5 minutes)
1. Introduce problem and account login (30 sec).
2. Open Visual Lab: randomize, select Quick Sort, play/pause, inspect metrics and run Algorithm Race (60 sec).
3. Open Pathfinding: add obstacles, visualize BFS, clear, compare with Dijkstra (45 sec).
4. Solve a coding challenge with code editor; show tests, XP after first acceptance and saved profile (90 sec).
5. Visit leaderboard and show architecture / GitHub / deployed link (30 sec).

## Submission
The course guidelines require: **GitHub repository, deployed application/build, README, 3–5 minute demo video, and the official submission form by 27 October 2026, 11:59 PM IST.** Ensure all links are accessible in incognito. The submitter must record and upload the video and complete the form.

## Originality and attributions
AlgoVerse application code written as an original educational project. Google Fonts (DM Sans, Space Grotesk) are loaded optionally; system fallbacks are available if offline. No third-party visualization or UI framework is used.

## 🎥 Project Demo Video

Watch the complete AlgoVerse project demonstration:

[Click Here to Watch AlgoVerse Demo](https://drive.google.com/file/d/12rUJCier_zBVwiUNmYU1mS5uTtloSDt5/view?usp=sharing)

The demonstration covers the main features of AlgoVerse,
including algorithm visualizations, coding challenges,
user authentication, progress tracking, and the leaderboard.
