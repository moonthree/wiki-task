import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getAllWikis, getWiki } from '~/api/wikiApi';
import DOMPurify from 'dompurify';
import { WikiHeader } from '~/components/share/WikiHeader';
import { RelatedWikis } from './components/RelatedWikis';

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

  const linkifyWikiTitles = (content, wikis, currentWikiId) => {
    const currentWiki = wikis.find((wiki) => wiki.id === currentWikiId);
    const wikiTitles = wikis.map((wiki) => wiki.title);

    // Function to replace the matched title with a link
    const replaceWithLink = (matchedTitle) => {
      const wiki = wikis.find((wiki) => wiki.title.toLowerCase() === matchedTitle.toLowerCase());
      return `<a href="/wiki/${wiki.id}" class="text-blue-500 hover:underline">${matchedTitle}</a>`;
    };

    // Extract wiki titles from the content
    const titleRegex = new RegExp('\\b(' + wikiTitles.join('|') + ')\\b', 'gi');
    const matchedTitles = content.match(titleRegex);

    if (matchedTitles) {
      matchedTitles.forEach((matchedTitle) => {
        if (currentWiki && matchedTitle.toLowerCase() !== currentWiki.title.toLowerCase()) {
          content = content.replace(matchedTitle, replaceWithLink(matchedTitle));
        }
      });
    }

    return content;
  };

  const linkedContent = wiki && allWikis && linkifyWikiTitles(wiki.content, allWikis, id);
  const sanitizedContent = linkedContent && DOMPurify.sanitize(linkedContent);

  if (wikiLoading || allWikisLoading) return <div>로딩중</div>;
  if (wikiError || allWikisError) return <div>에러</div>;

  return (
    <div className='w-[600px] mx-auto border-2 border-brand rounded'>
      {wiki && (
        <>
          <WikiHeader title={wiki.title} buttonText={'수정'} />
          <div className='p-3' dangerouslySetInnerHTML={{ __html: linkedContent }}></div>
          <RelatedWikis currentWikiId={wiki.id} currentWikiTitle={wiki.title} />
        </>
      )}
    </div>
  );
};

// dangerouslySetInnerHTML : xss 공격에 취약하므로, 사용시 주의해야함
// dompurify 라이브러리를 사용하여 xss 공격을 방어할 수 있음
