# Vorcove — MERN Stack Enterprise Web Application & API Server

Vorcove is a high-performance, full-stack enterprise web application built on the **MERN** stack (MongoDB, Express, React, Node.js + TypeScript).

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Lucide Icons, Vite, Custom Design System
- **Backend**: Node.js, Express, TypeScript (`tsx`), CORS, JSON Web Tokens (JWT), Bcrypt.js
- **Database**: MongoDB with Mongoose ODM (featuring zero-downtime resilient in-memory fallback store)
- **Environment**: Dotenv configuration for secrets and ports

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (optional for local persistent storage; in-memory fallback will automatically engage if MongoDB is offline)

### 2. Environment Setup
Copy or edit `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/vorcove
JWT_SECRET=vorcove_enterprise_jwt_secret_key_2026_super_secure
CORS_ORIGIN=http://localhost:5173
ADMIN_DEFAULT_EMAIL=admin@vorcove.com
ADMIN_DEFAULT_PASSWORD=vorcove2026
```

### 3. Running the Application

#### Start Both Client & Server Concurrently (Recommended):
```bash
npm run dev:all
```

#### Start Server Only:
```bash
npm run server
```

#### Start Client Only:
```bash
npm run dev
```

#### Seed MongoDB Database:
```bash
npm run seed
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service health, uptime & DB status | No |
| `GET` | `/api/case-studies` | Fetch all published case studies (filter by `?category=`) | No |
| `GET` | `/api/case-studies/:slug` | Fetch single case study by slug | No |
| `GET` | `/api/testimonials` | Fetch client testimonials | No |
| `POST` | `/api/contact` | Submit consultation & scoping inquiry | No |
| `POST` | `/api/roi/calculate` | Instant ROI & team efficiency calculation | No |
| `POST` | `/api/roi/save` | Save client ROI proposal audit | No |
| `POST` | `/api/assistant/chat` | AI Studio conversation with knowledge base | No |
| `POST` | `/api/assistant/lead` | Capture prospective lead from AI assistant | No |
| `POST` | `/api/demos/copilot/run` | Execute Ticket Copilot AI Triage simulation | No |
| `POST` | `/api/demos/pricing/simulate` | Execute Dynamic Pricing ML simulation | No |
| `POST` | `/api/demos/churn/analyze` | Execute Churn Telemetry analysis | No |
| `POST` | `/api/auth/login` | Admin authentication (returns JWT) | No |
| `GET` | `/api/auth/me` | Current authenticated admin profile | Yes (Bearer Token) |
| `GET` | `/api/admin/stats` | Real-time enterprise analytics & metrics | Yes (Bearer Token) |
| `GET` | `/api/contact` | Fetch inquiries with filtering & pagination | Yes (Bearer Token) |
| `PATCH` | `/api/contact/:id` | Update inquiry status & internal notes | Yes (Bearer Token) |
| `DELETE` | `/api/contact/:id` | Delete inquiry | Yes (Bearer Token) |

---

## 🛡️ Default Admin Credentials
- **Email**: `admin@vorcove.com`
- **Password**: `vorcove2026`
