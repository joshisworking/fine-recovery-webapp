import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './containers/Main';
import Navbar from './components/Navbar';
import Fines from './components/Fines';
import Subjects from './components/Subjects';
import Courthouses from './components/Courthouses';

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
