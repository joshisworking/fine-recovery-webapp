import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fines from './components/Fines';
import FineDetails from './components/FineDetails';
import Subjects from './components/Subjects';
import Courthouses from './components/Courthouses';
import SubjectDetails from './components/SubjectDetails';
import CourthouseDetails from './components/CourthouseDetails';
import Login from './components/Login';
import Register from './components/Register';

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Fines />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/logout',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/fine',
        element: <Fines />,
      },
      {
        path: '/fine/:id',
        element: <FineDetails />,
      },
      {
        path: '/courthouse',
        element: <Courthouses />,
      },
      {
        path: '/courthouse/:id',
        element: <CourthouseDetails />,
      },
      {
        path: '/subject',
        element: <Subjects />,
      },
      {
        path: '/subject/:id',
        element: <SubjectDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
