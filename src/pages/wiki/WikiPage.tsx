import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAllWikis, getWiki } from '~/api/wikiApi';
import { RelatedWikis } from './components/RelatedWikis';
import { WikiPageHeader } from './components/WikiPageHeader';
import { Spinner } from '~/components/Spinner';
import { Link } from 'react-router-dom';

export const WikiPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: wiki,
    isLoading: wikiLoading,
    error: wikiError,
  } = useQuery(['wiki', id], () => getWiki(id as string));
  const {
    data: allWikis,
    isLoading: allWikisLoading,
    error: allWikisError,
  } = useQuery(['allWikis'], () => getAllWikis());

  const getLinkedContent = (content: string) => {
    const words = content.split(' ');
    return words.map((word, i) => {
      const found = allWikis?.find((item) => item.title.toLowerCase() === word.toLowerCase());
      if (found && found.id !== wiki?.id) {
        return (
          <Link to={`/wiki/${found.id}`} key={i} className='text-blue-500 font-bold underline'>
            {word}{' '}
          </Link>
        );
      } else {
        return <span key={i}>{word} </span>;
      }
    });
  };

  if (wikiLoading || allWikisLoading) return <Spinner />;
  if (wikiError || allWikisError) return <div>에러</div>;
  return (
    <div className='w-[600px] mx-auto border-2 border-brand rounded'>
      {wiki && (
        <>
          <WikiPageHeader title={wiki.title} id={wiki.id} content={wiki.content} />
          <div className='p-3'>{getLinkedContent(wiki.content)}</div>
          <RelatedWikis currentWikiId={wiki.id} currentWikiTitle={wiki.title} />
        </>
      )}
    </div>
  );
};
