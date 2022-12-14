import { form } from "../constants.js";

const modal = document.getElementById("contact_modal");

/**
 * - Changing display mode of contact modal to block
 * - Put focus on the first form input
 * - Adding tabindex attribute at -1 on every focusable 
 *   elements who aren't inside form modal {@link focusableElementsOutsideForm}
 * - Add overflow class to body to remove vertical scrollbar
 */

export const displayModal = () => {
  modal.classList.add("display-modal");

  const firstFormInput = document.querySelector("form input");
  firstFormInput.focus();

  const focusableElementsOutsideForm = document.querySelectorAll("button:not(.modal button), a, select, video");
  focusableElementsOutsideForm.forEach(element => {
    element.tabIndex = -1;
  });

  document.body.classList.add("overflow");
};

/**
 * - Changing display mode of contact modal to none
 * - Removing tabindex attribute on every focusable 
 *   elements who aren't inside form modal {@link focusableElementsOutsideForm}
 * - Resetting form inputs
 * - Remove overflow class from body to get vertical scrollbar back
 */

export const closeModal = () => {
  modal.classList.remove("display-modal");

  const focusableElementsOutsideForm = document.querySelectorAll("button:not(.modal button), a, select, video");
  focusableElementsOutsideForm.forEach(element => {
    element.removeAttribute("tabindex");
  });

  form.reset();
  document.body.classList.remove("overflow");
};
