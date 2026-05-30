
```markdown
# 📝 ByteBlog – Full‑Stack Blog Platform for Developers

![React](https://img.shields.io/badge/React-18-blue)
![Appwrite](https://img.shields.io/badge/Appwrite-1.5-pink)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.0-purple)

**ByteBlog** is a modern, full‑stack blog platform built with **React**, **Appwrite** (BaaS), and **Tailwind CSS**. It allows developers to create, edit, delete, and read blog posts with image uploads, rich text editing, and authentication. Perfect for sharing coding journeys, tutorials, and debugging stories.

> 🔗 **Live Demo** – https://byte-blog-ebon.vercel.app/
> 📂 **Backend** – Powered by Appwrite Cloud (or self‑hosted)

---

## ✨ Features

- 🔐 **Authentication** – Sign up, log in, log out (JWT sessions)
- 📝 **Rich Text Editor** – TinyMCE integration for writing beautiful posts
- 🖼️ **Image Uploads** – Upload featured images, automatically stored in Appwrite Storage
- 🔄 **Post Management** – Create, edit, delete, and view posts
- 🔗 **SEO‑friendly Slugs** – Automatically generated from post titles
- 🎨 **Responsive Design** – Tailwind CSS + Flex/Grid, works on mobile & desktop
- 🛡️ **Protected Routes** – Only authors can edit/delete their own posts
- 📄 **Post Cards** – Uniform landscape thumbnails (portrait images auto‑cropped)
- 🧭 **Dynamic Home Page** – Shows only active posts, with loading and empty states

---

## 🧱 Tech Stack

| Layer        | Technologies                                                                 |
|--------------|------------------------------------------------------------------------------|
| **Frontend** | React 18, React Router DOM 6, Redux Toolkit, React Hook Form, TinyMCE        |
| **Backend**  | Appwrite (Authentication, Database, Storage)                                |
| **Styling**  | Tailwind CSS 4 (no config file, CSS‑first approach)                         |
| **Icons**    | Heroicons (optional)                                                        |
| **Build**    | Vite                                                                        |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm / yarn / pnpm
- An [Appwrite](https://appwrite.io) project (cloud or self‑hosted)

### Installation

1. **Clone the repository**
   ```bash
   git clone: https://github.com/SunnyDevlikar/ByteBlog.git
   cd byteblog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file in the root directory:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Configure Appwrite**  
   - Create a database with a collection `articles` and the following attributes:
     - `title` (string, required)
     - `slug` (string, required, unique)
     - `content` (text, required)
     - `featuredimage` (string, optional)
     - `status` (string, default `active`)
     - `userid` (string, required) – to link posts to users
   - Create a storage bucket and set **read** permission for `any` (or use `getFileDownload` fallback).
   - Enable authentication (email/password) in Appwrite.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open** `http://localhost:5173` – you’re ready to blog!

---

## 📁 Project Structure (simplified)

```
byteblog/
├── src/
│   ├── appWrite/            # Appwrite services (auth, database, storage)
│   ├── components/          # Reusable UI components (Header, Footer, PostCard, Input...)
│   ├── pages/               # Route pages (Home, Login, Signup, Post, AddPost, EditPost, AllPost)
│   ├── store/               # Redux store and authSlice
│   ├── App.jsx              # Main app component with routing & auth check
│   ├── main.jsx             # Entry point, router setup
│   └── index.css            # Tailwind imports + global styles
├── public/                  # Static assets (logo, favicon)
├── .env                     # Environment variables (not committed)
└── package.json
```

---

## 🧪 Environment Variables Explained

| Variable                     | Description                                   |
|------------------------------|-----------------------------------------------|
| `VITE_APPWRITE_URL`          | Appwrite endpoint (e.g., `https://cloud.appwrite.io/v1`) |
| `VITE_APPWRITE_PROJECT_ID`   | Your Appwrite project ID                      |
| `VITE_APPWRITE_DATABASE_ID`  | Database ID where posts live                  |
| `VITE_APPWRITE_COLLECTION_ID`| Collection ID for `articles`                  |
| `VITE_APPWRITE_BUCKET_ID`    | Storage bucket ID for featured images         |

---

## 🐛 Common Issues & Solutions

### 1. Images not showing on free Appwrite plan  
Replace `getFilePreview` with `getFileDownload` in `database.service.js` (image transformations are blocked on free plan).

### 2. Infinite loop / out‑of‑memory  
Make sure your `Input` component uses `<input>` and not `<Input>` (self‑calling). Also, never place API calls directly inside the component body – always use `useEffect`.

### 3. Attribute errors (e.g., `featuredimage` vs `featuredImage`)  
Double‑check that your collection attributes exactly match the field names in your code (case‑sensitive).

### 4. Content too long error  
Change the `content` attribute type from `string` to `text` in the Appwrite console (no length limit).

---
---
## HOME PAGE
<img width="1897" height="872" alt="image" src="https://github.com/user-attachments/assets/fe4f92b4-971a-4d00-914b-6a855e3c0b2d" />

## ADD POST PAGE
<img width="1891" height="854" alt="image" src="https://github.com/user-attachments/assets/35da109d-2583-4537-bd9b-fbcfaa4cb3ac" />


---
## 🐛 Major Challenges & How I Solved Them

| Challenge | Root cause | Fix |
|-----------|------------|-----|
| Infinite loop / out‑of‑memory | `<Input>` component calling itself (`<Input>`) instead of `<input>` | Changed to native HTML element. |
| CORS errors after deployment | Vercel domain not whitelisted in Appwrite | Added the domain to Appwrite Console → Platforms. |
| Images 404 on Vercel | Bucket `read` permission missing for `any` (unauthenticated) | Added permission `any` → `read` in Storage bucket. |
| `featuredImage` vs `featuredimage` mismatch | Database attribute had lowercase `i`, code used camelCase | Standardised on `featuredimage` everywhere. |
| Post not found after creation | Navigated to `/post/${dbPost.$id}` but route expected `slug` | Navigated to `/post/${data.slug}` instead. |
| TinyMCE invalid API key on deployment | TinyCloud domain not approved | Added Vercel domain to TinyCloud approved domains list. |
| Content too long error | `content` attribute type was `string` with limit | Changed to `text` in Appwrite collection. |
---

---
## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/SunnyDevlikar/byteblog/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Appwrite](https://appwrite.io) – Backend as a Service
- [TinyMCE](https://www.tiny.cloud/) – Rich text editor
- [Tailwind CSS](https://tailwindcss.com) – Utility‑first CSS
- [React Icons](https://react-icons.github.io/react-icons/) (optional)

---

## 📬 Contact

Project Link: 

---

⭐ **If you like this project, give it a star!** ⭐
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
