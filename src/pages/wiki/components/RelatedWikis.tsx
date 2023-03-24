import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAllWikis } from '~/api/wikiApi';
import { Spinner } from '~/components/Spinner';

type RelatedWikisProps = {
  currentWikiId: string;
  currentWikiTitle: string;
};

export const RelatedWikis = ({ currentWikiId, currentWikiTitle }: RelatedWikisProps) => {
  const { data: allWikis, isLoading, error } = useQuery(['allWikis'], () => getAllWikis());

  const relatedWikis = allWikis?.filter((wiki) => {
    const words = wiki.content.toLowerCase().split(' ');
    if (wiki.id !== currentWikiId && words.includes(currentWikiTitle.toLowerCase())) {
      return wiki;
    }
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>에러</div>;

  return (
    <div className='p-3 mt-5 border-t-2 border-brand'>
      <h3 className='mb-3 text-lg font-bold'>관련된 위키 페이지</h3>
      {relatedWikis && relatedWikis.length > 0 ? (
        relatedWikis.map((wiki) => (
          <Link
            to={`/wiki/${wiki.id}`}
            key={wiki.id}
            className='block p-3 m-3 overflow-hidden border-2 rounded border-brand hover:cursor-pointer hover:bg-slate-300 whitespace-nowrap overflow-ellipsis'
          >
            {wiki.title}
          </Link>
        ))
      ) : (
        <div>관련된 위키 페이지를 찾을 수 없습니다.</div>
      )}
    </div>
  );
};
