import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { createWiki } from '~/api/wikiApi';

type WikiEditorModalProps = {
  purpose: '작성' | '수정';
  isOpen: boolean;
  close: () => void;
  id?: string;
  title?: string;
  content?: string;
};

export const WikiEditorModal = ({
  purpose,
  isOpen,
  close,
  id,
  title,
  content,
}: WikiEditorModalProps) => {
  const [newtitle, setTitle] = useState(title ? title : '');
  const [newcontent, setContent] = useState(content ? content : '');

  const createWikiMutation = useMutation(createWiki);
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(id);
    const wikiData = { title: newtitle, content: newcontent };
    try {
      const createdWiki = await createWikiMutation.mutateAsync(wikiData);
      console.log('Created Wiki:', createdWiki);
      close();
    } catch (error) {
      console.error('Error creating wiki:', error);
    }
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => close()}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            maxWidth: '600px',
            margin: 'auto',
            padding: '20px',
          },
        }}
      >
        <h2>{purpose === '작성' ? '작성' : '수정'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'>제목</label>
          <input
            type='text'
            required
            className='border-2'
            placeholder='제목을 입력해주세요.'
            value={newtitle}
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <label htmlFor='content'>내용</label>
          <textarea
            required
            className='border-2'
            placeholder='내용을 입력해주세요'
            value={newcontent}
            onChange={(event) => setContent(event.target.value)}
          />
          <br />
          <button type='submit'>저장</button>
          <button onClick={close} type='button'>
            취소
          </button>
        </form>
      </ReactModal>
    </div>
  );
};
