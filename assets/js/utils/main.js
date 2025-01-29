import { setBaseUrl } from "./urlUtils.js";
import { loadHeader } from "../components/common/header.js";
import { loadFooter } from "../components/common/footer.js";
import { topButton } from "../components/common/topButton.js";
import { showLoading } from "../components/common/loader.js";

export const initializeWeb = () => {
  showLoading();
  setBaseUrl();
  loadHeader();
  loadFooter();
  topButton();
};
