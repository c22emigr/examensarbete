// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-03-25
// @description  try to take over the world!
// @author       You
// @match        http://localhost
// @match        http://localhost/examensarbete/mongodbconnect.php
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

// Lista över sökord
const noun = ["Agilent Technologies, Inc. (A)", "American Airlines Group Inc", "Apple Inc", "AbbVie Inc", "Airbnb Inc", "Abbott Laboratories", "Arch Capital Group Ltd", "Accenture Plc", "Adobe Inc", "Analog Devices Inc", "Archer-Daniels-Midland Co", "Automatic Data Processing Inc", "Autodesk Inc", "Ameren Corp", "American Electric Power Company Inc", "AES Corp", "Aflac Inc", "American International Group Inc", "Assurant Inc", "Arthur J. Gallagher & Co.", "Akamai Technologies, Inc.", "Albemarle Corp", "Align Technology, Inc.", "Allstate Corp", "Allegion PLC", "Applied Materials Inc", "Amcor PLC", "Advanced Micro Devices Inc", "Ametek Inc", "Amgen Inc", "Ameriprise Financial, Inc.", "American Tower Corp", "Amazon.com Inc", "Arista Networks Inc", "ANSYS Inc", "Aon PLC", "A O Smith Corp", "APA Corp (US)", "Air Products and Chemicals Inc", "Amphenol Corp", "Aptiv PLC", "Alexandria Real Estate Equities Inc", "ASML Holding NV", "Atmos Energy Corp", "AvalonBay Communities Inc", "Broadcom Inc", "Avery Dennison Corp", "American Water Works Company Inc", "Axon Enterprise Inc", "American Express Co", "AstraZeneca PLC", "Autozone Inc", "Boeing Co", "Bank of America Corp", "Ball Corp", "Baxter International Inc", "Bath & Body Works Inc", "Best Buy Co Inc", "Becton Dickinson and Co", "Franklin Resources Inc", "Brown-Forman Corp Class B", "Bunge Global SA", "Biogen Inc", "Bio-Rad Laboratories, Inc. Class A Common Stock", "Bank of New York Mellon Corp", "Booking Holdings Inc", "Baker Hughes Co", "Builders FirstSource, Inc.", "BlackRock Inc", "Bristol-Myers Squibb Co", "Broadridge Financial Solutions Inc", "Berkshire Hathaway Inc Class B", "Brown & Brown Inc", "Boston Scientific Corp", "BorgWarner Inc", "Blackstone Inc", "BXP Inc", "Citigroup Inc", "Conagra Brands Inc", "Cardinal Health Inc", "Carrier Global Corp", "Caterpillar Inc", "Chubb Ltd", "Cboe Global Markets Inc", "CBRE Group Inc", "Coca-Cola Europacific Partners PLC", "Crown Castle Inc", "State Street Corp", "Seagate Technology Holdings PLC", "Constellation Brands Inc", "Stanley Black & Decker Inc", "Skyworks Solutions Inc", "Synchrony Financial", "Stryker Corp", "Sysco Corp", "AT&T Inc", "Molson Coors Beverage Co Class B", "TransDigm Group Inc", "Teledyne Technologies Inc", "Atlassian Corp", "BIO-TECHNE Corp", "TE Connectivity PLC", "Teradyne Inc", "Truist Financial Corp", "Teleflex Inc", "Target Corp", "TJX Companies Inc", "Thermo Fisher Scientific Inc", "T-Mobile Us Inc", "Tapestry Inc", "Targa Resources Corp", "Trimble Inc", "T Rowe Price Group Inc", "Travelers Companies Inc", "Tractor Supply Co", "Tesla Inc", "Tyson Foods Inc", "Trane Technologies PLC", "Trade Desk Inc", "TAKE-TWO INTERACTIVE SOFTWARE, INC Common Stock", "Texas Instruments Inc", "Textron Inc", "Tyler Technologies Inc", "United Airlines Holdings Inc", "Uber Technologies Inc", "UDR Inc", "Universal Health Services Inc", "Ulta Beauty, Inc.", "UnitedHealth Group Inc", "Union Pacific Corp", "United Parcel Service Inc", "United Rentals, Inc.", "US Bancorp", "Visa Inc", "VF Corp", "VICI Properties Inc", "Valero Energy Corporation", "Vulcan Materials Company", "Verisk Analytics, Inc.", "VeriSign, Inc", "Vertex Pharmaceuticals Inc", "Ventas Inc", "Viatris Inc", "Verizon Communications Inc", "Westinghouse Air Brake Technologies Corp", "Waters Corp", "Walgreens Boots Alliance Inc", "Warner Bros Discovery Inc", "Workday Inc", "Western Digital Corp", "WEC Energy Group Inc", "Welltower Inc", "Wells Fargo & Co", "Whirlpool Corp", "Waste Management Inc", "Williams Companies Inc", "Walmart Inc", "W R Berkley Corp", "WRKR Ltd", "West Pharmaceutical Services Inc", "Willis Towers Watson PLC", "Weyerhaeuser Co", "Wynn Resorts, Limited", "Xcel Energy Inc", "Exxon Mobil Corp", "DENTSPLY SIRONA Inc", "Xylem Inc", "Yum! Brands Inc", "Zimmer Biomet Holdings Inc", "Zebra Technologies Corp", "Zions Bancorporation NA", "Zscaler Inc", "Zoetis Inc"];

(function() {
    'use strict';

    let iterations = 10;
    let check = 0;
    let stockdata = localStorage.getItem("stockdata") || "";

    localStorage.removeItem("oldVal");

    window.addEventListener('load', function() {
        let counter = parseInt(localStorage.getItem("counter")) || 0;
        console.log(counter);

        if (check === 1){
            let measurement = performance.now(); // tiden mäts
            let old = parseInt(localStorage.getItem("oldVal")) || 0;
            let delta = Math.round(measurement - old);
            localStorage.setItem("oldVal", measurement);
            check = 0;
            localStorage.setItem("check", check);
        }

        if (counter === 10){
            localStorage.setItem("counter", 0); // Vanliga countern börjar om efter 10
            // Provade konvertera till blob för att få nedladdning att fungera
             var blob = new Blob([stockdata], { type: "text/csv;charset=utf-8;" });
             var link = document.createElement("a");
             var url = URL.createObjectURL(blob);

             // Skapar länk för nedladdningen
             link.setAttribute("href", url);
             link.setAttribute("download", "measurement_aktiedata.csv");
             document.body.appendChild(link);

             setTimeout(function(){
             // Laddar ner
             link.click();

             // Tar bort den osynliga länken efter nedladdning
             document.body.removeChild(link);
             URL.revokeObjectURL(url);

             //localStorage.removeItem(counter);
             }, 300 );

        }

        if(counter < iterations) {
            counter++;
            localStorage.setItem("counter", counter); // Counter-värde sparas till localstorage

                let search = noun[counter - 1];
                let searchField = document.getElementById('stocksearch');
                console.log("stocksearch");
                if (searchField) {
                    searchField.value = search; // Sökterm
                    localStorage.setItem("search", search); // Spara sökterm i local storage
                }

                setTimeout(function() {
                    let form = document.getElementById("searchform");
                    check++;
                    localStorage.setItem("check", check);
                    let measurement = performance.now();
                    let old = parseInt(localStorage.getItem("oldVal")) || 0;
                    if (form) {
                        form.submit();
                        console.log(search);
                        let delta = Math.round(measurement - old);
                        stockdata += delta + ',' + search + "\n"; // innehållet för str
                        localStorage.setItem("stockdata", stockdata);
                    } else {
                        console.error('Search did not work');
                    }

                }, 100); // Delay

        }else{
            return;
        }
    });
})();