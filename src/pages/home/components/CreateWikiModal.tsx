import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { createWiki } from '~/api/wikiApi';
import { Button } from '~/components/Button';

type CreateWikiModalProps = {
  isOpen: boolean;
  close: () => void;
};

export const CreateWikiModal = ({ isOpen, close }: CreateWikiModalProps) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createWikiMutateion = useMutation(createWiki, {
    onSuccess: () => {
      queryClient.invalidateQueries(['wikis']);
    },
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const wikiData = { title, content };
    try {
      await createWikiMutateion.mutateAsync(wikiData);
      setTitle('');
      setContent('');
      close();
    } catch (error) {
      console.error('Error creating wiki:', error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => close()}
      ariaHideApp={false}
      className='bg-white rounded-md shadow-lg h-fit m-auto w-[500px] p-10 mt-20'
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <h1 className='text-center font-bold text-4xl'>위키 작성</h1>
      <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
        <div>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
            제목
          </label>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='제목을 입력하세요'
            onChange={(e) => setTitle(e.target.value)}
            className='input-css'
            required
          />
        </div>
        <div>
          <label htmlFor='content' className='block text-sm font-medium text-gray-700'>
            내용
          </label>
          <textarea
            name='content'
            value={content}
            placeholder='내용을 입력하세요'
            onChange={(e) => setContent(e.target.value)}
            className='input-css'
            rows={6}
            required
          ></textarea>
        </div>
        <div className='text-right'>
          <Button type='submit' text='위키작성' />
        </div>
      </form>
    </ReactModal>
  );
};
