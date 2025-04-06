# 📌 Evangadi Forum Project

Welcome to the **Evangadi Forum** – a collaborative **Full Stack Web Application** where users can ask questions and get answers in a structured community-driven forum.

📌 **Repository**: [GitHub - Evangadi Forum](https://github.com/amirethio/Evangadi-forum.git)

---

## 📌 About the Project

The **Evangadi Forum** is a Q&A platform where users can:
✅ Post questions 📌  
✅ Answer questions 📝  
✅ Authenticate using secure login/signup 🔐  
✅ View all questions & answers 💡  

---

## 📌 Tech Stack

### Backend

- **Node.js & Express.js** - API development
- **MySQL** - Database
- **JWT & Bcrypt** - Authentication & security


### Frontend

- **React.js** - UI framework
- **Axios** - API calls

---

## 📌 Project Structure & Responsibilities

Each team member is responsible for working **only within their assigned files**.

```
Evangadi-forum/
│── backend/             # Backend (Node.js + Express)
│   ├── controllers/     # API Controllers
│   │   ├── answerController.js    ← [Amir Ali, Hussien Endris]
│   │   ├── questionController.js  ← [Abebaw Abera, Abraham Woldesenbe, Ruth Legesse]
│   │   ├── userController.js      ← [ Amir Ali, Hussien Endris]
│   ├── db/              # Database-related files
│   ├── middleware/      # Authentication & validation middleware
│   ├── routes/          # API routes
│   ├── package.json     # Backend dependencies
│── frontend/            # Frontend (React.js)
│   ├── public/
│   │   ├── favicon.png  # Website favicon
│   ├── src/             
│   │   ├── assets/      # Static assets (images, fonts, etc.)
│   │   ├── components/  # Reusable UI components
│   │   │   ├── About/         ← [Abe Habtemariam]
│   │   │   ├── Auth/          ← [Amira]
│   │   │   ├── Footer/        ← [Belachew Gezahegn]
│   │   │   ├── Header/        ← [Alemsegede Gizachew]
│   │   │   ├── Layout/        ← [Team Use]
│   │   ├── pages/        # Page components/views
│   │   │   ├── AskQuestion/  ←[Mike]
│   │   │   ├── HomePage/    ← [Dave Y]
│   │   │   ├── Landing/     ← [Amir Ali]
│   │   │   ├── QuestionDetail/    ← [Ashenafi Getachew]
│── .gitignore            
```

---

## 📌 Contribution Guide

### 🔀 Branching Strategy

Each team member should create a **separate branch** for each feature/task assigned to them.

#### 🔹 Creating a new branch
```sh
git checkout -b feature/branch-name
```
Example:
```sh
git checkout -b feature/signup
```

#### 🔹 Pushing your branch
```sh
git add .
git commit -m "Implemented signup feature"
git push origin feature/branch-name
```

#### 🔹 Creating a Pull Request (PR)
1. Go to the repository on GitHub.
2. Click on **Pull Requests** → **New Pull Request**.
3. Select your branch and compare it with `main`.
4. Add a description of the changes and request a review.
5. Once approved, merge the branch into `main`.

#### 🔹 Merging to Main Branch
1. Ensure your branch is updated with the latest `main` changes:
```sh
git checkout main
git pull origin main
git checkout feature/branch-name
git merge main
```
2. After testing, create a pull request to merge your feature branch → `main`.
3. Once reviewed and approved, merge the PR.
4. Pull the latest changes from `main` to keep your local branch updated:
```sh
git checkout main
git pull origin main
```

#### 🔹 Keeping Your Branch Updated
If your branch is outdated compared to `main`:
```sh
git checkout main
git pull origin main
git checkout feature-branch-name
git merge main
```
Resolve conflicts if any, then push the changes again.

🚀 **Happy Coding!** 🚀
