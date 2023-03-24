import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className='fixed top-0 left-0 right-0 h-[100px] flex justify-center items-center font-bold'>
      <Link to='/'>글로벌 널리지 위키 서비스</Link>
    </div>
  );
};
