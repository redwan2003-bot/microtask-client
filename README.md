# MicroTask - Micro Tasking & Earning Platform

A full-stack micro-tasking platform where workers complete small tasks to earn rewards, buyers create and manage tasks, and admins oversee platform operations.

🔗 **Live Site**: (https://microtask-client-v4pc.vercel.app/)
🔗 **Server API**: [https://microtask-server-90z4.onrender.com/](https://microtask-server-90z4.onrender.com/)

## Admin Credentials
- **Email**: admin@microtask.com
- **Password**: Admin@123

## 🌟 Key Features

1. **Three-Role System** — Distinct dashboards for Worker, Buyer, and Admin with role-based access control and middleware protection.

2. **Stripe Payment Integration** — Secure coin purchases with real Stripe checkout (test mode), 4 pricing tiers (10 coins/$1, 150/$10, 500/$20, 1000/$35).

3. **Task Management Lifecycle** — Buyers create tasks with ImgBB image upload, workers browse/submit proof, buyers approve/reject with automatic coin transfers.

4. **Smart Withdrawal System** — Workers withdraw earnings (20 coins = $1, min 200 coins) via Bkash, Nagad, Rocket, or PayPal with admin approval workflow.

5. **Real-time Notification System** — Bell icon with unread count, floating popup notifications for task approvals, rejections, submissions, and withdrawal completions.

6. **JWT Authentication with Firebase** — Secure login via email/password and Google Sign-In, JWT stored in httpOnly cookies, persistent auth across page reloads.

7. **Interactive Home Page** — 6 sections with Swiper sliders (Hero + Testimonials), animated Platform Stats counters, How It Works guide, and gradient Call-to-Action.

8. **Admin Dashboard with Analytics** — Real-time stats (total workers, buyers, coins, payments), user role management, task oversight, and withdrawal approval.

9. **Responsive Design** — Fully responsive across mobile, tablet, and desktop. Dashboard uses a drawer sidebar on mobile and fixed sidebar on desktop.

10. **Coin Economy System** — Workers earn 10 coins on registration, Buyers get 50 coins. Buy-in rate: 10 coins/$1. Withdrawal rate: 20 coins/$1 — creating platform revenue.

11. **Submission Review with Proof Modal** — Buyers can view worker submissions in a modal, approve (awarding coins + notification) or reject (incrementing available workers).

12. **Paginated My Submissions** — Workers can track all their submissions with status highlighting in a paginated table.

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 19, Vite, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express.js, MongoDB |
| Auth | Firebase Authentication, JWT |
| Payments | Stripe |
| Image Upload | ImgBB API |
| UI Libraries | Swiper, Lucide React, SweetAlert2 |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/micro-task-client.git
cd micro-task-client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 📁 Project Structure
```
src/
├── components/
│   ├── Home/          # Banner, BestWorkers, Testimonials, HowItWorks, PlatformStats, CallToAction
│   ├── Shared/        # Navbar, Footer, Sidebar
│   └── PrivateRoute.jsx
├── hooks/             # useAxiosSecure, useRole
├── layouts/           # MainLayout, DashboardLayout
├── pages/
│   ├── Dashboard/     # All dashboard pages (13 pages)
│   ├── Home/          # Home page
│   ├── Login/         # Login page
│   └── Register/      # Register page
├── providers/         # AuthProvider, firebase.config
└── routes/            # Routes configuration
```

## 🔒 Environment Variables

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
```
