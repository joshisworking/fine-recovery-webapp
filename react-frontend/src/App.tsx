import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fines from './components/fines/Fines';
import Subjects from './components/Subjects';
import Courthouses from './components/courthouses/Courthouses';

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Fines />,
      },
      {
        path: '/courthouses',
        element: <Courthouses />,
      },
      {
        path: '/subjects',
        element: <Subjects />,
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
