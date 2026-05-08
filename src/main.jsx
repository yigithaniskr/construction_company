import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import '../src/assets/css/index.scss';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import Index1 from './Pages/Home/Multipage/Home1/Index1';
import About from './Pages/About/About';
import Hizmetlerimiz from './Pages/Services/Hizmetlerimiz/Hizmetlerimiz';
import ProjectsList from './Pages/Services/ProjectsList';
import ProjectDetail from './Pages/Services/ProjectDetail';
import './i18n';
import GizlilikPolitikasiKVKK from './Pages/Legal/GizlilikPolitikasiKVKK';
import CookieConsent from './Components/CookieConsent/CookieConsent';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Pages/Admin/AdminLayout';
import AdminProjectsList from './Pages/Admin/AdminProjectsList';
import AdminProjectForm from './Pages/Admin/AdminProjectForm';
import ProtectedRoute from './Pages/Admin/ProtectedRoute';

// Vite preloadError event listener
window.addEventListener('vite:preloadError', (event) => {
    console.error('Preload error detected:', event.payload);
    event.preventDefault();
    window.location.reload();
});

const RootLayout = () => (
  <>
    <Outlet />
    <CookieConsent />
  </>
);

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/*", element: <Index1 /> },
      { path: "/anasayfa", element: <Index1 /> },
      { path: "/hakkımızda", element: <About /> },
      { path: "/hizmetlerimiz", element: <Hizmetlerimiz /> },
      { path: "/projeler", element: <ProjectsList /> },
      { path: "/proje/:slug", element: <ProjectDetail /> },
      { path: "/gizlilik-politikasi-kvkk", element: <GizlilikPolitikasiKVKK /> },
      { path: "/yonetim-paneli/giris", element: <AdminLogin /> },
      {
        path: "/yonetim-paneli",
        element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <AdminProjectsList /> },
          { path: "proje/yeni", element: <AdminProjectForm /> },
          { path: "proje/:id", element: <AdminProjectForm /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
