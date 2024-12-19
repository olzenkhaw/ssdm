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

    let span = document.createElement('span');
    span.textContent = "\u00A0\u00A0\u00A0";
    const saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.textContent = 'Save';
    const loadButton = document.createElement('button');
    loadButton.textContent = 'Load';
    loadButton.type = 'button';
    const randButton = document.createElement('button');
    randButton.textContent = 'Random';
    randButton.type = 'button';

    document.getElementsByName('Submit')[0].insertAdjacentElement('afterend', span);
    span.insertAdjacentElement('afterend', loadButton);
    loadButton.insertAdjacentElement('afterend', saveButton);
    saveButton.insertAdjacentElement('afterend', randButton);
    saveButton.addEventListener('click', saveToLocalStorage);
    loadButton.addEventListener('click', loadFromLocalStorage);
    randButton.addEventListener('click', randamalanbaik);
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

function getRandomPastWeekdayWithTime() {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1); // January 1 of the current year
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Today's date without time

    let randomDate;
    do {
        // Generate a random date between the start of the year and today
        const randomTimestamp = yearStart.getTime() + Math.random() * (today.getTime() - yearStart.getTime());
        randomDate = new Date(randomTimestamp);
    } while (randomDate.getDay() === 0 || randomDate.getDay() === 6); // Exclude weekends (Sunday = 0, Saturday = 6)

    // Extract day, month (as abbreviation), and year
    const day = randomDate.getDate(); // Day of the month
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[randomDate.getMonth()]; // Get the month abbreviation
    const year = randomDate.getFullYear(); // Year

    // Generate random time between 8:00 AM and 11:00 aM
    let hour = Math.floor(Math.random() * 4) + 8; // Random hour between 8 and 11
    let minute = Math.floor(Math.random() * 60); // Random minute between 0 and 59

    // Format hour as two-digit 12-hour clock
    hour = hour.toString().padStart(2, '0'); // Ensure it's two digits
    minute = minute.toString().padStart(2, '0'); // Ensure it's two digits

    return { day, month, year, hour, minute }; // Return all components
}

function randamalanbaik()
{
    document.getElementById('AB').value = 8;
    const { day, month, year, hour, minute } = getRandomPastWeekdayWithTime();
    document.querySelector('select[name="_b_hari_mula_tk"]').value = day;
    document.querySelector('select[name="_b_bulan_mula_tk"]').value = month;
    document.querySelector('select[name="jam"]').value = hour;
    document.querySelector('select[name="minit"]').value = minute;
    document.querySelector('select[name="am_pm"]').value = "AM";
    document.getElementById('TEMPAT').value = "01";
    let amalanbaik = [
        "berinteraksi secara aktif dan positif",
        "berusaha secara bersungguh-sungguh",
        "menggunakan bahasa yang sopan",
        "menggalakkan suasana belajar positif",
        "memberi bantuan kepada rakan",
        "mengatur buku dengan tersusun",
        "menyediakan bahan pelajaran awal",
        "mengingatkan rakan yang lupa tugasan",
        "berkongsi sumber pembelajaran",
        "meminta maaf atas kesilapan",
        "menyokong rakan dalam aktiviti kumpulan",
        "memimpin aktiviti positif",
        "menunjukkan sikap tanggungjawab",
        "menyelesaikan konflik dengan damai",
        "memberikan pujian kepada rakan",
        "menjadi contoh dalam perkara positif",
        "membantu guru mengurus kelas",
        "menjaga perasaan rakan",
        "berusaha untuk meningkatkan diri",
        "bersikap terbuka dengan pendapat guru",
        "menghargai hasil kerja rakan",
        "berbagi pengetahuan dengan rakan",
        "menyelesaikan kerja rumah dengan baik",
        "menghormati perbezaan",
        "memberi peluang kepada rakan untuk bersuarakan pendapat",
        "berusaha memahami pelajaran yang diajarkan",
        "menghormati kepelbagaian pandangan",
        "menerima teguran dengan positif",
        "mematuhi etika penggunaan teknologi",
        "menghargai masa guru",
        "mengutamakan tanggungjawab dalam aktiviti kelas",
        "bersikap positif dalam menghadapi cabaran",
        "menghargai usaha guru",
        "berkongsi alat tulis atau alat pembelajaran dengan rakan",
        "menggunakan bahasa yang baik dan berhemah",
        "menerima tanggungjawab dalam aktiviti kelas",
        "mengutamakan keselamatan diri dan rakan",
        "bersikap empati terhadap rakan",
        "menjaga reputasi sekolah",
        "memberi galakan kepada rakan yang ketinggalan",
        "menjaga harta sekolah",
        "mengambil bahagian dalam aktiviti kokurikulum",
        "menghormati privasi rakan",
        "bersikap toleransi terhadap rakan",
        "membantu guru dalam menguruskan kelas",
        "bersyukur atas peluang pembelajaran",
        "mengambil inisiatif untuk meningkatkan diri",
        "menghormati keputusan kolektif dalam kumpulan",
        "menghargai masa orang lain",
        "berfikiran kritis dan kreatif"
    ];

    let randomIndex = Math.floor(Math.random() * amalanbaik.length);

    document.getElementById('keteranganamalanbaik').value= amalanbaik[randomIndex];
}
