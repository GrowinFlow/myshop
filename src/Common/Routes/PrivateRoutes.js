import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/context/LoginContext';
import NotFound from '../Pages/NotFound';

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
      console.log('User not found, redirecting to login');
      navigate('/login');
    } else {
      console.log('User found:');
      // console.log('User found:'user);
    }
  }, [user, navigate]);

  const clientRoutes = [
    { label: 'Home', path: '/', element: <Home /> },
    { label: 'Shop', path: '/shop', element: <Shop /> },
    { label: 'Product', path: '/shop/product/:id', element: <Product /> },
    { label: 'Cart', path: '/cart', element: <Cart /> },
    { label: 'Contact', path: '/contact', element: <Contact /> }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/', element: <Dashbord /> },
    { label: 'Users', path: '/manage-users', element: <ManageUsers /> },
    { label: 'Shop', path: '/admin-shop', element: <AdminShop /> },
    { label: 'Products', path: '/manage-products', element: <ManageProducts /> },
    { label: 'Orders', path: '/manage-orders', element: <ManageOrders /> },
  ];

  const managerRoutes = [
      { label: 'Dashboard', path: '/', element: <Dashbord /> },
      { label: 'Shop', path: '/admin-shop', element: <AdminShop /> },
      { label: 'Products', path: '/manage-products', element: <ManageProducts /> },
      { label: 'Orders', path: '/manage-orders', element: <ManageOrders /> },
  ];

  let routes = [];
  if (user) {
    switch (user.roles) {
      case 'client':
        routes = clientRoutes;
        break;
      case 'admin':
        routes = adminRoutes;
        break;
      case 'manager':
        routes = managerRoutes;
        break;
      default:
        routes = [];
        break;
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export function getNavItems(user) {
  const clientRoutes = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Product', path: '/shop/product/:id' },
    { label: 'Cart', path: '/cart' },
    { label: 'Contact', path: '/contact' }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/' },
    { label: 'Users', path: '/manage-users' },
    { label: 'Shop', path: '/admin-shop' },
    { label: 'Products', path: '/manage-products' },
    { label: 'Orders', path: '/manage-orders' },
  ];

  const managerRoutes = [
    { label: 'Dashboard', path: '/' },
    { label: 'Shop', path: '/admin-shop' },
    { label: 'Products', path: '/manage-products' },
    { label: 'Orders', path: '/manage-orders' },
  ];

  return user && user.roles === 'client' ? clientRoutes : user && user.roles === 'admin' ? adminRoutes : user && user.roles === 'manager' ? managerRoutes : [];
}

export default PrivateRoutes;
