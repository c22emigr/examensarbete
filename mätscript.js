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

function mulberry32(seed) {
    return function() {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
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
const noun = ["Agilent Technologies, Inc. (A)", "American Airlines Group Inc", "Apple Inc", "AbbVie Inc", "Airbnb Inc", "Abbott Laboratories", "Arch Capital Group Ltd", "Accenture Plc", "Adobe Inc", "Analog Devices Inc", "Archer-Daniels-Midland Co", "Automatic Data Processing Inc", "Autodesk Inc", "Ameren Corp", "American Electric Power Company Inc", "AES Corp", "Aflac Inc", "American International Group Inc", "Assurant Inc", "Arthur J. Gallagher & Co.", "Akamai Technologies, Inc.", "Albemarle Corp", "Align Technology, Inc.", "Allstate Corp", "Allegion PLC", "Applied Materials Inc", "Amcor PLC", "Advanced Micro Devices Inc", "Ametek Inc", "Amgen Inc", "Ameriprise Financial, Inc.", "American Tower Corp", "Amazon.com Inc", "Arista Networks Inc", "ANSYS Inc", "Aon PLC", "A O Smith Corp", "APA Corp (US)", "Air Products and Chemicals Inc", "Amphenol Corp", "Aptiv PLC", "Alexandria Real Estate Equities Inc", "ASML Holding NV", "Atmos Energy Corp", "AvalonBay Communities Inc", "Broadcom Inc", "Avery Dennison Corp", "American Water Works Company Inc", "Axon Enterprise Inc", "American Express Co", "AstraZeneca PLC", "Autozone Inc", "Boeing Co", "Bank of America Corp", "Ball Corp", "Baxter International Inc", "Bath & Body Works Inc", "Best Buy Co Inc", "Becton Dickinson and Co", "Franklin Resources Inc", "Brown-Forman Corp Class B", "Bunge Global SA", "Biogen Inc", "Bio-Rad Laboratories, Inc. Class A Common Stock", "Bank of New York Mellon Corp", "Booking Holdings Inc", "Baker Hughes Co", "Builders FirstSource, Inc.", "BlackRock Inc", "Bristol-Myers Squibb Co", "Broadridge Financial Solutions Inc", "Berkshire Hathaway Inc Class B", "Brown & Brown Inc", "Boston Scientific Corp", "BorgWarner Inc", "Blackstone Inc", "BXP Inc", "Citigroup Inc", "Conagra Brands Inc", "Cardinal Health Inc", "Carrier Global Corp", "Caterpillar Inc", "Chubb Ltd", "Cboe Global Markets Inc", "CBRE Group Inc", "Coca-Cola Europacific Partners PLC", "Crown Castle Inc", "State Street Corp", "Seagate Technology Holdings PLC", "Constellation Brands Inc", "Stanley Black & Decker Inc", "Skyworks Solutions Inc", "Synchrony Financial", "Stryker Corp", "Sysco Corp", "AT&T Inc", "Molson Coors Beverage Co Class B", "TransDigm Group Inc", "Teledyne Technologies Inc", "Atlassian Corp", "BIO-TECHNE Corp", "TE Connectivity PLC", "Teradyne Inc", "Truist Financial Corp", "Teleflex Inc", "Target Corp", "TJX Companies Inc", "Thermo Fisher Scientific Inc", "T-Mobile Us Inc", "Tapestry Inc", "Targa Resources Corp", "Trimble Inc", "T Rowe Price Group Inc", "Travelers Companies Inc", "Tractor Supply Co", "Tesla Inc", "Tyson Foods Inc", "Trane Technologies PLC", "Trade Desk Inc", "TAKE-TWO INTERACTIVE SOFTWARE, INC Common Stock", "Texas Instruments Inc", "Textron Inc", "Tyler Technologies Inc", "United Airlines Holdings Inc", "Uber Technologies Inc", "UDR Inc", "Universal Health Services Inc", "Ulta Beauty, Inc.", "UnitedHealth Group Inc", "Union Pacific Corp", "United Parcel Service Inc", "United Rentals, Inc.", "US Bancorp", "Visa Inc", "VF Corp", "VICI Properties Inc", "Valero Energy Corporation", "Vulcan Materials Company", "Verisk Analytics, Inc.", "VeriSign, Inc", "Vertex Pharmaceuticals Inc", "Ventas Inc", "Viatris Inc", "Verizon Communications Inc", "Westinghouse Air Brake Technologies Corp", "Waters Corp", "Walgreens Boots Alliance Inc", "Warner Bros Discovery Inc", "Workday Inc", "Western Digital Corp", "WEC Energy Group Inc", "Welltower Inc", "Wells Fargo & Co", "Whirlpool Corp", "Waste Management Inc", "Williams Companies Inc", "Walmart Inc", "W R Berkley Corp", "WRKR Ltd", "West Pharmaceutical Services Inc", "Willis Towers Watson PLC", "Weyerhaeuser Co", "Wynn Resorts, Limited", "Xcel Energy Inc", "Exxon Mobil Corp", "DENTSPLY SIRONA Inc", "Xylem Inc", "Yum! Brands Inc", "Zimmer Biomet Holdings Inc", "Zebra Technologies Corp", "Zions Bancorporation NA", "Zscaler Inc", "Zoetis Inc"];
const seed = 22222;
let iterations = 10;

(function() {
    'use strict';

    window.addEventListener("load", () => {
    let counter = parseInt(localStorage.getItem("counter")) || 0;
    let ordning = JSON.parse(localStorage.getItem("ordning") || null);
    if (!ordning) {
        ordning = shuffleArray(noun, seed);
        localStorage.setItem("ordning", JSON.stringify(ordning));
    }

    let stockdata = localStorage.getItem("stockdata") || "";
    let oldVal = parseFloat(localStorage.getItem("oldVal"));
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
        return;
    }


    if (oldVal && previousSearch) {
        const img = document.querySelector("img.pricehistory");
        let handled = false;

        function finishMeasurement() {
            if (handled) return;
            handled = true;

            const measurement = performance.now();
            const delta = Math.round(measurement - oldVal);
            stockdata += `${delta},${previousSearch}`;

            localStorage.setItem("stockdata", stockdata);
            localStorage.setItem("counter", counter + 1);
            localStorage.removeItem("oldVal");
            localStorage.removeItem("search");

            console.log(`Mätning: ${previousSearch} = ${oldVal}`);
            setTimeout(() => location.reload(), 100);
        }

        if (img) {
            if (img.complete) {
                finishMeasurement("(img.complete)");
            } else {
                img.onload = () => finishMeasurement("(img.onload)");
            }
            setTimeout(() => finishMeasurement("(timeout)"), imageTimeout);
        } else {
            console.warn("Ingen bild hittad");
            finishMeasurement();
        }
        return;
    }

    const search = ordning[counter];
    const searchField = document.getElementById('stocksearch');
    const form = document.getElementById('searchform');

    if (searchField && form) {
        searchField.value = search;
        localStorage.setItem("search", search);
        localStorage.setItem("oldVal", performance.now());
        form.submit();
    }
});
})();
