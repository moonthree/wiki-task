import axios from 'axios';

const MOCK_URL = 'http://localhost:5000';

const mockApi = axios.create({ baseURL: MOCK_URL });

export { mockApi };
