// ==UserScript==
// @name         RsForm PageSelector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display Page Selection for rsform. Skipping validation.
// @author       Flotschi
// @include      *
// @grant        none
// ==/UserScript==

(() => {
  if (typeof rsfp_changePage === 'undefined') return;

  const rsform = document.querySelector(['[id^=rsform_progress]']).parentElement;

  if (!rsform) return;

  const formId = (() => {
    const formData = new FormData(rsform);
    return formData.get('form[formId]');
  })();
  const pageCount = rsform.querySelectorAll('fieldset').length;

  rsform.prepend((() => {
    const selector = document.createElement('select');
    selector.onchange = () => {
      rsfp_changePage(formId, selector.value, pageCount, 0);
    }
    for (var i = 0; i < pageCount; i++) {
      selector.appendChild((() => {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = `Seite ${i + 1}`;
        return option;
      })());
    }
    return selector;
  })());
})()
