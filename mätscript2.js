// ==UserScript==
// @name         2:a mätscriptet
// @namespace    http://tampermonkey.net/
// @version      2024-09-26
// @description  try to take over the world!
// @author       You
// @match        http://grupp1.cms.webug.se/index.php/component/finder/search*
// @include      http://grupp1.cms.webug.se/index.php/component/finder/search*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() { // Väntar på att sidan laddat klart
        var measurement = performance.now(); // tiden mäts
        var old = parseInt(localStorage.getItem("oldVal")) || 0;
        localStorage.setItem("oldVal", measurement);
        var delta = Math.round(measurement - old);

        var search = localStorage.getItem("search");
        var str = localStorage.getItem("theData") || '';
        str += delta + ',' + search + "\n"; // Delta är skillnaden dvs söktiden samt sökordet är med
        localStorage.setItem("theData", str);

       // alert(str); // Temporär alert för att slippa ladda ned

        var counter = parseInt(localStorage.getItem("counter")); // Hämtar counter
        var globalCounter = parseInt(localStorage.getItem("globalCounter")) || 0; // Global counter / andra räknaren


        if (counter === 75){
            globalCounter++; // Increment the global counter
            localStorage.setItem("globalCounter", globalCounter); // Global counter sparas
            localStorage.setItem("counter", 0); // Vanliga countern börjar om efter 10
        }
        // Kör X-antal mätningar innan nedladdning
        if (globalCounter === 40) { // Justera siffran här för att välja hur många sökningar som sker innan nedladdning

            // Provade konvertera till blob för att få nedladdning att fungera
            var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
            var link = document.createElement("a");
            var url = URL.createObjectURL(blob);

            // Skapar länk för nedladdningen
            link.setAttribute("href", url);
            link.setAttribute("download", "measurement_data.csv");
            document.body.appendChild(link);

            // Laddar ner
            link.click();

            // Tar bort den osynliga länken efter nedladdning
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            localStorage.setItem("globalCounter", 0); // Globala countern resettas efter nedladdning skett
            localStorage.removeItem("theData"); // Den gamla datan tas bort så att filen bara har de senaste mätningarna
        }else{ // Om nedladdning inte sker tas man tillbaka
        window.location.href = "http://grupp1.cms.webug.se/"; // Går tillbaka till föregående sida efter mätning
        }
    });
})();