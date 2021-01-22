// ==UserScript==
// @name         PageBuilderClasses
// @version      0.1
// @description  Automaticly displays PageBuilder classes and IDs even with class/ID manager disabled.
// @author       Rick & Flotschi
// @match        */administrator/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const styles = `
  div[data-customclass]:before {
    content: '.'attr(data-customclass);
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

  div.rowck:hover:before {
    content: 'Section \\A #'attr(id);
    display: block;
    white-space: pre-wrap;
    width: auto;
    padding: 2px 6px;
    font-weight: 500;
    letter-spacing: 0.5px;
    background: #e0e0e0;
    position: absolute;
    top: 3px;
    left: 100%;
    box-sizing: border-box;
    line-height: 1.5;
    border-radius: 0px 0px 0px 0px !important;
    z-index: 91;
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
