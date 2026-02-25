import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AddTask from "../pages/Dashboard/AddTask";
import MyTasks from "../pages/Dashboard/MyTasks";
import TaskList from "../pages/Dashboard/TaskList";
import TaskDetails from "../pages/Dashboard/TaskDetails";
import MySubmissions from "../pages/Dashboard/MySubmissions";
import BuyerSubmissions from "../pages/Dashboard/BuyerSubmissions";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTasks from "../pages/Dashboard/ManageTasks";
import PurchaseCoin from "../pages/Dashboard/PurchaseCoin";
import Payment from "../pages/Dashboard/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import Withdrawals from "../pages/Dashboard/Withdrawals";
import ManageWithdrawals from "../pages/Dashboard/ManageWithdrawals";
import BuyerHome from "../pages/Dashboard/BuyerHome";
import WorkerHome from "../pages/Dashboard/WorkerHome";
import AdminHome from "../pages/Dashboard/AdminHome";
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Navigate to="worker-home" replace />
            },
            {
                path: 'buyer-home',
                element: <BuyerHome />
            },
            {
                path: 'worker-home',
                element: <WorkerHome />
            },
            {
                path: 'admin-home',
                element: <AdminHome />
            },
            {
                path: 'addTask',
                element: <AddTask />
            },
            {
                path: 'myTasks',
                element: <MyTasks />
            },
            {
                path: 'manageSubmissions',
                element: <BuyerSubmissions />
            },
            {
                path: 'taskList',
                element: <TaskList />
            },
            {
                path: 'taskDetails/:id',
                element: <TaskDetails />
            },
            {
                path: 'mySubmissions',
                element: <MySubmissions />
            },
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'manage-tasks',
                element: <ManageTasks />
            },
            {
                path: 'purchase-coin',
                element: <PurchaseCoin />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },
            {
                path: 'withdrawals',
                element: <Withdrawals />
            },
            {
                path: 'manage-withdrawals',
                element: <ManageWithdrawals />
            }
        ]
    }
]);
