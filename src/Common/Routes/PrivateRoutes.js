import React, { useContext, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../lib/context/Auth';
import NotFound from '../Pages/NotFound';

// Lazy load components
const Home = lazy(() => import('../../user/Pages/Home'));
const Shop = lazy(() => import('../../user/Pages/Shop'));
const Product = lazy(() => import('../../user/Pages/Product'));
const Cart = lazy(() => import('../../user/Pages/Cart'));
const Contact = lazy(() => import('../../user/Pages/Contact'));
const Dashboard = lazy(() => import('../../admin/Pages/Dashbord'));
const ManageOrders = lazy(() => import('../../admin/Pages/ManageOrders'));
const ManageProducts = lazy(() => import('../../admin/Pages/ManageProducts'));
const ManageUsers = lazy(() => import('../../admin/Pages/ManageUsers'));
const AdminShop = lazy(() => import('../../admin/Pages/AdminShop'));
const PrivateRoutes = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('User not found , redirecting to login');
      logout(); // clear any user data and token
      navigate('/login');
    }
  }, [user, navigate, logout]);

  const clientRoutes = [
    { label: 'Home', path: '/', element: <Home /> },
    { label: 'Shop', path: '/shop', element: <Shop /> },
    { label: 'Product', path: '/shop/product/:id', element: <Product /> },
    { label: 'Cart', path: '/cart', element: <Cart /> },
    { label: 'Contact', path: '/contact', element: <Contact /> }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/', element: <Dashboard /> },
    { label: 'Users', path: '/users', element: <ManageUsers /> },
    { label: 'Shop', path: '/shop', element: <AdminShop /> },
    { label: 'Products', path: '/products', element: <ManageProducts /> },
    { label: 'Orders', path: '/orders', element: <ManageOrders /> },
  ];

  const managerRoutes = [
    { label: 'Dashboard', path: '/', element: <Dashboard /> },
    { label: 'Shop', path: '/shop', element: <AdminShop /> },
    { label: 'Products', path: '/products', element: <ManageProducts /> },
    { label: 'Orders', path: '/orders', element: <ManageOrders /> },
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
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

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
    { label: 'Users', path: '/users' },
    { label: 'Shop', path: '/shop' },
    { label: 'Products', path: '/products' },
    { label: 'Orders', path: '/orders' },
  ];

  const managerRoutes = [
    { label: 'Dashboard', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Products', path: '/products' },
    { label: 'Orders', path: '/orders' },
  ];

  return user && user.roles === 'client' ? clientRoutes : user && user.roles === 'admin' ? adminRoutes : user && user.roles === 'manager' ? managerRoutes : [];
}

export default PrivateRoutes;
