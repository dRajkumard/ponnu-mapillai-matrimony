import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import HomePage from '@/routes/home'
import AboutPage from '@/routes/about'
import DashboardPage from '@/routes/dashboard'
import MatrimonyRequestsPage from '@/routes/matrimony-requests'
import UserDetailsPage from '@/routes/user-details'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'matrimony-requests', element: <MatrimonyRequestsPage /> },
      { path: 'user-details/:userId', element: <UserDetailsPage /> },
    ],
  },
])

