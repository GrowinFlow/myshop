// PrivateRoutes.js
import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/context/LoginContext';
import NotFound from '../Pages/NotFound';
import Main from '../Layout/Main';

// Lazy load components
const Home = lazy(() => import('../../user/Pages/Home'));
const Shop = lazy(() => import('../../user/Pages/Shop'));
const Product = lazy(() => import('../../user/Pages/Product'));
const Cart = lazy(() => import('../../user/Pages/Cart'));
const Contact = lazy(() => import('../../user/Pages/Contact'));
const Dashbord = lazy(() => import('../../admin/Pages/Dashbord'));
const ManageOrders = lazy(() => import('../../admin/Pages/ManageOrders'));
const ManageProducts = lazy(() => import('../../admin/Pages/ManageProducts'));
const ManageUsers = lazy(() => import('../../admin/Pages/ManageUsers'));
const AdminShop = lazy(() => import('../../admin/Pages/AdminShop'));

function PrivateRoutes() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const userRoutes = [
    { label: 'Home', path: '/', element: <Main page={<Home />} /> },
    { label: 'Shop', path: '/shop', element: <Main page={<Shop />} /> },
    { label: 'Product', path: '/shop/product/:id', element: <Main page={<Product />} /> },
    { label: 'Cart', path: '/cart', element: <Main page={<Cart />} /> },
    { label: 'Contact', path: '/contact', element: <Main page={<Contact />} /> }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/', element: <Main page={<Dashbord />} /> },
    { label: 'Manage Orders', path: '/manage-orders', element: <Main page={<ManageOrders />} /> },
    { label: 'Manage Products', path: '/manage-products', element: <Main page={<ManageProducts />} /> },
    { label: 'Manage Users', path: '/manage-users', element: <Main page={<ManageUsers />} /> },
    { label: 'Admin Shop', path: '/admin-shop', element: <Main page={<AdminShop />} /> }
  ];

  const routes = user && user.roles === 'user' ? userRoutes : user && user.roles === 'admin' ? adminRoutes : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<Main page={<NotFound />} />} />
      </Routes>
    </Suspense>
  );
}

// Function to get the nav items
export function getNavItems(user) {
  const userRoutes = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Product', path: '/shop/product/:id' },
    { label: 'Cart', path: '/cart' },
    { label: 'Contact', path: '/contact' }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/' },
    { label: 'Manage Orders', path: '/manage-orders' },
    { label: 'Manage Products', path: '/manage-products' },
    { label: 'Manage Users', path: '/manage-users' },
    { label: 'Admin Shop', path: '/admin-shop' }
  ];

  return user && user.roles === 'user' ? userRoutes : user && user.roles === 'admin' ? adminRoutes : [];
}

export default PrivateRoutes;
