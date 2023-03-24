import { useState } from 'react';
import { Button } from '~/components/Button';
import { CreateWikiModal } from './CreateWikiModal';

export const WikiListHeader = () => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className='flex justify-between items-center border-b-2 p-5 border-brand font-bold'>
      <div>WikiList</div>
      <Button text='작성' onClick={openModal} type='button' />
      <CreateWikiModal isOpen={isOpen} close={handleModal} />
    </div>
  );
};
