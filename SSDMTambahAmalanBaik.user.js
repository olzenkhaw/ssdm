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
    randButton.textContent = 'Contoh';
    randButton.type = 'button';

    const div = document.createElement('div');
    div.innerHTML = `<p>Dari
<select id="_b_hari_mula_tk1">
    <option value="1"> 1 </option>
    <option value="2"> 2 </option>
    <option value="3"> 3 </option>
    <option value="4"> 4 </option>
    <option value="5"> 5 </option>
    <option value="6"> 6 </option>
    <option value="7"> 7 </option>
    <option value="8"> 8 </option>
    <option value="9"> 9 </option>
    <option value="10"> 10 </option>
    <option value="11"> 11 </option>
    <option value="12"> 12 </option>
    <option value="13"> 13 </option>
    <option value="14"> 14 </option>
    <option value="15"> 15 </option>
    <option value="16"> 16 </option>
    <option value="17"> 17 </option>
    <option value="18"> 18 </option>
    <option value="19"> 19 </option>
    <option value="20"> 20 </option>
    <option value="21"> 21 </option>
    <option value="22"> 22 </option>
    <option value="23"> 23 </option>
    <option value="24"> 24 </option>
    <option value="25"> 25 </option>
    <option value="26"> 26 </option>
    <option value="27"> 27 </option>
    <option value="28"> 28 </option>
    <option value="29"> 29 </option>
    <option value="30"> 30 </option>
    <option value="31"> 31 </option>
</select>
<select id="_b_bulan_mula_tk1">
    <option value="JAN"> JAN </option>
    <option value="FEB"> FEB </option>
    <option value="MAR"> MAR </option>
    <option value="APR"> APR </option>
    <option value="MAY"> MAY </option>
    <option value="JUN"> JUN </option>
    <option value="JUL"> JUL </option>
    <option value="AUG"> AUG </option>
    <option value="SEP"> SEP </option>
    <option value="OCT"> OCT </option>
    <option value="NOV"> NOV </option>
    <option value="DEC"> DEC </option>
</select> ke
<select id="_b_hari_mula_tk2">
    <option value="1"> 1 </option>
    <option value="2"> 2 </option>
    <option value="3"> 3 </option>
    <option value="4"> 4 </option>
    <option value="5"> 5 </option>
    <option value="6"> 6 </option>
    <option value="7"> 7 </option>
    <option value="8"> 8 </option>
    <option value="9"> 9 </option>
    <option value="10"> 10 </option>
    <option value="11"> 11 </option>
    <option value="12"> 12 </option>
    <option value="13"> 13 </option>
    <option value="14"> 14 </option>
    <option value="15"> 15 </option>
    <option value="16"> 16 </option>
    <option value="17"> 17 </option>
    <option value="18"> 18 </option>
    <option value="19"> 19 </option>
    <option value="20"> 20 </option>
    <option value="21"> 21 </option>
    <option value="22"> 22 </option>
    <option value="23"> 23 </option>
    <option value="24"> 24 </option>
    <option value="25"> 25 </option>
    <option value="26"> 26 </option>
    <option value="27"> 27 </option>
    <option value="28"> 28 </option>
    <option value="29"> 29 </option>
    <option value="30"> 30 </option>
    <option value="31"> 31 </option>
</select>
<select id="_b_bulan_mula_tk2">
    <option value="JAN"> JAN </option>
    <option value="FEB"> FEB </option>
    <option value="MAR"> MAR </option>
    <option value="APR"> APR </option>
    <option value="MAY"> MAY </option>
    <option value="JUN"> JUN </option>
    <option value="JUL"> JUL </option>
    <option value="AUG"> AUG </option>
    <option value="SEP"> SEP </option>
    <option value="OCT"> OCT </option>
    <option value="NOV"> NOV </option>
    <option value="DEC"> DEC </option>
</select>`;

    document.getElementsByName('Submit')[0].insertAdjacentElement('afterend', span);
    span.insertAdjacentElement('afterend', loadButton);
    loadButton.insertAdjacentElement('afterend', saveButton);
    saveButton.insertAdjacentElement('afterend', randButton);
    saveButton.addEventListener('click', saveToLocalStorage);
    loadButton.addEventListener('click', loadFromLocalStorage);
    randButton.addEventListener('click', randamalanbaik);
    document.getElementsByName('simpan_amalanbaik')[0].insertAdjacentElement('afterend', div);

    const now = new Date();
    document.getElementById('_b_hari_mula_tk2').value = now.getDate();
    document.querySelector('select[name="_b_hari_mula_tk"]').value = now.getDate();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    document.getElementById('_b_bulan_mula_tk2').value = months[now.getMonth()];
    document.querySelector('select[name="_b_bulan_mula_tk"]').value= months[now.getMonth()];
    document.getElementById('AB').value = "8";

    let hour = now.getHours();
    const minute = now.getMinutes();

    const ap = hour >= 12 ? "PM" : "AM";

    // Convert hour to 12-hour format
    hour = hour % 12;
    hour = hour === 0 ? 12 : hour; // If hour is 0 (midnight), change it to 12

    // Format hour and minute with leading zeros
    document.querySelector('select[name="jam"]').value = hour.toString().padStart(2, "0");
    document.querySelector('select[name="minit"]').value = minute.toString().padStart(2, "0");
    document.querySelector('select[name="am_pm"]').value = ap;
    document.getElementById('TEMPAT').value = "01";
    const selectedGuruValue = localStorage.getItem('papar_guru');
    if (selectedGuruValue !== null) document.getElementById('papar_guru').value = localStorage.getItem('papar_guru');
    if(!document.getElementsByName('benar')[0].checked) document.getElementsByName('benar')[0].click();
    document.getElementById('keteranganamalanbaik').focus();
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
    if(!document.getElementsByName('benar')[0].checked) document.getElementsByName('benar')[0].click();
}

function getRandomPastWeekdayWithTime() {
    const now = new Date();
    const monthtono = {"JAN":0, "FEB":1, "MAR":2, "APR":3, "MAY":4, "JUN":5, "JUL":6, "AUG":7, "SEP":8, "OCT":9, "NOV":10, "DEC":11};
    const yearStart = new Date(now.getFullYear(), monthtono[document.getElementById('_b_bulan_mula_tk1').value], parseInt(document.getElementById('_b_hari_mula_tk1').value));
    const today = new Date(now.getFullYear(), monthtono[document.getElementById('_b_bulan_mula_tk2').value], parseInt(document.getElementById('_b_hari_mula_tk2').value));
    if (today.getDay() === 6) {alert(`${today} is Saturday`);}
    else if (today.getDay() === 0) {alert(`${today} is Sunday`);}
    else if (yearStart.getDay() === 6) {alert(`${yearStart} is Saturday`);}
    else if (yearStart.getDay() === 0) {alert(`${yearStart} is Sunday`);}
    else
    {
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
    let error = -1;
    return {error,error,error,error,error};
}

function randamalanbaik()
{
    document.getElementById('AB').value = 8;
    const { day, month, year, hour, minute } = getRandomPastWeekdayWithTime();
    console.log(day,month,year,hour,minute);
    if (day) {
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
        const selectedGuruValue = localStorage.getItem('papar_guru');
        if (selectedGuruValue !== null) document.getElementById('papar_guru').value = localStorage.getItem('papar_guru');
        if(!document.getElementsByName('benar')[0].checked) document.getElementsByName('benar')[0].click();
    }
}
