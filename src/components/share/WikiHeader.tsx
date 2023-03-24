import React, { useState } from 'react';
import { WikiEditorModal } from './WikiEditorModal';
type WikiHeaderProps = {
  title: string;
  buttonText: '작성' | '수정';
};

export const WikiHeader = ({ title, buttonText }: WikiHeaderProps) => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!isOpen);
  };
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div className='flex items-center justify-between p-5 border-b-2 border-brand'>
        <div>{title}</div>
        <button
          type='button'
          className='w-20 px-3 py-2 border-2 rounded border-brand hover:text-white hover:bg-brand'
          onClick={openModal}
        >
          {buttonText}
        </button>
      </div>
      <WikiEditorModal isOpen={isOpen} close={handleModal} purpose={buttonText} />
    </>
  );
};
