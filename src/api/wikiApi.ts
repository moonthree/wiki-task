import { wiki, wikiData, WikiResponse } from './../types/sharedTypes';
import { mockApi } from './axoisConfig';

const getWikiList = async (page = 1): Promise<WikiResponse> => {
  const itemsPerPage = 5;
  const response = await mockApi.get(
    `/wikis?_page=${page}&_limit=${itemsPerPage}&_sort=id&_order=desc`,
  );
  const totalCount = parseInt(response.headers['x-total-count']);
  return {
    wikis: response.data,
    totalPages: Math.ceil(totalCount / itemsPerPage),
  };
};

const getWiki = async (id: string): Promise<wiki> => {
  const response = await mockApi.get(`/wikis/${id}`);
  return response.data;
};

const getAllWikis = async (): Promise<wiki[]> => {
  const response = await mockApi.get('/wikis');
  return response.data;
};

const createWiki = async (wiki: wikiData) => {
  const response = await mockApi.post('/wikis', wiki);
  return response.data;
};

const updatewiki = async (data: wiki) => {
  const wikiData = { title: data.title, content: data.content };
  const response = await mockApi.put(`/wikis/${data.id}`, wikiData);
  return response.data;
};

export { getWikiList, getWiki, getAllWikis, createWiki, updatewiki };
