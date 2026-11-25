import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CompetitionsPage } from './pages/CompetitionsPage';
import { CompetitionDetailPage } from './pages/CompetitionDetailPage';
import { StandingsAndSchedulePage } from './pages/StandingsAndSchedulePage';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { RegistrationAndContactPage } from './pages/RegistrationAndContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'o-udruzi', element: <AboutPage /> },
        { path: 'natjecanja', element: <CompetitionsPage /> },
        { path: 'natjecanja/:slug', element: <CompetitionDetailPage /> },
        { path: 'raspored-i-tablice', element: <StandingsAndSchedulePage /> },
        { path: 'vijesti', element: <NewsPage /> },
        { path: 'vijesti/:slug', element: <NewsPage /> },
        { path: 'galerija', element: <GalleryPage /> },
        { path: 'prijava-i-kontakt', element: <RegistrationAndContactPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function App() {
  return <RouterProvider router={router} />;
}
