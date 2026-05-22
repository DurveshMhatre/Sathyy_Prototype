# The Saathy — Google Antigravity Build Prompt
### Senior Prompt Engineer Edition | Full Platform Specification

---

## MASTER CONTEXT

You are building **The Saathy** — a Human + AI companionship platform for India. The word "Saathy" means companion in Hindi: someone who listens, remembers, and shows up.

**Core positioning:** Affordable daily companionship for people who do not want to feel alone.

**Hard boundaries — never break these:**
- This is NOT therapy, NOT dating, NOT a crisis helpline, NOT social media, NOT a random stranger chat app.
- Do NOT allow under-18 users anywhere in the platform.
- Do NOT build public feeds, leaderboards, coins, swipe-based matching, or romantic AI features.
- Do NOT allow users or listeners to share phone numbers, WhatsApp, or meet one-on-one offline.
- Do NOT make any therapy, diagnosis, or medical claims anywhere in the product copy.
- ALWAYS keep crisis resources (Safety Net, report button, block button, data deletion) free — never paywalled.

**Target users (MVP):** Indian adults aged 18–45, working professionals and college students, people experiencing loneliness, emotional overload, or the feeling of not being heard — even when surrounded by people.

---

## PHASE 1 — MVP BUILD

Build the following modules in Phase 1. Build them in the order listed. Each module is described in full detail below.

---

### MODULE 1: LANDING PAGE

Build a full-screen landing page for The Saathy.

**Hero section:**
- Headline: `Feel heard when loneliness feels heavy.`
- Subheadline: `The Saathy is a Human + AI companionship platform where you can talk to Saathy AI, connect with trained listeners, join safe circles, and build a daily emotional support routine.`
- Primary CTA button: `Start with ₹1`
- Secondary CTA button: `Talk to Saathy AI`

**Trust section (below hero):** Show 6 trust bullets as clean cards or icons:
1. Private by default.
2. Not therapy. Not dating. Not social media.
3. Talk anonymously if you want.
4. Human listeners available.
5. Serious concerns routed to support resources.
6. Your memory stays in your control.

**Services section:** Show the following 8 services as cards with a short description under each:
- Saathy AI — AI companion available anytime.
- Saathy Listeners — Trained human listeners via chat, audio, or video.
- Saathy Anchor — Your recurring dedicated listener who remembers your story.
- Saathy Daily Pulse — 30-second daily emotional check-in.
- Saathy Journal — Private space to write freely.
- Saathy Circles — Small safe groups of 3–5 people.
- Saathy Memory — Consent-based emotional continuity across sessions.
- Saathy Safety Net — Safety detection, crisis routing, and helpline access.

**Design direction:**
- Warm, Indian, calm, non-clinical. Think soft earth tones: warm beige, muted teal, gentle saffron accent.
- No medical imagery. No sad stock photos. No sterile white clinical design.
- Typography: clean, readable, warm. Hindi/English bilingual-ready layout.
- Mobile-first. Most Indian users will access on Android.

---

### MODULE 2: SIGNUP & ONBOARDING

Build a multi-step onboarding flow. Keep each screen focused on 1–2 questions only. Never overwhelm.

**Step 1 — Account creation:**
- Name or nickname (optional real name).
- Mobile number or email.
- Age (must be 18+, hard block on under-18).
- Language preference (English, Hindi, Hinglish — allow multi-select).
- City.

**Step 2 — Basic profile:**
- Gender (Man / Woman / Non-binary / Prefer not to say).
- Gender comfort preference for listener: Any / Prefer same gender / Women only.
- Primary reason for joining (select one): Feeling lonely / Work stress / Relationship difficulty / Just want to talk / Going through a hard time / Something else.

**Step 3 — Consent screen (critical):**
Show each toggle separately with plain-language explanation. Default all toggles to OFF. User must actively turn them ON.
- Allow Saathy to remember my conversation context.
- Allow Saathy to create session summaries.
- Allow voice-to-text for safety and continuity.
- Allow human listener to see my past summaries.
- Allow crisis/safety review if serious risk is detected.
- Allow reminders and check-in notifications.

Below the toggles, show: `You can change these at any time in your Privacy Settings.`

**Step 4 — Emotional intake:**
- Why are you here today? (Free text or guided choices: "I need to vent" / "I want someone to listen" / "I feel alone" / "I want to understand myself better" / "I'm going through something hard")
- What do you want to start with today? (AI chat / Human listener / Journaling / Daily Pulse)
- Do you want to stay anonymous? (Yes / No — explain both options in plain language)
- Same-listener continuity: Would you like to be matched with the same listener each time? (Yes / No / Not sure yet)

**After onboarding:** Route user to their chosen first activity. Show a warm welcome message: `You showed up. That took courage. Let's start.`

---

### MODULE 3: HOME DASHBOARD

The dashboard is the daily anchor point. It must feel like checking in with a warm, attentive companion — not like opening a productivity app.

**Required elements:**
- Daily greeting based on time of day and user name/nickname.
- Daily Pulse card — shortcut to today's check-in. Show streak if they have one.
- Saathy AI shortcut — one-tap to open AI chat.
- Book a Listener shortcut — with estimated availability indicator.
- Journal shortcut — last entry preview or first-time prompt.
- If user has a Circle: Circle activity indicator.
- Showing Up Path — display days shown up this week. Copy: `You showed up for yourself X days this week.` No coins, no leaderboard.
- Gentle notification logic: If Daily Pulse not completed by 7pm, show a soft prompt.

---

### MODULE 4: SAATHY AI

Build the AI chat interface. This is the core companion layer. It must feel warm, Indian, and emotionally present — not like a generic chatbot.

**Conversation modes (user selects before or during chat):**
- Default (compassionate friend mode)
- Mentor mode
- Elder sibling mode
- Future self mode
- Practice mode — job interview
- Practice mode — difficult conversation with boss

**Must-have behaviors:**
- Lead with listening, not advice.
- Ask one gentle follow-up question at a time.
- Reflect the emotion back before offering any suggestion.
- Offer a "Tiny Action" at the end of each session: one small, practical step.
- If the user consented to memory: reference past emotional context naturally. Example: `Last time you mentioned work felt heavy. How has this week been?`
- If the user has NOT consented to memory: do not reference previous sessions.
- At end of session: ask `Would you like to save a summary of this conversation to your Saathy Memory?` Only save if user says yes.

**Safety detection — mandatory:**
Monitor for the following patterns in user messages and trigger the appropriate response:
- Self-harm language → Immediately show: India helplines (KIRAN: 1800-599-0019, Tele-MANAS: 14416), safety message, and offer to connect to Safety Moderator.
- Suicide intent → Emergency escalation message + helplines + option to alert safety team.
- Abuse or violence → Safety message, suggestion to contact trusted person, emergency number 112.
- Panic or severe distress → Grounding prompt (breathing, surroundings), offer listener handoff.
- Harassment or threats → Report and block options surfaced immediately.

**Legal copy shown at top of AI chat:** `Saathy AI is a compassionate companion, not a therapist, doctor, or crisis service. If you are in immediate danger, please contact emergency services (112).`

**Voice mode:** Allow user to switch to voice input. Only transcribe with consent. Show a visible "Voice active" indicator. Never record or store audio without explicit opt-in.

**Memory panel:** Accessible from the chat interface. Show: what Saathy remembers, option to edit each item, option to delete any item, option to pause memory entirely.

---

### MODULE 5: SAATHY DAILY PULSE

Build as a standalone screen accessible from the home dashboard. Should complete in under 30 seconds.

**Daily check-in flow (7 steps):**
1. How are you feeling today? (Emoji scale or 5-point visual scale: Very low → Very good)
2. How lonely do you feel today? (1–5 scale)
3. Energy level? (Low / Medium / High)
4. One guided prompt — rotate daily. Example prompts:
   - `What is one thing you wish someone understood about you today?`
   - `What are you carrying right now that feels too heavy to hold alone?`
   - `What would make tomorrow feel even slightly better?`
5. Optional voice note or text response to the prompt.
6. AI reflection: Short empathetic response to today's answers.
7. Tiny Action suggestion: One very small action for today.

**After completion:** Show: `Check-in saved. You showed up today.`

**Pattern detection:** If loneliness score is 4–5 for 3 consecutive days, surface: `Your loneliness score has been high for 3 days. Would you like to talk to a Saathy Listener or do a 5-minute grounding check-in?`

**Notification copy examples (rotate based on user state):**
- General: `Your Saathy check-in is open. 30 seconds only.`
- Returning user: `Yesterday you said work felt heavy. Want to check in?`
- Low-energy user: `No long message needed. Just choose how you feel.`

---

### MODULE 6: SAATHY JOURNAL

Private journaling space. This is NOT public. No one reads this unless the user explicitly shares it.

**Features:**
- Write journal entries with title (optional) and body.
- Mood tag selector: choose 1–3 mood tags per entry.
- Voice journal: record and auto-transcribe (with consent). Show active consent banner.
- AI reflection (optional): After saving, user can tap `Ask Saathy to reflect on this`. AI responds with a gentle pattern observation — never judgment.
  - Example: `You've mentioned feeling ignored at work three times this week. Would you like to explore that with your Saathy Anchor?`
- Weekly emotional summary (opt-in): AI generates a short summary of the week's emotional themes. User must approve before it is saved to Saathy Memory.
- Delete any entry anytime.
- Export entries (Phase 2 — mark as coming soon but do not block).

**Privacy notice on journal screen:** `Only you can see this. Saathy AI may offer reflections if you ask. Nothing is stored in your memory without your permission.`

---

### MODULE 7: BOOK A LISTENER

This is the human listener booking flow. Listeners provide non-clinical emotional support — they are not therapists.

**Step 1 — Choose format:**
- Saathy Chat (text-based, slower, lower pressure)
- Saathy Call – Audio
- Saathy Call – Video

**Step 2 — Choose listener preference:**
- Any available listener
- Same gender as me
- Women only
- My Saathy Anchor (if assigned)

**Step 3 — Show available listeners:**
- Display name, language(s), availability, short bio (3 sentences max).
- No profile browsing or catalog-scrolling. This is not a marketplace.
- Show only listeners who are currently available or available within 30 minutes.

**Step 4 — Session intent (1 question):**
- What brings you here today? (Brief free text — used to help listener prepare, only shared with listener)

**Step 5 — Confirm + pay (if applicable):**
- Show session duration and price clearly.
- Allow Rs. 1 starter session for first-time users.

**In-call/in-chat rules (enforce technically):**
- No phone number sharing (detect and block attempts).
- No WhatsApp shift (detect and block).
- No recording without explicit, visible, in-session consent toggle.
- Call summary: optional, user must actively request it, user must approve before saving.

---

### MODULE 8: SAATHY MEMORY

Consent-based emotional memory layer. This is a core product differentiator.

**What gets stored (summaries only, never raw transcripts by default):**
- Current concern: e.g., `User is feeling isolated after moving to Pune.`
- Emotional pattern: e.g., `Loneliness increases at night.`
- Support preference: e.g., `Prefers gentle listening, not advice.`
- Boundary: e.g., `Does not want family discussion unless they bring it up.`
- Follow-up: e.g., `Ask about job interview stress in next session.`

**User Memory Control Panel:**
- View all saved memory items.
- Edit any item.
- Delete any item individually.
- Delete all memory.
- Pause memory entirely (Saathy stops saving anything until re-enabled).
- See who has accessed their memory (listener/AI/system — audit log visible to user).

**Technical rule:** Never store raw emotional dumps. Always store summaries. Summaries are user-approved before saving (unless user previously consented to auto-save in onboarding, and even then, always show them before final commit).

---

### MODULE 9: SAATHY SAFETY NET

Safety is not a feature. It is infrastructure. Build this as a non-negotiable layer that underlies every other module.

**Safety page (always accessible from home dashboard, zero clicks away):**
- Headline: `You are not alone. Help is here.`
- India emergency resources:
  - Emergency: 112
  - Tele-MANAS Mental Health: 14416 / 1800-891-4416
  - KIRAN Mental Health Helpline: 1800-599-0019
- Report a Saathy Listener or user: Always free, always accessible.
- Block a user: Always free, always accessible.
- Delete my data: Link to privacy dashboard.
- Legal copy: `Saathy is not an emergency or medical service. If you are in immediate danger, contact emergency services or a trusted person near you.`

**Safety detection layer (runs silently across AI chat, Journal AI reflections, and Circles):**
Monitor for:
- Self-harm or suicide language → Show helplines + route to safety moderator queue.
- Abuse or violence → Show safety message + trusted person prompt + 112.
- Panic or severe distress → Grounding prompt + listener handoff option.
- Harassment → Immediate report + block surface.
- Financial requests (listener asking user for money) → Flag and escalate.
- Senior manipulation patterns → Safety review + freeze contact.

**Moderation rules:**
- Every safety flag goes to a Moderator Dashboard review queue.
- Flag resolution must be time-bound (SLA: under 4 hours for crisis, under 24 hours for general).
- User is notified when their report is reviewed (outcome may be anonymized).

---

### MODULE 10: CONSENT DASHBOARD (Privacy Center)

A dedicated screen where users manage all their privacy, data, and consent preferences.

**Sections:**
1. **My Memory** — View, edit, delete Saathy Memory items. Pause memory.
2. **My Consents** — Toggle each consent on/off (same 6 toggles from onboarding).
3. **My Data** — Request full data export. Request account and data deletion.
4. **Session Records** — View list of past sessions (date, type, listener name if applicable). No content shown unless user saved a summary.
5. **Grievance** — Submit a complaint. Track status. This is required for IT Act compliance.

**Design note:** This screen must be easy to find. Link it from: Home Dashboard, Profile Menu, and Safety Page.

---

### MODULE 11: LISTENER DASHBOARD (Internal)

This is an internal tool for trained Saathy Listeners only. Authentication-gated. Not visible to end users.

**What a Listener sees:**
- Incoming session queue: user alias (never real name unless user opted in), session format (chat/audio/video), session intent (brief note user submitted).
- If user has consented to memory sharing: show approved memory summary (the 5 memory types only — no raw transcripts).
- During session: session timer, emergency escalation button, option to flag concern.
- After session: option to write a short session note (3–5 sentences max). This is submitted to user for approval before saving. If user does not approve in 24 hours, it is not saved.

**Listener rules enforced technically:**
- No access to user's real phone number or email.
- No external communication channels.
- All communication stays in-platform.
- Escalation button routes directly to Safety Moderator.

---

### MODULE 12: MODERATOR DASHBOARD (Internal)

For the Saathy Safety and Moderation team only.

**What Moderator sees:**
- Safety flag queue: AI-flagged messages, user-submitted reports, listener escalations. Priority-sorted by severity.
- Flag detail: flagged message content, user account age, session context, listener note if available.
- Actions: Resolve, Escalate, Suspend User, Suspend Listener, Send Safety Message to User, Route to Helpline.
- Audit log: every action taken on every flag, with timestamp and moderator ID.
- Grievance queue: user complaints submitted via Privacy Center.

---

### MODULE 13: PAYMENTS

Build a simple, clean payments flow. India-first: support UPI, cards, and net banking.

**Plans to support at launch:**
| Plan | Price | What User Gets |
|---|---|---|
| Starter | ₹1 | AI check-in, basic journal, limited Daily Pulse. First-time only. |
| Basic | ₹199/month | AI + journal + daily prompts. |
| Listener Pack | ₹499 | 60 minutes of human listener time. |
| Weekly Saathy Plan | ₹299/week | Fixed weekly listener support. |
| Premium Plan | ₹999/month | AI + listener + deeper memory summaries. |

**Hard rule:** Never put the following behind a paywall: crisis resources, report button, block button, data deletion, privacy controls, safety escalation, or emergency guidance. These are always free.

---

## PHASE 2 — SCOPE (Do Not Build Now, Design for Later)

These features should be architecturally planned but not built in Phase 1.

- **Saathy Circles:** Small fixed groups of 3–5 people, matched by age, life stage, gender comfort, language, and concern type. Groups are fixed for 30 days. No browsing, no swiping, guided daily prompts. Launch manually as a pilot.
- **Saathy Anchor matching:** Assign recurring listener to returning users who request continuity.
- **Saathy Experts:** Verified professionals (counsellors, breakup coaches, grief support, career stress). Separate booking flow and higher price point.
- **Multi-language support:** Hindi, Hinglish, Tamil, Marathi, Bengali, Kannada.
- **Women-only circles and women-only listener filter:** Priority feature for safety.
- **Senior pilot:** Morning check-in circles, family-assisted onboarding, larger text, simplified UX.
- **Better emotional reports:** Weekly and monthly pattern summaries with user-controlled depth.

---

## PHASE 3 — FUTURE SCOPE (Do Not Design Yet)

- Saathy Offline Circles (group activities in public venues — chai circles, walk & talk, women-only cafe circles).
- Family-assisted senior plans.
- B2B: college programs, workplace programs, housing society programs.
- AI avatar/video companion.

---

## TECHNICAL ARCHITECTURE NOTES

### Backend modules required (build all for MVP):
| Module | Purpose |
|---|---|
| User Profile Service | Store basic user data, gender, language, city, reason for joining. |
| Consent Ledger | Immutable log of all consent events with timestamps. |
| Emotional Intake Store | Stores onboarding intake answers. |
| Saathy Memory Service | Stores user-approved memory summaries. Consent-gated. |
| Journal Storage | Encrypted private journal entries. User-only access. |
| Call System | In-app WebRTC audio/video. No phone number exposure. |
| Chat System | In-app real-time text messaging between user and listener. |
| Voice-to-Text Engine | Runs only with active user consent. Consent is session-specific. |
| AI Summary Engine | Generates session summaries. Always user-approved before saving. |
| Safety Detection Engine | Classifies messages for self-harm, abuse, crisis signals. Real-time. |
| Moderation Engine | Flags unsafe content in all text inputs (chat, journal, AI, circles). |
| Listener Dashboard Service | Serves listener UI. No access to raw user data. |
| Moderator Dashboard Service | Serves safety team UI. Full audit trail. |
| Matching Engine | Phase 2 — circle and anchor matching logic. |
| Subscription Engine | Payment plans, trial logic, access control by plan. |
| Data Deletion Service | Hard delete on user request. Must comply with IT Act and DPDP Act 2023. |
| Audit Log Service | Immutable record of who accessed what user data and when. |
| Grievance Service | User complaint submission, tracking, and resolution workflow. |

### Security requirements:
- All data encrypted in transit (TLS 1.3) and at rest (AES-256).
- No raw emotional content sent to third-party AI APIs without explicit opt-in and data processing agreement.
- Role-based access control: Users, Listeners, Anchors, Experts, Safety Moderators, Admins.
- Voice/audio: Never stored by default. Transcription only with consent. Transcripts deleted after session unless user saves summary.
- DPDP Act 2023 (India) compliance: Data minimization, purpose limitation, consent, grievance mechanism, data deletion on request.

---

## DESIGN SYSTEM BRIEF

**Brand feel:** Warm. Indian. Safe. Human. Non-clinical. Affordable. Structured without being cold.

**What it should NOT feel like:** Dating app. Hospital. Western therapy brand. Chaotic chat app. Corporate wellness.

**Color palette direction:**
- Primary: Warm saffron or muted terracotta (Indian warmth signal).
- Secondary: Muted teal or soft sage (calm, grounded).
- Background: Warm off-white or warm beige (never clinical white).
- Accent: Deep charcoal for text. Never black-on-white clinical contrast.

**Typography:** Clean, modern, legible on small Android screens. Support Devanagari/Hindi script in Phase 2.

**Language tone (all copy across the platform):**
- Plain Hindi-influenced English. No jargon. No clinical terms.
- Warm and direct: "How are you feeling today?" not "Please complete your daily emotional assessment."
- Never shame. Never rush. Never push.
- Example copy: "You do not have to explain everything. Just tell Saathy how today felt."

**Screens to build (20 total for MVP):**
1. Landing Page
2. Signup – Account
3. Signup – Profile
4. Consent Screen
5. Emotional Intake
6. Home Dashboard
7. Saathy AI Chat
8. AI Voice Mode
9. Saathy Daily Pulse
10. Saathy Journal
11. Book a Listener
12. Listener Session – Chat
13. Listener Session – Call
14. Saathy Memory Control Panel
15. Consent & Privacy Dashboard
16. Safety Page
17. Payments & Plans
18. Listener Dashboard (internal)
19. Moderator Dashboard (internal)
20. Profile & Settings

---

## FINAL GUIDING PRINCIPLE

> Continuity is the product.

The user must feel:
- Saathy remembers me.
- I do not need to explain everything again.
- Someone or something checks on me daily.
- I feel safer here than on random platforms.
- This is affordable enough to use regularly.

If the product only becomes AI chat, users will compare it to ChatGPT.
If the product only becomes listener calls, it becomes a call marketplace.
If the product only becomes circles, it becomes a moderation problem.

**The winning product is the combination: Saathy AI + Human Listener + Memory + Daily Pulse + Safety + Continuity.**

Build all of them. Make them work together. That is The Saathy.

---

*Prompt prepared by Senior Prompt Engineer. Version 1.0 — Phase 1 MVP Scope.*
*Platform: Google Antigravity (antigravity.google)*
