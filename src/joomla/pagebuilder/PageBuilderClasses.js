// ==UserScript==
// @name         PageBuilderClasses
// @version      0.1
// @description  Automaticly displays PageBuilder classes even with class manager disabled.
// @author       Rick & Flotschi
// @match        */administrator/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const styles = `
  div[data-customclass]:before {
    content: attr(data-customclass);
    display: block;
    width: auto;
    padding: 2px;
    background: #FFC107;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    line-height: 1.5;
    border-radius: 0 0 5px 0!important;
    z-index: 90;
  }

  div:not(.blockck) > .inner[data-customclass] {
    padding-top: 2em!important;
  }

  .blockck > .inner[data-customclass]:before {
    background: #3AAE8E;
  }

  .rowck > .inner[data-customclass]:before {
    background: #9E9E9E;
    color: #fff;
  }
`
  const checkFor = document.querySelector('.admin.view-article');

  if (checkFor != null) {
    const styleSheet = document.createElement("style")
    styleSheet.setAttribute('type', 'text/css');
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
})();
