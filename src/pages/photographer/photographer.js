import { displayModal, closeModal } from "../../utils/displayForm.js";
import { getPhotographerData } from "./getters.js";
import { displayPhotographerData } from "./display.js";
import { form } from "./constants.js";
import { showStatsPriceElementInfos } from "./likes.js";
import { handleSubmit, displayPhotographerNameToForm } from "../photographer/form/index.js";
import { sortMediasBy } from "./sortMedias.js";
import "../../data/types.js";

const contactButton = document.querySelector(".contact-button");
const closeModalImg = document.querySelector(".modal header button");
const sortSelectMenu = document.querySelector("select");

contactButton.addEventListener("click", displayModal);
closeModalImg.addEventListener("click", closeModal);
form.addEventListener("submit", handleSubmit);

/**
 * Gets called on page load
 * Display photographer data in the dom
 * Display photographer name in the form
 * Display photographer medias data in the dom
 * Display showStatsPriceElementInfos in the dom
 */

const init = async () => {
  const { photographer, photographerMedias } = await getPhotographerData();
  const photographerMediaFolder = photographer.portrait.replace(/\..+/, "");
  sortSelectMenu.addEventListener("change", ({ target }) => {
    const choosenOption = target.value;
    sortMediasBy[choosenOption](photographerMedias, photographerMediaFolder);
  });
  displayPhotographerData(photographer);
  displayPhotographerNameToForm(photographer.name);
  sortMediasBy.popularity(photographerMedias, photographerMediaFolder);
  showStatsPriceElementInfos(photographer);
};

init();