import "../../data/types.js";
import { redirectToIndex } from "../../utils/redirectToIndex.js";
import { getPhotographersApiData } from "../../utils/api.js";

/**
 * Gets photographer id from url parameters and returns it as a number
 * 
 * if id is not found or contains anything different than a number, returns null
 * convert id to a number and returns it
 * @returns {number | null} photographer id
 */

const getPhotographerId = () => {
  const url = new URL(location.href);
  const photographerId = url.searchParams.get("id");

  if (/^\d+$/.test(photographerId) === false || photographerId === null) {
    throw new Error("Invalid id");
  }
  return Number(photographerId);
};

/**
 * fetch photographers file
 * get photographer id from url params
 * get photographer associated infos and medias 
 * if any error is thrown, redirects to index.html
 * 
 * @return {Promise<{
 * photographer: photographerType,
 * photographerMedias: mediaType[]
 * }>}
 */

export const getPhotographerData = async () => {
  try {
    const { media, photographers } = await getPhotographersApiData();
    const photographerId = getPhotographerId();
    const photographer = getPhotographer(photographers, photographerId);
    const photographerMedias = getPhotographerMedias(media, photographerId);
    return { photographer, photographerMedias };
  }
  catch (err) {
    console.error(err);
    redirectToIndex();
  }
};

/**
 * @param {photographerType[]} photographers 
 * @param {number} photographerId 
 * @returns {photographerType} targeted photographer
 */

const getPhotographer = (photographers, photographerId) => {
  const findPhotographer = photographers.find((photographers) => photographers.id === photographerId);
  if (findPhotographer === undefined) {
    throw new Error("Photographer not found");
  }

  return findPhotographer;
};

/**
 * @param {mediaType[]}  medias
 * @param {number} photographerId 
 * @returns {mediaType[]} medias from targeted photographerId
 */

const getPhotographerMedias = (medias, photographerId,) => {
  return medias.filter((media) => media.photographerId === photographerId);
};
