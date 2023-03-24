import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Nav } from './components/Nav';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <div className='mt-[100px]'>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
