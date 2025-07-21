
````markdown
# 🚀 ERP System with Multi-Tenancy Architecture

A complete Dockerized ERP API featuring:

- **Super Admin Portal** – Manage companies  
- **Company Portal** – Manage users and roles within organizations  
- **MySQL Database** – Persistent data storage  
- **Nginx Reverse Proxy** – Unified API gateway  

---

## 🌐 System Architecture

Client → Nginx:80  
├─→ `/api/v1/admin`   → admin-api:5077  
└─→ `/api/v1/company` → company-api:5078  

---

## ⚡ Quick Start

## 🛠️ Prerequisites

- Docker 28.3.2  
- Docker Compose v2.33.1-desktop.1  
- pnpm 10.7.1  

### 1️⃣ Clone & Setup

```bash
git clone https://github.com/yourusername/erp-api.git
cd erp-api
````

### 2️⃣ Start Services

```bash
docker compose up -d --build
```

### 3️⃣ Verify Services

```bash
docker compose ps
```

---

## 🔐 Authentication Flow

### 🧑‍💼 1. Super Admin Signup (First User)

```http
POST http://localhost:80/api/v1/admin/auth/signup
Content-Type: application/json

{
  "name": "System Admin",
  "email": "admin@erp.com",
  "password": "Admin@1234"
}
```

### 🔑 2. Super Admin Login

```http
POST http://localhost:80/api/v1/admin/auth/signin
Content-Type: application/json

{
  "email": "admin@erp.com",
  "password": "Admin@1234"
}
```

### 🏢 3. Create Company

```http
POST http://localhost:80/api/v1/admin/company
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "name": "Acme Corp",
  "industry": "IT",
  "contact_email": "ceo@acme.com"
}
```

---

## 📡 API Endpoints

### 🛠 Admin API (`/api/v1/admin`)

| Endpoint       | Method | Description          |
| -------------- | ------ | -------------------- |
| `/auth/signup` | POST   | Register first admin |
| `/auth/signin` | POST   | Admin login          |
| `/company`     | POST   | Create new company   |

### 🏭 Company API (`/api/v1`)
 
http://localhost:80/api/v1

| Endpoint      | Method | Description        |
| ------------- | ------ | ------------------ |
| `/auth/login` | POST   | Company user login |
| `/roles`      | POST   | Create new role    |
| `/users`      | POST   | Create new user    |

---

## 🛠️ Development

### 📁 Project Structure

```
erp-api/
├── apps/
│   ├── admin-api/       # Super Admin portal
│   └── company-api/     # Company management
├── common/              # Shared modules
├── mysql-init/          # Database setup
└── nginx/               # Proxy configs
```

