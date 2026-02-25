@echo off
cd /d "c:\Users\Redwan Ahmmed\Desktop\MicroTaskManagement\client"

git init
git config user.email "rahmmed2330756@gmail.com"
git config user.name "Redwan Ahmmed"

:: Commit 1: Project initialization
git add package.json vite.config.js .gitignore
git commit -m "Initialize React project with Vite"

:: Commit 2: Tailwind and DaisyUI configuration
git add tailwind.config.js postcss.config.js src/index.css
git commit -m "Configure Tailwind CSS and DaisyUI styling"

:: Commit 3: Firebase configuration
git add src/providers/firebase.config.js
git commit -m "Add Firebase configuration and setup"

:: Commit 4: Auth Provider
git add src/providers/AuthProvider.jsx
git commit -m "Implement Firebase AuthProvider with Google sign-in"

:: Commit 5: Main entry point
git add index.html src/main.jsx src/App.jsx src/App.css
git commit -m "Setup main entry point and React root render"

:: Commit 6: Route configuration
git add src/routes/Routes.jsx
git commit -m "Configure React Router with nested routes"

:: Commit 7: Layouts
git add src/layouts/MainLayout.jsx src/layouts/DashboardLayout.jsx
git commit -m "Create MainLayout and responsive DashboardLayout"

:: Commit 8: Navbar
git add src/components/Shared/Navbar.jsx
git commit -m "Build Navbar with coins display and notification bell"

:: Commit 9: Footer
git add src/components/Shared/Footer.jsx
git commit -m "Create Footer with social media links"

:: Commit 10: Sidebar
git add src/components/Shared/Sidebar.jsx
git commit -m "Implement role-based Sidebar navigation"

:: Commit 11: Custom hooks
git add src/hooks/useAxiosSecure.jsx src/hooks/useRole.jsx
git commit -m "Add useAxiosSecure and useRole custom hooks"

:: Commit 12: Hero Banner
git add src/components/Home/Banner.jsx
git commit -m "Create Hero section with Swiper slider"

:: Commit 13: Best Workers
git add src/components/Home/BestWorkers.jsx
git commit -m "Add Best Workers section showing top earners"

:: Commit 14: Testimonials
git add src/components/Home/Testimonials.jsx
git commit -m "Build Testimonials section with Swiper slider"

:: Commit 15: Extra home sections
git add src/components/Home/HowItWorks.jsx src/components/Home/PlatformStats.jsx src/components/Home/CallToAction.jsx
git commit -m "Add HowItWorks, PlatformStats, and CallToAction sections"

:: Commit 16: Home and Auth pages
git add src/pages/Home/Home.jsx src/pages/Login/Login.jsx src/pages/Register/Register.jsx
git commit -m "Create Home, Login, and Register pages"

:: Commit 17: PrivateRoute
git add src/components/PrivateRoute.jsx
git commit -m "Implement PrivateRoute for dashboard protection"

:: Commit 18: Buyer dashboard pages
git add src/pages/Dashboard/BuyerHome.jsx src/pages/Dashboard/AddTask.jsx src/pages/Dashboard/MyTasks.jsx src/pages/Dashboard/BuyerSubmissions.jsx
git commit -m "Build Buyer dashboard: Home, AddTask, MyTasks, Submissions"

:: Commit 19: Worker dashboard pages
git add src/pages/Dashboard/WorkerHome.jsx src/pages/Dashboard/TaskList.jsx src/pages/Dashboard/TaskDetails.jsx src/pages/Dashboard/MySubmissions.jsx src/pages/Dashboard/Withdrawals.jsx
git commit -m "Build Worker dashboard: Home, TaskList, Details, Submissions, Withdrawals"

:: Commit 20: Admin and Payment pages + README
git add src/pages/Dashboard/AdminHome.jsx src/pages/Dashboard/ManageUsers.jsx src/pages/Dashboard/ManageTasks.jsx src/pages/Dashboard/ManageWithdrawals.jsx src/pages/Dashboard/PurchaseCoin.jsx src/pages/Dashboard/Payment.jsx src/pages/Dashboard/PaymentHistory.jsx README.md
git commit -m "Add Admin dashboard, Stripe payment integration, and README"

:: Add any remaining files
git add -A
git diff --cached --quiet || git commit -m "Add remaining assets and configuration files"

echo.
echo === CLIENT COMMITS ===
git log --oneline
echo.
echo Done! Total commits created.
