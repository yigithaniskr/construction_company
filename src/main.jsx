import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import '../src/assets/css/index.scss';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index1 from './Pages/Home/Multipage/Home1/Index1';
import About from './Pages/About/About';
import Hizmetlerimiz from './Pages/Services/Hizmetlerimiz/Hizmetlerimiz';


import ProjectDetailsÇeliktepe from './Pages/Services/ProjectDetailsÇeliktepe';
import ProjectDetailsBakirköy from './Pages/Services/ProjectDetailsBakirköy';
import ProjectDetailsSapanca from './Pages/Services/ProjectDetailsSapanca';
import ProjectsList from './Pages/Services/ProjectsList';
import './i18n'; // i18n yapılandırmasını projenize dahil edin.
import ProjectDetailsNewProject from './Pages/Services/ProjectDetailsNewProject';


const router = createBrowserRouter([
  { path: "/*", element: <Index1 /> },
  { path: "/anasayfa", element: <Index1 /> },
  { path: "/hakkımızda", element: <About /> },
  { path: "/hizmetlerimiz", element: <Hizmetlerimiz /> },
  { path: "/projeler", element: <ProjectsList /> },
  { path: "/proje-detaylari-çeliktepe", element: <ProjectDetailsÇeliktepe /> },
  { path: "/proje-detaylari-bakırköy", element: <ProjectDetailsBakirköy /> },
  { path: "/proje-detaylari-sapanca", element: <ProjectDetailsSapanca /> },
  { path: "/proje-detaylari-yeni-proje", element: <ProjectDetailsNewProject /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
