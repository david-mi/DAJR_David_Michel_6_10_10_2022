import "../../styles/pages/photographers/index.scss";
import "../../data/types.js";
import { displayModal, closeModal } from "./form/index.js";
import { getPhotographerData } from "./getters.js";
import { displayPhotographerData } from "./display.js";
import { displayTotalLikesAndPrice } from "./likes/index.js";
import { handleSubmit, displayPhotographerNameToForm } from "../photographer/form/index.js";
import { sortCallbacks, displaySortedMedias } from "./sort/index.js";
import { form } from "./constants.js";

const sortSelectMenu = document.querySelector("select");
const contactButton = document.querySelector(".contact-button");
const closeModalButton = document.querySelector(".modal header button");

contactButton.addEventListener("click", displayModal);
closeModalButton.addEventListener("click", closeModal);
form.addEventListener("submit", handleSubmit);

/**
 * Get photographer data
 * Set document title to photographer name
 * Add listener to select sorting menu
 * Display photographer data in the dom
 * Display photographer name in the form
 * Display photographer medias data sorted by popularity in the dom
 * Display photographer daily rate and total likes in the dom
 */

const init = async () => {
  const { photographer, photographerMedias } = await getPhotographerData();
  document.title = photographer.name;
  sortSelectMenu.addEventListener("change", ({ target }) => {
    const sortOption = target.value;
    const sortCallback = sortCallbacks[sortOption];
    const sortedMedias = photographerMedias.sort(sortCallback);
    displaySortedMedias(sortedMedias);
  });
  displayPhotographerData(photographer);
  displayPhotographerNameToForm(photographer.name);
  const sortedByPopularityMedias = photographerMedias.sort(sortCallbacks.popularity);
  displaySortedMedias(sortedByPopularityMedias);
  displayTotalLikesAndPrice(photographer);
};

init();

