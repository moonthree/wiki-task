import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home/Home';
import App from './App';

// styles
import './index.css';
import { WikiPage } from './pages/wiki/WikiPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/wiki/:id',
        element: <WikiPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />,
);
