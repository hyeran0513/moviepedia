import { initializeWeb } from "./main.js";
import { createCard } from "../components/card/cardResult.js";
import { showLoading } from "../components/common/loader.js";

showLoading();
initializeWeb();
createCard();
