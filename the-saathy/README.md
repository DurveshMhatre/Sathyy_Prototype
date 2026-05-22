# The Saathy 💛

> **Empathetic Human + AI Companionship for India**
> 
> *Feel heard when loneliness feels heavy. The Saathy is a warm, private, and secure platform designed to address loneliness and emotional distress through empethetic AI, trained human listeners, and structured emotional check-ins.*

---

## 🌟 GitHub Repository Metadata

* **Repository About (150-char Description):**  
  `A warm, safe, and DPDP-compliant Human + AI companionship platform for India. Empathetic AI, human listeners, private journaling, and crisis routing.`
* **Topics/Keywords:**  
  `mental-wellness`, `companionship`, `empathetic-ai`, `nextjs`, `supabase`, `gemini-api`, `webrtc`, `india`, `privacy-by-design`, `dpdp-act`

---

## 🚀 Key Modules & Features

### 1. Empathetic AI Companion (`/chat`)
* **Saathy AI**: Empathetic conversational companion powered by Google Gemini API.
* **6 Conversational Modes**: Switch context based on emotional needs (*Empathetic, Venting, Creative, Problem-Solving, Grounding, and Silent Support*).
* **Voice Mode**: Fully functional voice interface toggle.
* **Privacy Controls**: Edit, pause, delete, or audit what Saathy AI remembers about you.

### 2. Trained Human Listeners (`/book-listener` & `/session`)
* **5-Step Booking Flow**: Match with a listener by format (chat, audio, video), preference, bio, language, and intent.
* **Secure Chat Room (`/session/chat`)**: Structured interface with built-in PII/contact sharing detection to prevent off-platform interactions.
* **Call Interface (`/session/call`)**: WebRTC-ready UI for voice/video calls with built-in mute, video, and emergency escalation controls.

### 3. Daily Pulse Check-in (`/pulse`)
* **7-Step Interactive Flow**: Express mood, scale loneliness, energy state, answer a daily guided prompt, and receive instant AI-driven reflections.
* **Streak & Showing Up Path**: Track your commitment to self-care using visual, warm streak metrics.
* **Tiny Action Generator**: Simple, actionable physical tasks to complete daily (e.g., breathing, stepping outside).

### 4. Private Journal Canvas (`/journal`)
* **Minimalist Canvas**: Distraction-free writing environment.
* **Smart Reflections**: Request private AI reflections on entries.
* **Mood Tags**: Label entries to discover historical emotional trends.

### 5. Safety Net & Crisis Management (`/safety`)
* **Keyword Detection**: Client-side scanner detecting signs of crisis, abuse, self-harm, or panic.
* **Immediate Intervention**: Triggers an alert modal with one-tap access to Indian helplines (KIRAN, Tele-MANAS, 112) and active grounding techniques.

### 6. Administration & Ops Dashboards
* **Listener Desk (`/listener-dashboard`)**: Session management, user intent overview, and memory continuity notes.
* **Moderator Control Room (`/moderator-dashboard`)**: Safety flag management, escalation logs, and user grievance desk.

---

## 🔒 Security, Compliance & DPDP Alignment (`/privacy`)

Designed in alignment with the **Indian Digital Personal Data Protection (DPDP) Act, 2023** and **IT Act, 2000**:
* **Consent-by-Default**: Every data-sharing consent toggle is strictly `OFF` by default.
* **Granular Consents**: 6 discrete consent types (AI parsing, listener visibility, research usage, etc.) that can be revoked at any time.
* **Data Portability & Erasure**: Single-click absolute account and data deletion from the Privacy Dashboard.
* **Age Verification**: Automatic age-gate blocking signups for minors (under-18) and routing to Childline India (1098).

---

## 🛠️ Technical Stack

* **Frontend**: Next.js 16.2.6 (App Router, Turbopack)
* **Styling**: Vanilla CSS (Harmonious saffron, teal, terracotta palette;Outfit & Inter typography)
* **Database & Auth**: Supabase (`@supabase/supabase-js`)
* **AI Engine**: Gemini Pro API (via `@google/generative-ai`)
* **Communication Protocol**: WebRTC-ready (signaling-ready architecture)

---

## 📂 Project Structure

```bash
the-saathy/
├── .env.example             # Setup environment variables template
├── .env.local               # Private local environment variables (Git-ignored)
├── src/
│   ├── app/
│   │   ├── globals.css              # 2,200+ lines CSS Design System (no Tailwind)
│   │   ├── layout.js                # Global layout configuration
│   │   ├── page.js                  # Landing & Trust page
│   │   ├── signup/page.js           # Multi-step Onboarding & Age Gate
│   │   ├── dashboard/page.js        # Main User Hub & Show Up Path
│   │   ├── chat/page.js             # Companion AI Chat & Memory Panel
│   │   ├── pulse/page.js            # 7-Step Daily Pulse Check-in
│   │   ├── journal/page.js          # Journal Canvas & Reflections
│   │   ├── book-listener/page.js    # Listener matching system
│   │   ├── session/chat/page.js     # Secure Listener Chat Session
│   │   ├── session/call/page.js     # WebRTC Voice/Video call UI
│   │   ├── memory/page.js           # User Memory Control Panel
│   │   ├── safety/page.js           # Safety Net Page
│   │   ├── privacy/page.js          # Privacy Center (DPDP Dashboard)
│   │   ├── payments/page.js         # Razorpay-ready Plan Cards
│   │   ├── profile/page.js          # Profile Settings
│   │   ├── listener-dashboard/page.js # Dashboard for human listeners
│   │   └── moderator-dashboard/page.js # Safety escalation moderator board
│   └── lib/
│       ├── safety.js                # Risk detection engine & Helplines
│       ├── aiResponses.js           # Gemini API engine with fallback handlers
│       ├── supabaseClient.js        # Supabase client initializer
│       ├── storage.js               # Reactive localStorage state sync
│       └── mockData.js              # Localized configuration & greetings
```

---

## ⚙️ Quick Start

### Prerequisites
* Node.js v18+
* Supabase account & project setup
* Google Gemini API Key (from Google AI Studio)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/the-saathy.git
   cd the-saathy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and add your keys:
   ```bash
   cp .env.example .env.local
   ```
   Modify the `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

5. Build for production:
   ```bash
   npm run build
   ```

---

## ⚖️ Legal Disclaimer

*The Saathy is a companionship platform. It does not offer clinical therapy, medical advice, or psychiatric treatment. If you are in immediate danger or experiencing severe emotional distress, please contact emergency services (112) or call a free crisis helpline listed on the Safety page.*
