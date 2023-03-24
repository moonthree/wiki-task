import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWikiList } from '~/api/wikiApi';
import ReactPaginate from 'react-paginate';
import { WikiResponse } from '~/types/sharedTypes';
import { Link } from 'react-router-dom';

export const WikiList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: { wikis, totalPages } = {},
    isLoading,
    error,
  } = useQuery<WikiResponse>(['wikis', currentPage + 1], () => getWikiList(currentPage + 1));

  const handlePageClick = (data: { selected: React.SetStateAction<number> }) => {
    setCurrentPage(data.selected);
  };

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;

  return (
    <div className='p-3'>
      <div className='h-[320px]'>
        {!wikis && <div>작성된 wiki가 없습니다.</div>}
        {wikis &&
          wikis.map((wiki) => (
            <Link
              to={`/wiki/${wiki.id}`}
              key={wiki.id}
              className='block p-3 m-3 overflow-hidden border-2 rounded border-brand hover:cursor-pointer hover:bg-slate-300 whitespace-nowrap overflow-ellipsis'
            >
              {wiki.title}
            </Link>
          ))}
      </div>
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        breakLabel={'...'}
        pageCount={totalPages ? totalPages : 0}
        pageRangeDisplayed={5}
        containerClassName={'flex justify-center space-x-3 mt-3'}
        activeClassName={'text-red-500'}
        onPageChange={handlePageClick}
        forcePage={currentPage}
      />
    </div>
  );
};
