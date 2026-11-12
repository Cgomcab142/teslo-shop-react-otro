import { createHashRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { RegisterPage } from "./auth/pages/register/RegisterPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminProductsPage } from "./admin/pages/products/AdminProductsPage";
import { lazy } from "react";
import { AdminProductPage } from "./admin/pages/product/AdminProductPage";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";


const AuthLayout = lazy(() => import("./auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    // public routes
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:isSlug',
                element: <ProductPage />
            },
            {
                path: 'gender/:gender',
                element: <GenderPage />
            },
        ]
    },
    // auth routes
    {
        path: 'auth',
        element: (
            <NotAuthenticatedRoute>
                <AuthLayout />
            </NotAuthenticatedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login' />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            }
        ]
    },
    // auth routes
    {
        path: 'admin',
        element: (
            <AdminRoute>
                <AdminLayout/>
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'products',
                element: <AdminProductsPage />
            },
            {
                path: 'products/:id',
                element: <AdminProductPage />
            }
        ]

    },
    {
        path: '*',
        element: <Navigate to='/' />
    }

])