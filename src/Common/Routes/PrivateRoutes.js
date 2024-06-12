// // PrivateRoutes.js
// import React, { useContext, useEffect, Suspense, lazy } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../lib/context/LoginContext';
// import NotFound from '../Pages/NotFound';

// // Lazy load components
// const Home = lazy(() => import('../../user/Pages/Home'));
// const Shop = lazy(() => import('../../user/Pages/Shop'));
// const Product = lazy(() => import('../../user/Pages/Product'));
// const Cart = lazy(() => import('../../user/Pages/Cart'));
// const Contact = lazy(() => import('../../user/Pages/Contact'));
// const Dashbord = lazy(() => import('../../admin/Pages/Dashbord'));
// const ManageOrders = lazy(() => import('../../admin/Pages/ManageOrders'));
// const ManageProducts = lazy(() => import('../../admin/Pages/ManageProducts'));
// const ManageUsers = lazy(() => import('../../admin/Pages/ManageUsers'));
// const AdminShop = lazy(() => import('../../admin/Pages/AdminShop'));

// function PrivateRoutes() {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       console.log('User not found, redirecting to login');
//       navigate('/login');
//     } else {
//       console.log('User found:', user);
//     }
//   }, [user, navigate]);
  
  

//   const userRoutes = [
//     { label: 'Home', path: '/', element:<Home />},
//     { label: 'Shop', path: '/shop', element:<Shop />},
//     { label: 'Product', path: '/shop/product/:id', element:<Product />},
//     { label: 'Cart', path: '/cart', element:<Cart />},
//     { label: 'Contact', path: '/contact', element:<Contact />}
//   ];

//   const adminRoutes = [
//     { label: 'Dashboard', path: '/', element:<Dashbord />},
//     { label: 'Manage Orders', path: '/manage-orders', element:<ManageOrders />},
//     { label: 'Manage Products', path: '/manage-products', element:<ManageProducts />},
//     { label: 'Manage Users', path: '/manage-users', element:<ManageUsers />},
//     { label: 'Admin Shop', path: '/admin-shop', element:<AdminShop />}
//   ];

//   const routes = user && user.roles === 'user' ? userRoutes : user && user.roles === 'admin' ? adminRoutes : [];

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <Routes>
//         {routes.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Suspense>
//   );
// }

// // Function to get the nav items
// export function getNavItems(user) {
//   const userRoutes = [
//     { label: 'Home', path: '/' },
//     { label: 'Shop', path: '/shop' },
//     { label: 'Product', path: '/shop/product/:id' },
//     { label: 'Cart', path: '/cart' },
//     { label: 'Contact', path: '/contact' }
//   ];

//   const adminRoutes = [
//     { label: 'Dashboard', path: '/' },
//     { label: 'Manage Orders', path: '/manage-orders' },
//     { label: 'Manage Products', path: '/manage-products' },
//     { label: 'Manage Users', path: '/manage-users' },
//     { label: 'Admin Shop', path: '/admin-shop' }
//   ];

//   return user && user.roles === 'user' ? userRoutes : user && user.roles === 'admin' ? adminRoutes : [];
// }

// export default PrivateRoutes;


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
      console.log('User found:', user);
    }
  }, [user, navigate]);

  const userRoutes = [
    { label: 'Home', path: '/', element: <Home /> },
    { label: 'Shop', path: '/shop', element: <Shop /> },
    { label: 'Product', path: '/shop/product/:id', element: <Product /> },
    { label: 'Cart', path: '/cart', element: <Cart /> },
    { label: 'Contact', path: '/contact', element: <Contact /> }
  ];

  const adminRoutes = [
    { label: 'Dashboard', path: '/', element: <Dashbord /> },
    { label: 'Manage Orders', path: '/manage-orders', element: <ManageOrders /> },
    { label: 'Manage Products', path: '/manage-products', element: <ManageProducts /> },
    { label: 'Manage Users', path: '/manage-users', element: <ManageUsers /> },
    { label: 'Admin Shop', path: '/admin-shop', element: <AdminShop /> }
  ];

  const managerRoutes = [
      { label: 'Dashboard', path: '/', element: <Dashbord /> },
      { label: 'Manage Orders', path: '/manage-orders', element: <ManageOrders /> },
      { label: 'Manage Products', path: '/manage-products', element: <ManageProducts /> },
      { label: 'Admin Shop', path: '/admin-shop', element: <AdminShop /> }
  ];

  let routes = [];
  if (user) {
    switch (user.roles) {
      case 'user':
        routes = userRoutes;
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

  const managerRoutes = [
    { label: 'Dashboard', path: '/' },
    { label: 'Admin Shop', path: '/admin-shop' },
    { label: 'Manage Orders', path: '/manage-orders' },
    { label: 'Manage Products', path: '/manage-products' },
  ];

  return user && user.roles === 'user' ? userRoutes : user && user.roles === 'admin' ? adminRoutes : user && user.roles === 'manager' ? managerRoutes : [];
}

export default PrivateRoutes;
