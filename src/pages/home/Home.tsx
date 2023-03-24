import { WikiHeader } from '~/components/share/WikiHeader';
import { WikiList } from './components/WikiList';

export const Home = () => {
  return (
    <div className='w-[600px] mx-auto border-2 border-brand h-[500px] rounded'>
      <WikiHeader title={'WikiList'} buttonText={'작성'} />
      <WikiList />
    </div>
  );
};
