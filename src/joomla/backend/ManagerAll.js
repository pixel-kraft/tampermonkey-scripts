// ==UserScript==
// @name         ManagerAll
// @version      0.1
// @description  Set Joomla's manager overview automaticly to to "all".
// @author       Rick & Kylian
// @match        */administrator/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const selectionBox = document.querySelector("#list_limit");
  const currentOptionBox = selectionBox.querySelector("option[selected]");
  const searchedOptionBox = selectionBox.querySelector("option[value=\"0\"]");

  if (searchedOptionBox.getAttribute('selected') == null) {
    currentOptionBox.removeAttribute("selected");
    searchedOptionBox.setAttribute("selected", "selected");

    selectionBox.form.submit();
  }
})();
