import { lightboxContainer, lightboxMediaContainer } from "../constants.js";

const nextMediaButton = document.querySelector(".next-media");
const previousMediaButton = document.querySelector(".previous-media");
const closeLightboxButton = document.querySelector(".close-lightbox");

nextMediaButton.addEventListener("click", () => handleMediaDisplay().next());
previousMediaButton.addEventListener("click", () => handleMediaDisplay().previous());
closeLightboxButton.addEventListener("click", handleCloseLightbox);

/**
 * Handle pressed keys to trigger next or previous media in lightbox
 * 
 * @param {KeyboardEvent} key  name of pressed key
 */

export function handleKeydown({ key }) {
  if (key === "ArrowRight") {
    handleMediaDisplay().next();
  }

  if (key === "ArrowLeft") {
    handleMediaDisplay().previous();
  }
}

/**
 * @param {HTMLElement} lightboxMediaContainer 
 * @returns {number} data-idcurrent from {@link lightboxMediaContainer} converted to number
 */

function getMediaContainerDataId(lightboxMediaContainer) {
  return Number(lightboxMediaContainer.dataset.idcurrent);
}

/**
 * Hide previous showed media in lightbox
 * 
 * @return {object} object with methods to show next or previous media from lightbox 
 */

function handleMediaDisplay() {
  const mediasInfosContainers = document.querySelectorAll(".media-infos-container");
  const mediaContainerId = getMediaContainerDataId(lightboxMediaContainer);
  mediasInfosContainers[mediaContainerId].classList.add("hide-media");

  return {

    /**
     * Decrement mediaContainer id, show the associated media
     * 
     * {@link previousId} will determine the previous wich is the media position in medias list
     * and store it in mediaContainer data-idcurrent attribute
     */

    previous() {
      const previousId = mediaContainerId === 0
        ? mediasInfosContainers.length - 1
        : mediaContainerId - 1;

      lightboxMediaContainer.dataset.idcurrent = previousId;
      mediasInfosContainers[previousId].classList.remove("hide-media");
    },

    /**
     * increment mediaContainer id, show associated media
     * 
     * {@link nextId} will determine the previous wich is the media position in medias list
     * and store it in mediaContainer data-idcurrent attribute
     */

    next() {
      const nextId = (mediaContainerId + 1) % mediasInfosContainers.length;

      lightboxMediaContainer.dataset.idcurrent = nextId;
      mediasInfosContainers[nextId].classList.remove("hide-media");
    }
  };
}

/**
 * - Hide lightbox medias
 * - Hide lightbox container 
 * - Remove keydown listener
 */

function handleCloseLightbox() {
  const mediaContainerId = getMediaContainerDataId(lightboxMediaContainer);
  const mediasInfosContainers = document.querySelectorAll(".media-infos-container");
  mediasInfosContainers[mediaContainerId].classList.add("hide-media");
  lightboxContainer.classList.add("hide-media");

  document.removeEventListener("keydown", handleKeydown);
}

