# Signbridge AI Chatbot

Signbridge AI Chatbot is a **Next.js + TypeScript + Tailwind CSS application** designed to help users:

* Understand and support their children (for parents, including autism support)
* Assist children who are deaf through visual and accessible interactions

The chatbot leverages **Google Gemini AI** for generating personalized responses and **MongoDB** for storing user accounts and chat history.

---

## **Features**

* User authentication using **NextAuth.js** (credentials-based login)
* Persistent chat history per user
* AI messages with **typewriter effect** for new responses
* Role-based instructions for personalized responses:

  * `mother_child`
  * `deaf_helper`
  * `autism_parent`

---

## **Tech Stack**

* **Frontend:** React 19, Next.js 16, TypeScript, TailwindCSS
* **Backend:** Node.js, Next.js API Routes, MongoDB (Mongoose)
* **Authentication:** NextAuth.js with JWT strategy
* **AI:** Google Generative AI (Gemini)

---

## **Installation**

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/Signbridge-ai-chat-bot.git
cd Signbridge-ai-chat-bot
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local` file** in the project root and add:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret_key
GEMINI_API_KEY=your_google_generative_ai_key
```

> Replace the values with your actual MongoDB URI, a random secret for NextAuth, and your Gemini API key.

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## **Folder Structure**

```
/app
  /api           → Next.js API routes
  /components    → React components
  /auth          → Authentication pages
  page.tsx       → Home page
/lib             → Database connection (MongoDB)
/models          → Mongoose models (User, Chat)
```

---

## **Usage**

* Sign up or sign in using the credentials page
* Start a new chat — the AI will respond according to your **user type**
* Chat history is stored and displayed automatically
* New AI messages appear with a **typewriter effect**

---

## **License**

This project is open-source and free to use.
