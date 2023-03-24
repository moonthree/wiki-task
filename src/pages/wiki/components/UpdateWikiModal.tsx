import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { getWiki, updatewiki } from '~/api/wikiApi';
import { useEffect } from 'react';
import { Button } from '~/components/Button';

type UpdateWikiModalProps = {
  isOpen: boolean;
  close: () => void;
  id: string;
};

export const UpdateWikiModal = ({ isOpen, close, id }: UpdateWikiModalProps) => {
  const queryClient = useQueryClient();

  const { data: wiki } = useQuery(['wiki', `${id}`], () => getWiki(id as string));

  const [title, setTitle] = useState(wiki?.title || '');
  const [content, setContent] = useState(wiki?.content || '');

  useEffect(() => {
    setTitle(wiki?.title || '');
    setContent(wiki?.content || '');
  }, [isOpen]);

  const updateWikiMutateion = useMutation(updatewiki, {
    onSuccess: () => {
      queryClient.invalidateQueries(['wikis']);
      queryClient.invalidateQueries(['allWikis']);
      queryClient.invalidateQueries(['wiki', `${id}`]);
    },
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await updateWikiMutateion.mutateAsync({ id, title, content });
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
      <h1 className='text-center font-bold text-4xl'>위키 수정</h1>
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
          <Button type='submit' text='위키수정' />
        </div>
      </form>
    </ReactModal>
  );
};
