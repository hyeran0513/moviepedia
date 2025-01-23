import { setBaseUrl } from "./url-utils.js";
import { loadHeader } from "../components/common/header.js";
import { loadFooter } from "../components/common/footer.js";

export const initializeWeb = () => {
  setBaseUrl();
  loadHeader();
  loadFooter();
};
