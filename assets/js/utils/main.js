import { setBaseUrl } from "./urlUtils.js";
import { loadHeader } from "../components/common/header.js";
import { loadFooter } from "../components/common/footer.js";
import { topButton } from "../components/common/topButton.js";

export const initializeWeb = () => {
  setBaseUrl();
  loadHeader();
  loadFooter();
  topButton();
};
