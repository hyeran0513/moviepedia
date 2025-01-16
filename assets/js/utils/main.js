import { setBaseUrl } from './url-utils.js';
import { loadHeader } from '../components/header.js';
import { loadFooter } from '../components/footer.js';

export const initializeWeb = () => {
  setBaseUrl();
  loadHeader();
  loadFooter();
};
