#  AI Landing Page Builder 

An agent-native, full-stack visual landing page generator built with Next.js, TypeScript, Tailwind CSS, `@google/genai` (Gemini SDK), and Zod schema validation. Users can describe their vision in natural language, and the AI streams back structured JSON blocks rendered instantly into an interactive, sortable canvas.

---

## Tech Stack

* **Framework:** Next.js (App Router) & React
* **Styling & UI:** Tailwind CSS, Lucide Icons, Shadcn-inspired primitives
* **AI Engine:** Google Gemini (`@google/genai`) using Structured Output Mode (`responseSchema`) & discriminated unions
* **Validation:** Zod for runtime schema safety and UI boundary enforcement
* **State Management:** Zustand with built-in history tracking (Undo/Redo) & custom selectors
* **Drag-and-Drop:** `@dnd-kit` (sortable containers and dynamic layout physics)

---

## Core Architecture

```text
landing-page-builder/
├── core/
│   ├── gemini/           # Gemini API client wrapper & system prompts
│   └── schemas/          # Zod runtime validation schemas (discriminated unions)
├── features/
│   └── canvas/           # Canvas store (Zustand), drag-and-drop hooks & components
├── components/
│   └── registry/         # Visual component registry (Hero, Features, Pricing, CTA, Footer)
└── shared/
    └── types/            # Global TypeScript interfaces and block definitions

```

---

## Quick Start & Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Devcarlj/ai-landing-page-builder.git
cd landing-page-builder

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up your environment variables:**
Create a `.env.local` file in the root directory and add your Google Gemini API key:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

```


4. **Run the development server:**
```bash
npm run dev

```


5. Open [http://localhost:3000](http://localhost:3000) in your browser to start building!

---

## Key Engineering Highlights

* **Discriminated Union Schema Validation:** Guarantees zero data mismatch between AI-generated payloads and React visual components.
* **Granular Zustand Selectors:** Optimizes re-render performance across state changes and drag-and-drop operations.
* **Robust Error Guardrails:** Enforces character limits and strict payload rules through Zod parsing before rendering items to the DOM.

---

##  License

Distributed under the MIT License. See **[`LICENSE.`](./LICENSE)** for more information.
