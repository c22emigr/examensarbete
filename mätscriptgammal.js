// ==UserScript==
// @name         Mätscript Examensarbete
// @namespace    http://tampermonkey.net/
// @version      2025-05-18
// @description  Script för att mäta söktiden för aktier i en aktieapplikation
// @author       You
// @match        http://localhost/examensarbete/mongodbconnect.php
// @include      http://localhost/examensarbete/mongodbconnect.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

// Lista över sökord
const noun = ["Agilent Technologies, Inc. (A)", "American Airlines Group Inc", "Apple Inc", "AbbVie Inc", "Airbnb Inc", "Abbott Laboratories", "Arch Capital Group Ltd", "Accenture Plc", "Adobe Inc", "Analog Devices Inc", "Archer-Daniels-Midland Co", "Automatic Data Processing Inc", "Autodesk Inc", "Ameren Corp", "American Electric Power Company Inc", "AES Corp", "Aflac Inc", "American International Group Inc", "Assurant Inc", "Arthur J. Gallagher & Co.", "Akamai Technologies, Inc.", "Albemarle Corp", "Align Technology, Inc.", "Allstate Corp", "Allegion PLC", "Applied Materials Inc", "Amcor PLC", "Advanced Micro Devices Inc", "Ametek Inc", "Amgen Inc", "Ameriprise Financial, Inc.", "American Tower Corp", "Amazon.com Inc", "Arista Networks Inc", "ANSYS Inc", "Aon PLC", "A O Smith Corp", "APA Corp (US)", "Air Products and Chemicals Inc", "Amphenol Corp", "Aptiv PLC", "Alexandria Real Estate Equities Inc", "ASML Holding NV", "Atmos Energy Corp", "AvalonBay Communities Inc", "Broadcom Inc", "Avery Dennison Corp", "American Water Works Company Inc", "Axon Enterprise Inc", "American Express Co", "AstraZeneca PLC", "Autozone Inc", "Boeing Co", "Bank of America Corp", "Ball Corp", "Baxter International Inc", "Bath & Body Works Inc", "Best Buy Co Inc", "Becton Dickinson and Co", "Franklin Resources Inc", "Brown-Forman Corp Class B", "Bunge Global SA", "Biogen Inc", "Bio-Rad Laboratories, Inc. Class A Common Stock", "Bank of New York Mellon Corp", "Booking Holdings Inc", "Baker Hughes Co", "Builders FirstSource, Inc.", "BlackRock Inc", "Bristol-Myers Squibb Co", "Broadridge Financial Solutions Inc", "Berkshire Hathaway Inc Class B", "Brown & Brown Inc", "Boston Scientific Corp", "BorgWarner Inc", "Blackstone Inc", "BXP Inc", "Citigroup Inc", "Conagra Brands Inc", "Cardinal Health Inc", "Carrier Global Corp", "Caterpillar Inc", "Chubb Ltd", "Cboe Global Markets Inc", "CBRE Group Inc", "Coca-Cola Europacific Partners PLC", "Crown Castle Inc", "State Street Corp", "Seagate Technology Holdings PLC", "Constellation Brands Inc", "Stanley Black & Decker Inc", "Skyworks Solutions Inc", "Synchrony Financial", "Stryker Corp", "Sysco Corp", "AT&T Inc", "Molson Coors Beverage Co Class B", "TransDigm Group Inc", "Teledyne Technologies Inc", "Atlassian Corp", "BIO-TECHNE Corp", "TE Connectivity PLC", "Teradyne Inc", "Truist Financial Corp", "Teleflex Inc", "Target Corp", "TJX Companies Inc", "Thermo Fisher Scientific Inc", "T-Mobile Us Inc", "Tapestry Inc", "Targa Resources Corp", "Trimble Inc", "T Rowe Price Group Inc", "Travelers Companies Inc", "Tractor Supply Co", "Tesla Inc", "Tyson Foods Inc", "Trane Technologies PLC", "Trade Desk Inc", "TAKE-TWO INTERACTIVE SOFTWARE, INC Common Stock", "Texas Instruments Inc", "Textron Inc", "Tyler Technologies Inc", "United Airlines Holdings Inc", "Uber Technologies Inc", "UDR Inc", "Universal Health Services Inc", "Ulta Beauty, Inc.", "UnitedHealth Group Inc", "Union Pacific Corp", "United Parcel Service Inc", "United Rentals, Inc.", "US Bancorp", "Visa Inc", "VF Corp", "VICI Properties Inc", "Valero Energy Corporation", "Vulcan Materials Company", "Verisk Analytics, Inc.", "VeriSign, Inc", "Vertex Pharmaceuticals Inc", "Ventas Inc", "Viatris Inc", "Verizon Communications Inc", "Westinghouse Air Brake Technologies Corp", "Waters Corp", "Walgreens Boots Alliance Inc", "Warner Bros Discovery Inc", "Workday Inc", "Western Digital Corp", "WEC Energy Group Inc", "Welltower Inc", "Wells Fargo & Co", "Whirlpool Corp", "Waste Management Inc", "Williams Companies Inc", "Walmart Inc", "W R Berkley Corp", "WRKR Ltd", "West Pharmaceutical Services Inc", "Willis Towers Watson PLC", "Weyerhaeuser Co", "Wynn Resorts, Limited", "Xcel Energy Inc", "Exxon Mobil Corp", "DENTSPLY SIRONA Inc", "Xylem Inc", "Yum! Brands Inc", "Zimmer Biomet Holdings Inc", "Zebra Technologies Corp", "Zions Bancorporation NA", "Zscaler Inc", "Zoetis Inc"];


(function() {
    'use strict';

    let iterations = 10;
    let localCounter = 1;

    localStorage.removeItem("oldVal");

    // Vänta tills sidan är helt laddad innan scriptet körs
    window.addEventListener('load', function() {

        let counter = parseInt(localStorage.getItem("counter")) || 0;

        if(counter < iterations) {
            counter++; // Öka räknaren varje gång
            localStorage.setItem("counter", counter); // Spara den nya räknaren

            for (let i = 0; i < noun.length; i++){
            let search = noun[i];

            let searchField = document.getElementById('stocksearch'); // Sök på noun från ordlistan
            if (searchField) {
                searchField.value = search;

                localStorage.setItem("searchPerformed", "true"); // Spara
                localStorage.setItem("search", search); // Spara sökterm
            }
        

            // Skicka formuläret och klicka på "Spara & Stäng" automatiskt efter en delay
            setTimeout(function() {
                let form = document.querySelector("stocksearchbutton");
                let measurement = performance.now();
                let old = parseInt(localStorage.getItem("oldVal")) || 0;
                if (form) {
                    form.submit();
                } else {
                    console.error('Search did not work');
                }
            }); // 500-millisekunders fördröjning
        }
        }else{
         // localStorage.removeItem("counter");
        }
    });
})();


// Funktion som körs efter sökning
(function() {
    'use strict';

    window.addEventListener('load', function() { // Väntar på att sidan laddat klart
        let measurement = performance.now(); // tiden mäts
        let old = parseInt(localStorage.getItem("oldVal")) || 0;
        localStorage.setItem("oldVal", measurement);
        let delta = Math.round(measurement - old);

        let search = localStorage.getItem("search");
        let str = localStorage.getItem("theData") || '';
        str += delta + ',' + search + "\n"; // Delta är skillnaden dvs söktiden samt sökordet är med
        localStorage.setItem("theData", str);

       // alert(str); // Temporär alert för att slippa ladda ned

        let counter = parseInt(localStorage.getItem("counter")); // Hämtar counter
        let globalCounter = parseInt(localStorage.getItem("globalCounter")) || 0; // Global counter / andra räknaren


        if (counter === 10){
            globalCounter++; // Increment the global counter
            localStorage.setItem("globalCounter", globalCounter); // Global counter sparas
            localStorage.setItem("counter", 0); // Vanliga countern börjar om efter 10
        }
        // Kör X-antal mätningar innan nedladdning
        if (globalCounter === 1) { // Justera siffran här för att välja hur många sökningar som sker innan nedladdning

            // Provade konvertera till blob för att få nedladdning att fungera
            var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
            var link = document.createElement("a");
            var url = URL.createObjectURL(blob);

            // Skapar länk för nedladdningen
            link.setAttribute("href", url);
            link.setAttribute("download", "measurement_aktiedata.csv");
            document.body.appendChild(link);

            // Laddar ner
            link.click();

            // Tar bort den osynliga länken efter nedladdning
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            localStorage.setItem("globalCounter", 0); // Globala countern resettas efter nedladdning skett
            localStorage.removeItem("theData"); // Den gamla datan tas bort så att filen bara har de senaste mätningarna
        }else{ // Om nedladdning inte sker tas man tillbaka
        window.location.href = "http://localhost/examensarbete/mongodbconnect.php"; // Går tillbaka till föregående sida efter mätning
        }
    });
})();