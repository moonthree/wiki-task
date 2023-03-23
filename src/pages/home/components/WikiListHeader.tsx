import React from 'react';

export const WikiListHeader = () => {
  return (
    <div className='flex items-center justify-between p-5 border-b-2 border-brand'>
      <div>WikiList</div>
      <button
        type='button'
        className='px-3 py-2 border-2 rounded border-brand hover:text-white hover:bg-brand'
      >
        +
      </button>
    </div>
  );
};
