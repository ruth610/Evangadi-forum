### **📌 Evangadi Forum Project**

Welcome to the **Evangadi Forum** – a collaborative **Full Stack Web Application** where users can ask questions and get answers in a structured community-driven forum.

📌 **Repository**: [GitHub - Evangadi Forum](https://github.com/amirethio/Evangadi-forum.git)

---


## **📌 About the Project**

The **Evangadi Forum** is a Q&A platform where users can:  
✅ Post questions 📌  
✅ Answer questions 📝  
✅ Authenticate using secure login/signup 🔐  
✅ View all questions & answers 💡

---

## **📌 Tech Stack**

### **Backend**

- **Node.js & Express.js** - API development
- **MySQL** - Database
- **JWT & Bcrypt** - Authentication & security
- **Sequelize** - ORM for MySQL

### **Frontend**

- **React.js** - UI framework
- **Axios** - API calls

---

## **📌 Project Structure & Responsibilities**

Each team member is responsible for working **only within their assigned files**.

```
Evangadi-forum/
│── backend/             # Backend (Node.js + Express)
│   ├── controllers/     # API Controllers
│   │   ├── answerController.js    ← [Amir Ali, Hussien Endris]
│   │   ├── questionController.js  ← [Abebaw Abera, Abraham Woldesenbe, Ruth Legesse]
│   │   ├── userController.js      ← [Amira, Amir Ali]
│   ├── db/              # Database-related files
│   ├── middleware/      # Authentication & validation middleware
│   ├── routes/          # API routes
│   ├── package.json     # Backend dependencies
│── frontend/            # Frontend (React.js)
│   ├── public/
│   │   ├── favicon.png  # Website favicon
│   ├── src/             # Main frontend source
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
│── .gitignore            # Ignore unnecessary files

```

---

📌 **Important Note:**

Each team member should ONLY work on their assigned files to avoid conflicts.

All team members must strictly follow the API documentation while implementing their assigned tasks.

✅ Ensure that endpoints, request formats, and response structures match the specifications in the API documentation.
✅ Proper error handling and status codes should be implemented as described.
✅ Maintain consistent data structures to avoid conflicts between frontend and backend.

---

## **📌 Setup Instructions**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/amirethio/Evangadi-forum.git
cd Evangadi-forum
```

### **3️⃣ Frontend Setup**

```sh
cd frontend
npm run dev
```

---

## **📌 Contribution Guide**

### **Branching Strategy**

📌 `main` → Stable code  
📌 `dev` → Development branch

🚀 **Happy Coding!** 🚀
