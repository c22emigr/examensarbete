// ==UserScript==
// @name         20202020
// @namespace    http://tampermonkey.net/
// @version      2025-04-14
// @description  try to take over the world!
// @author       You
// @match        http://localhost/examensarbete/mongodbconnect.php
// @match        http://localhost/examensarbete/mariadbconnect.php
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

function mulberry32(seed) {
    return function () {
        let t = seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t ^ 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

function shuffleArray(array, seed) {
    const random = mulberry32(seed);
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Lista över sökord
const noun = ["Agilent Technologies, Inc. (A)", "American Airlines Group Inc", "Apple Inc", "AbbVie Inc", "Airbnb Inc", "Abbott Laboratories", "Arch Capital Group Ltd", "Accenture Plc", "Adobe Inc", "Analog Devices Inc"];
const seed = 22222;
const iterations = 1036;

(function () {
    'use strict';

    window.addEventListener("load", () => {
        let counter = parseInt(localStorage.getItem("counter")) || 0;
        let ordning = JSON.parse(localStorage.getItem("ordning") || "null");
        
        if (!ordning || ordning.length !== noun.length) { // Ny ordning om den inte finns.
            ordning = shuffleArray(noun, seed);
            localStorage.setItem("ordning", JSON.stringify(ordning));
        }

        let stockdata = localStorage.getItem("stockdata") || "";
        let oldVal = parseInt(localStorage.getItem("oldVal"));
        let previousSearch = localStorage.getItem("search");

        if (counter >= iterations) {
            const blob = new Blob([stockdata], { type: "text/csv;charset=utf-8;" });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);

            link.setAttribute("href", url);
            link.setAttribute("download", "measurement_aktiedata.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Efter mätning clean up
            localStorage.removeItem("stockdata");
            localStorage.removeItem("counter");
            localStorage.removeItem("ordning");

            return;
        }

        if (oldVal && previousSearch) {
            const measurement = Date.now();
            const delta = measurement - oldVal;
            stockdata += `${delta},${previousSearch}\n`;

            localStorage.setItem("stockdata", stockdata);
            localStorage.setItem("counter", counter + 1);
            localStorage.removeItem("oldVal");
            localStorage.removeItem("search");

            console.log(`Mätning för "${previousSearch}": ${delta} ms`);
            setTimeout(() => location.reload(), 50);
            return;
        }

        const search = ordning[counter % ordning.length];
        const searchField = document.getElementById('stocksearch');
        const form = document.getElementById('searchform');

        if (searchField && form) {
            searchField.value = search;
            localStorage.setItem("search", search);
            localStorage.setItem("oldVal", Date.now());
            form.submit();
        }
    });
})();
