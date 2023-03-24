import { useState } from 'react';
import { Button } from '~/components/Button';
import { wiki } from '~/types/sharedTypes';
import { UpdateWikiModal } from './UpdateWikiModal';

export const WikiPageHeader = ({ title, id }: wiki) => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  const openModal = () => {
    setOpen(true);
  };
  return (
    <div className='flex justify-between items-center border-b-2 p-5 border-brand font-bold'>
      <div>{title}</div>
      <Button text='수정' onClick={openModal} type='button' />
      <UpdateWikiModal isOpen={isOpen} close={handleModal} id={id} />
    </div>
  );
};
