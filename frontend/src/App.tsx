import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AboutPage } from './pages/AboutPage'
import { BookingPage } from './pages/BookingPage'
import { ContactPage } from './pages/ContactPage'
import { CourtsPage } from './pages/CourtsPage'
import { FaqPage } from './pages/FaqPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/sobre', element: <AboutPage /> },
      { path: '/quadras', element: <CourtsPage /> },
      { path: '/reservas', element: <BookingPage /> },
      { path: '/galeria', element: <GalleryPage /> },
      { path: '/contato', element: <ContactPage /> },
      { path: '/perguntas-frequentes', element: <FaqPage /> },
      { path: '/privacidade', element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
