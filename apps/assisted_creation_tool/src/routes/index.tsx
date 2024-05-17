import { createBrowserRouter } from 'react-router-dom';
import { ImageEditPage } from '../pages/image-edit';
import { ImageListPage } from '../pages/images-list';
import ErrorPage from '../components/error-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ImageListPage />,
    ErrorBoundary: ErrorPage,
  },
  {
    path: '/edit/:id',
    element: <ImageEditPage />,
    ErrorBoundary: ErrorPage,
  },
]);
