// ==UserScript==
// @name         Batch Import Mailboxes to Plesk (Styled + Removable)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Adds a modal form to batch import mailboxes into Plesk
// @match        */modules/site-import/index.php/mail-migration/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/pixel-kraft/tampermonkey-scripts/master/src/plesk/batch_mail_import.js
// ==/UserScript==

(function () {
  'use strict';

  const importBtn = document.querySelector('#import-mailbox');
  if (!importBtn) {
    console.warn('Batch Import script: #import-mailbox not found.');
    return;
  }

  const triggerBtn = document.createElement('button');
  triggerBtn.textContent = 'Batch Import Mailboxes';
  triggerBtn.className = 's-btn';
  triggerBtn.style.marginLeft = '10px';
  triggerBtn.onclick = () => dialog.showModal();
  importBtn.after(triggerBtn);

  const dialog = document.createElement('dialog');
  dialog.style.padding = '20px';
  dialog.style.maxWidth = '900px';

  dialog.innerHTML = `
    <form method="dialog" id="mailbox-form">
      <h3>Batch Import Mailboxes</h3>
      <div id="accounts"></div>
      <button type="button" class="btn" id="add-account">+ Weiteres Konto hinzufügen</button>
      <hr style="margin: 15px 0;" />
      <button type="submit" class="btn s-btn--primary">Absenden</button>
      <button type="button" class="btn" id="cancel-btn">Abbrechen</button>
    </form>
  `;

  document.body.appendChild(dialog);

  const accountsDiv = dialog.querySelector('#accounts');
  const addBtn = dialog.querySelector('#add-account');
  const cancelBtn = dialog.querySelector('#cancel-btn');
  const form = dialog.querySelector('#mailbox-form');

  function createAccountFields() {
    const wrapper = document.createElement('div');
    wrapper.className = 'account-entry';
    wrapper.style = 'margin-bottom: 10px; display: flex; gap: 5px; align-items: flex-end;';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.type = 'button';
    removeBtn.className = 'btn';
    removeBtn.onclick = () => wrapper.remove();

    ['username', 'password', 'email', 'imap_host'].forEach(field => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      label.style = 'font-size: .75em;';
      label.innerHTML = field;
      input.name = field;
      input.placeholder = field;
      input.required = true;
      input.className = 's-input'; // optional, if Plesk uses s-input

      const formControl = document.createElement('div');

      formControl.style = 'display: inline-flex; flex-direction: column;';
      formControl.appendChild(label);
      formControl.appendChild(input);
      wrapper.appendChild(formControl);
    });

    wrapper.appendChild(removeBtn);
    return wrapper;
  }

  addBtn.onclick = (e) => {
    e.preventDefault();
    accountsDiv.appendChild(createAccountFields());
  };

  cancelBtn.onclick = () => dialog.close();

  form.onsubmit = (e) => {
    e.preventDefault();
    const url = new URL(window.location);
    const site_id = url.searchParams.get('site_id');

    const accounts = Array.from(accountsDiv.querySelectorAll('.account-entry')).map(entry => {
      const sourceEmail = entry.querySelector('[name="username"]').value;
      const sourcePassword = entry.querySelector('[name="password"]').value;
      const imapHost = entry.querySelector('[name="imap_host"]').value;
      const targetEmail = entry.querySelector('[name="email"]').value;

      return {
        sourceEmail,
        sourcePassword,
        targetMailname: targetEmail.split('@').at(0),
        targetPassword: sourcePassword,
        imapHost,
        existingMailbox: false,
        imapPort: "",
        imapEncryption: "auto",
        imapFolderSeparator: "",
        imapTimeout: "30",
        ignoreSecurityWarnings: false,
      };
    });

    fetch(`${url.origin}/modules/site-import/index.php/mail-migration/add-tasks/site_id/${site_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accounts }),
    })
      .then(res => res.json())
      .then(data => {
        alert('Success: ' + JSON.stringify(data));
        dialog.close();
        accountsDiv.innerHTML = '';
      })
      .catch(err => alert('Error: ' + err));
  };

  // Add first entry on load
  accountsDiv.appendChild(createAccountFields());
})();
