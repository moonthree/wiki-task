import { WikiList } from './components/WikiList';
import { WikiListHeader } from './components/WikiListHeader';

export const Home = () => {
  return (
    <div className='w-[600px] mx-auto border-2 border-brand h-[500px] rounded'>
      <WikiListHeader />
      <WikiList />
    </div>
  );
};
