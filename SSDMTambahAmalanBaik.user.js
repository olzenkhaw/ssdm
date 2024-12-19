// ==UserScript==
// @name         SSDM Tambah Amalan Baik
// @namespace    http://tampermonkey.net/
// @version      2024-12-19
// @description  try to take over the world!
// @author       You
// @match        https://ssdm.moe.gov.my/amalan_baik.cfm*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.my
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const center = document.createElement('center');
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginTop = "-70px";

    const loadButton = document.createElement('button');
    loadButton.textContent = 'Load';
    loadButton.style.marginTop = "-70px";
    loadButton.style.marginLeft = "200px";

    center.appendChild(loadButton);
    center.appendChild(saveButton);
    document.body.insertAdjacentElement('afterend', center);
    saveButton.addEventListener('click', saveToLocalStorage);
    loadButton.addEventListener('click', loadFromLocalStorage);
})();

// Save values to localStorage
function saveToLocalStorage() {
    const newValue = document.getElementById('keteranganamalanbaik').value;
    const selectedValue = document.getElementById('AB').value;
    const selectedDateValue = document.querySelector('select[name="_b_hari_mula_tk"]').value;
    const selectedMonthValue = document.querySelector('select[name="_b_bulan_mula_tk"]').value;
    const selectedJamValue = document.querySelector('select[name="jam"]').value;
    const selectedMinitValue = document.querySelector('select[name="minit"]').value;
    const selectedAPValue = document.querySelector('select[name="am_pm"]').value;
    const selectedTempatValue = document.getElementById('TEMPAT').value;
    const selectedGuruValue = document.getElementById('papar_guru').value;

    // Save each value to localStorage
    localStorage.setItem('keteranganamalanbaik', newValue);
    localStorage.setItem('AB', selectedValue);
    localStorage.setItem('_b_hari_mula_tk', selectedDateValue);
    localStorage.setItem('_b_bulan_mula_tk', selectedMonthValue);
    localStorage.setItem('jam', selectedJamValue);
    localStorage.setItem('minit', selectedMinitValue);
    localStorage.setItem('am_pm', selectedAPValue);
    localStorage.setItem('TEMPAT', selectedTempatValue);
    localStorage.setItem('papar_guru', selectedGuruValue);
}

// Load values from localStorage and populate the form
function loadFromLocalStorage() {
    const newValue = localStorage.getItem('keteranganamalanbaik');
    const selectedValue = localStorage.getItem('AB');
    const selectedDateValue = localStorage.getItem('_b_hari_mula_tk');
    const selectedMonthValue = localStorage.getItem('_b_bulan_mula_tk');
    const selectedJamValue = localStorage.getItem('jam');
    const selectedMinitValue = localStorage.getItem('minit');
    const selectedAPValue = localStorage.getItem('am_pm');
    const selectedTempatValue = localStorage.getItem('TEMPAT');
    const selectedGuruValue = localStorage.getItem('papar_guru');

    // Populate the form with the retrieved values
    if (newValue !== null) document.getElementById('keteranganamalanbaik').value = newValue;
    if (selectedValue !== null) document.getElementById('AB').value = selectedValue;
    if (selectedDateValue !== null) document.querySelector('select[name="_b_hari_mula_tk"]').value = selectedDateValue;
    if (selectedMonthValue !== null) document.querySelector('select[name="_b_bulan_mula_tk"]').value = selectedMonthValue;
    if (selectedJamValue !== null) document.querySelector('select[name="jam"]').value = selectedJamValue;
    if (selectedMinitValue !== null) document.querySelector('select[name="minit"]').value = selectedMinitValue;
    if (selectedAPValue !== null) document.querySelector('select[name="am_pm"]').value = selectedAPValue;
    if (selectedTempatValue !== null) document.getElementById('TEMPAT').value = selectedTempatValue;
    if (selectedGuruValue !== null) document.getElementById('papar_guru').value = selectedGuruValue;
}
