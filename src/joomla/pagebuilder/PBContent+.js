// ==UserScript==
// @name         PBContent+
// @version      0.2
// @description  Adds quality of life additions to PageBuilder for a better workflow.
// @author       pixel-devs
// @match        */administrator/*
// @downloadURL  https://raw.githubusercontent.com/pixel-kraft/tampermonkey-scripts/master/src/joomla/pagebuilder/PBContent%2B.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const styles = `
  header h1.page-title {
    font-size: 14px;
    width: auto;
    border-bottom: none;
  }

  header h1.page-title span.icon-stack {
    display: inline-block;
    background: none;
  }

  .mceBranding {
    display: none!important;
  }

  body {
    position: initial;
  }

  .cktype.ckinlineeditable .inner {
    padding: 8px;
  }

  div[data-customclass]:before, a[data-customclass]:before {
    content: '.'attr(data-customclass);
    display: block !important;
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
    font-size: 13px;
    transition: all 0.1s linear;
    pointer-events: none;
  }

  div[data-customclass]:hover:before, a[data-customclass]:hover:before {
    opacity: 0.2;
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

  .cktype.ckinlineeditable {
    border: solid 1px #FFC107;
    margin: 2px;
    border-radius: 5px;
  }

  .blockck {
    border: solid 1px #3AAE8E;
    margin: 2px;
    border-radius: 5px;
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

  .rowck {
    border: solid 1px #ccc!important;
    margin: 5px 0;
    border-radius: 5px;
  }
  
  .ckcolwidthedition {
    background: #ffffffcf!important;
  }

  .workspaceck:not(.ckiscontenttype) .rowck:hover, .workspaceck .rowck.ckfocus {
	border: 1px dashed #57a2ed!important;
  }
`
  const checkFor = document.querySelector('.admin.view-article, .admin.view-module');

  if (checkFor != null) {
    const styleSheet = document.createElement("style")
    styleSheet.setAttribute('type', 'text/css');
    styleSheet.innerText = styles
    document.head.appendChild(styleSheet)
  }
})();
