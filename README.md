# 🍬 Sweet Shop Management System

A full-stack application to manage a sweet shop — built with modern web technologies, developed using **Test-Driven Development (TDD)**, and responsibly integrated with **AI tools**.

---


## ⚙️ Tech Stack

### 🔧 Backend
- **Framework:** Node.js + Express  
- **Database:**  MongoDB 
- **Authentication:** JWT-based login & registration
- **Testing:** Jest

### 🎨 Frontend
- **Framework:** React 
- **Features:**
  - Register/Login
  - View and filter sweets
  - Purchase sweets
  - Admin: Add, edit, delete, restock sweets

---

## 📑 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and get token

### 🍭 Sweets (Protected)
- `GET /api/sweets` – List all sweets  
- `GET /api/sweets/search` – Search sweets  
- `POST /api/sweets` – Add sweet *(Admin)*  
- `PUT /api/sweets/:id` – Update sweet *(Admin)*  
- `DELETE /api/sweets/:id` – Delete sweet *(Admin)*

### 📦 Inventory (Protected)
- `POST /api/sweets/:id/purchase` – Purchase sweet  
- `POST /api/sweets/:id/restock` – Restock sweet *(Admin)*

---

## 🧪 TDD Approach

- Followed **Red → Green → Refactor** cycle
- Test coverage includes:
  - Authentication
  - API endpoints
  - Business logic
- Used tools: Jest 

---

## 🤖 My AI Usage
### AI Tools Used
GitHub Copilot: Assisted with writing unit tests and implementing repetitive CRUD operations
Claude: Helped with code refactoring suggestions and documentation writing

## Screen shot added in 
images folder

## 🚀 Setup & Run

### 🔙 Backend
```bash
# Clone repo
git clone https://github.com/RajdeepDharaviya/Sweet_Shop_Management
cd sweet-shop-backend

# Install dependencies
npm install

# Configure environment variables (.env)
# Example:
# JWT_SECRET=your_jwt_secret
# DB_URI=mongodb://localhost:27017/sweetshop

# Run the app
npm start

# Run tests
npm test


### 🔙 Backend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm start


### note
after build set up add data in db 
