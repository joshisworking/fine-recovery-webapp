import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fines from './components/Fines';
import FineDetails from './components/FineDetails';
import Subjects from './components/Subjects';
import Courthouses from './components/Courthouses';
import SubjectDetails from './components/SubjectDetails';

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Fines />,
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
        path: '/courthouses',
        element: <Courthouses />,
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
