import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { MantineProvider } from '@mantine/core';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/login';
import UserList from './routes/user-list';
import UserProfile from './routes/user-profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Register from './routes/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/user/list',
    element: <UserList />,
  },
  {
    path: '/user/profile',
    element: <UserProfile />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
