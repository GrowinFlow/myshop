import { Routes, Route } from 'react-router-dom';
import Loading from '../../Components/Common/CustomMIniComponents/Loading';
import { lazy, Suspense, useEffect, useMemo } from 'react';
import { activeUser } from '../../lib/helper';
import { data } from '../../lib/mockData';

// Lazy load components
const ChatsView = lazy(() => import('../../Components/View/ChatsView'));
const ContactView = lazy(() => import('../../Components/View/ContactView'));
const DashboardView = lazy(() => import('../../Components/View/DashboardView'));
const HomeView = lazy(() => import('../../Components/View/HomeView'));
const NotificationsView = lazy(() => import('../../Components/View/NotificationsView'));
const OffersView = lazy(() => import('../../Components/View/OffersView'));
const OrdersView = lazy(() => import('../../Components/View/OrdersView'));
const OrderTrackingView = lazy(() => import('../../Components/View/OrderTrackingView'));
const PaymentsView = lazy(() => import('../../Components/View/PaymentsView'));
const ProductsView = lazy(() => import('../../Components/View/ProductsView'));
const ShopView = lazy(() => import('../../Components/View/ShopView'));
const UsersView = lazy(() => import('../../Components/View/UsersView'));
const SettingsView = lazy(() => import('../../Components/View/SettingsView'));

const NotFound = lazy(() => import('./../CommonRoutes/NotFound'));
const ProfileView = lazy(() => import('../../Components/View/ProfileView'));

const PrivateRoutes = () => {
  useMemo(() => {
    localStorage.setItem('user', JSON.stringify(data[0]));     
  }, [])
  // useEffect(()=>{
  //   localStorage.setItem('user', JSON.stringify(data[0]));     
  // },[])
useEffect(()=>{
  let a = activeUser() 
  if(1 === a){
    console.log(a, "aaaaaaaaaaaa")
  }else{

    console.log(a, "bbbbbbb") 
  }
},[]) 
  const routes = [
    { label: 'Home', path: '/', element: <HomeView /> }, 
    { label: 'Chats', path: '/chats', element: <ChatsView /> },
    { label: 'Contact', path: '/contact', element: <ContactView /> },
    { label: 'Dashboard', path: '/dashboard', element: <DashboardView /> },
    { label: 'Shop', path: '/shop', element: <ShopView /> },
    { label: 'Product Details', path: '/shop/product/:id', element: <ProductsView /> },
    { label: 'Notifications', path: '/admin/notifications', element: <NotificationsView /> },
    { label: 'Offers', path: '/offers', element: <OffersView /> },
    { label: 'Orders', path: '/orders', element: <OrdersView /> },
    { label: 'Order Tracking', path: '/order-tracking', element: <OrderTrackingView /> },
    { label: 'Payments', path: '/payments', element: <PaymentsView /> },
    { label: 'Users', path: '/users', element: <UsersView /> },
    { label: 'Profile', path: '/profile', element: <ProfileView /> },
    { label: 'Settings', path: '/settings', element: <SettingsView /> },
    { label: 'Not Found', path: '/*', element: <NotFound /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<><div className="flex justify-center items-center min-h-[90vh]"><Loading /></div></>}>
              {getComponentForRoute(route.path)}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};
const getComponentForRoute = (path) => {
  switch (path) {
    case '/':
      return <HomeView />;
    case '/chats':
      return <ChatsView />;
    case '/contact':
      return <ContactView />;
    case '/dashboard':
      return <DashboardView />;
    case '/shop':
      return <ShopView />;
    case '/shop/product/:id':
      return <ProductsView />;
    case '/admin/notifications':
      return <NotificationsView />;
    case '/offers':
      return <OffersView />;
    case '/orders':
      return <OrdersView />;
    case '/order-tracking':
      return <OrderTrackingView />;
    case '/payments':
      return <PaymentsView />;
    case '/users':
      return <UsersView />;
    case '/profile':
      return <ProfileView />;
    case '/settings':
      return <SettingsView />;
    default:
      return <NotFound />;
  }
};


export function getNavItems() {

  const routes = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Chats', path: '/chats' },
    { label: 'Users', path: '/users' },
    { label: 'Shop', path: '/shop' },
    { label: 'Product Details', path: '/shop/product/:id' },
    { label: 'Notifications', path: '/admin/notifications' },
    { label: 'Offers', path: '/offers' },
    { label: 'Orders', path: '/orders' },
    { label: 'Order Tracking', path: '/order-tracking' },
    { label: 'Payments', path: '/payments' },
    { label: 'Profile', path: '/profile' },
    { label: 'Contact', path: '/contact' },
    { label: 'Settings', path: '/settings' },
  ];

  return routes;
}

export default PrivateRoutes;
