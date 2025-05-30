// ==UserScript==
// @name         Mätscript med korrekt bildrendering
// @namespace    http://tampermonkey.net/
// @version      2025-05-19
// @description  Väntar på att bilden verkligen syns innan nästa mätning
// @author       You
// @run-at       document-idle
// @include      *localhost*
// @match        http://localhost/examensarbete/mariadbconnect.php
// @match        http://localhost/examensarbete/mongodbconnect.php
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

function waitForStockImage(timeout = 3000) {
    return new Promise(resolve => {
        const startTime = Date.now();

        function check() {
            const img = document.getElementById('stock-image');
            if (
                img &&
                img.naturalHeight > 0 &&
                img.complete &&
                img.offsetHeight > 0
            ) {
                resolve();
            } else if (Date.now() - startTime > timeout) {
                console.warn("Bildtimeout – går vidare ändå");
                resolve();
            } else {
                requestAnimationFrame(check);
            }
        }

        check();
    });
}

const noun = ["3M Co", "A O Smith Corp", "AES Corp", "ANSYS Inc", "APA Corp (US)", "ASML Holding NV", "AT&T Inc", "AbbVie Inc", "Abbott Laboratories", "Accenture Plc", "Adobe Inc", "Advanced Micro Devices Inc", "Aflac Inc", "Agilent Technologies, Inc. (A)", "Air Products and Chemicals Inc", "Airbnb Inc", "Akamai Technologies, Inc.", "Albemarle Corp", "Alexandria Real Estate Equities Inc", "Align Technology, Inc.", "Allegion PLC", "Alliant Energy Corp", "Allstate Corp", "Alphabet Inc Class A", "Alphabet Inc Class C", "Altria Group Inc", "Amazon.com Inc", "Amcor PLC", "Ameren Corp", "American Airlines Group Inc", "American Electric Power Company Inc", "American Express Co", "American International Group Inc", "American Tower Corp", "American Water Works Company Inc", "Ameriprise Financial, Inc.", "Ametek Inc", "Amgen Inc", "Amphenol Corp", "Analog Devices Inc", "Aon PLC", "Apple Inc", "Applied Materials Inc", "Aptiv PLC", "Arch Capital Group Ltd", "Archer-Daniels-Midland Co", "Arista Networks Inc", "Arthur J. Gallagher & Co.", "Assurant Inc", "AstraZeneca PLC", "Atlassian Corp", "Atmos Energy Corp", "Autodesk Inc", "Automatic Data Processing Inc", "Autozone Inc", "AvalonBay Communities Inc", "Avery Dennison Corp", "Axon Enterprise Inc", "BIO-TECHNE Corp", "BXP Inc", "Baker Hughes Co", "Ball Corp", "Bank of America Corp", "Bank of New York Mellon Corp", "Bath & Body Works Inc", "Baxter International Inc", "Becton Dickinson and Co", "Berkshire Hathaway Inc Class B", "Best Buy Co Inc", "Bio-Rad Laboratories, Inc. Class A Common Stock", "Biogen Inc", "BlackRock Inc", "Blackstone Inc", "Boeing Co", "Booking Holdings Inc", "BorgWarner Inc", "Boston Scientific Corp", "Bristol-Myers Squibb Co", "Broadcom Inc", "Broadridge Financial Solutions Inc", "Brown & Brown Inc", "Brown-Forman Corp Class B", "Builders FirstSource, Inc.", "Bunge Global SA", "CBRE Group Inc", "CDW common stock", "CF Industries Holdings, Inc.", "CH Robinson Worldwide Inc", "CME Group Inc", "CMS Energy Corp", "CSX Corp", "CVS Health Corp", "Cadence Design Systems Inc", "Caesars Entertainment Inc", "Camden Property Trust", "Campbell's Co", "Capital One Financial Corp", "Cardinal Health Inc", "Carmax Inc", "Carnival Corp", "Carrier Global Corp", "Catalent Inc", "Caterpillar Inc", "Cboe Global Markets Inc", "Celanese Corp", "Cencora Inc", "Centene Corp", "CenterPoint Energy Inc", "Ceridian HCM Holding Inc.", "Charles River Lbrtrs ntrntl Inc", "Charles Schwab Corporation Common Stock", "Charter Communications Inc", "Chevron Corp", "Chipotle Mexican Grill, Inc.", "Chubb Ltd", "Church & Dwight Co Inc", "Cigna Group", "Cincinnati Financial Corp", "Cintas Corp", "Cisco Systems Inc", "Citigroup Inc", "Citizens Financial Group Inc", "Clorox Co", "CoStar Group Inc", "Coca-Cola Co", "Coca-Cola Europacific Partners PLC", "Cognizant Technology Solutions Corp", "Colgate-Palmolive Co", "Comcast Corp", "Comerica Inc", "Conagra Brands Inc", "ConocoPhillips", "Consolidated Edison Inc", "Constellation Brands Inc", "Constellation Energy Corp", "Cooper Companies Inc", "Copart Inc", "Corning Inc", "Corteva Inc", "Costco Wholesale Corp", "Coterra Energy Inc", "Crowdstrike Holdings Inc", "Crown Castle Inc", "Cummins Inc", "DENTSPLY SIRONA Inc", "DR Horton Inc", "DTE Energy Co", "Danaher Corp", "Darden Restaurants Inc", "Datadog Inc", "Davita Inc", "Deere & Co", "Delta Air Lines Inc", "Devon Energy Corp", "DexCom Inc", "Diamondback Energy Inc", "Digital Realty Trust Inc", "Discover Financial Services", "Dollar General Corp", "Dollar Tree Inc", "Dominion Energy, Inc.", "Domino's Pizza Inc", "DoorDash Inc", "Dover Corp", "Dow Jones Industrial Average", "DuPont de Nemours Inc", "Duke Energy Corp", "EOG Resources Inc", "EPAM Systems Inc", "EQT Corporation", "Eastman Chemical Co", "Eaton Corporation PLC", "Ecolab Inc", "Edison International", "Edwards Lifesciences Corp", "Electronic Arts Inc", "Elevance Health Inc", "Eli Lilly And Co", "Emerson Electric Co", "Enphase Energy Inc", "Entergy Corp", "Equifax Inc", "Equinix Inc", "Equity Residential", "Essex Property Trust Inc", "Estee Lauder Companies Inc", "Etsy Inc", "Everest Group Ltd", "Evergy Inc", "Eversource Energy", "Exelon Corp", "Expedia Group Inc", "Expeditors International of Washngtn Inc", "Extra Space Storage Inc", "Exxon Mobil Corp", "F5 Inc", "FMC Corp", "Factset Research Systems Inc", "Fair Isaac Corp", "Fastenal Co", "FedEx Corp", "Federal Realty Investment Trust", "Fidelity National Information Servcs Inc", "Fifth Third Bancorp", "First Solar Inc", "FirstEnergy Corp", "Fiserv Inc", "Ford Motor Co", "Fortinet Inc", "Fortive Corp", "Fox Corp Class A", "Fox Corp Class B", "Franklin Resources Inc", "Freeport-McMoRan Inc", "GE HealthCare Technologies Inc", "Garmin Ltd", "Gartner Inc", "Gen Digital Inc", "Generac Holdings Inc", "General Dynamics Corp", "General Electric Co", "General Mills Inc", "General Motors Co", "Genuine Parts Co", "Gilead Sciences Inc", "Global Payments Inc", "Globalfoundries Inc", "Globe Life Inc", "Goldman Sachs Group Inc", "HCA Healthcare Inc", "HP Inc", "Halliburton Company", "Hartford Insurance Group Inc", "Hasbro Inc", "Henry Schein Inc", "Hershey Co", "Hess Corp", "Hewlett Packard Enterprise Co", "Hilton Hotels Corporation Common Stock", "Hologic Inc", "Home Depot Inc", "Honeywell International Inc", "Hormel Foods Corp", "Host Hotels & Resorts Inc", "Howmet Aerospace Inc", "Hubbell Inc", "Humana Inc", "Huntington Bancshares Inc", "Huntington Ingalls Industries Inc", "IBM Common Stock", "IDEX Corporation", "IDEXX Laboratories Inc", "Illinois Tool Works Inc", "Illumina Inc", "Incyte Corp", "Ingersoll Rand Inc", "Insulet Corp", "Intel Corp", "Intercontinental Exchange Inc", "International Flavors & Fragrances Inc", "International Paper Co", "Interpublic Group of Companies Inc", "Intuit Inc", "Intuitive Surgical, Inc.", "Invesco Ltd", "Invitation Homes Inc", "Iqvia Holdings Inc", "Iron Mountain Inc", "J B Hunt Transport Services Inc", "J M Smucker Co", "JPMorgan Chase & Co", "Jabil Inc", "Jack Henry & Associates Inc", "Jacobs Solutions Inc", "Johnson & Johnson", "Johnson Controls International PLC", "Juniper Networks Inc", "KLA Corp", "Kellanova", "Kenvue Inc", "Keurig Dr Pepper Inc", "KeyCorp", "Keysight Technologies Inc", "Kimberly-Clark Corp", "Kimco Realty Corp", "Kinder Morgan Inc", "Kraft Heinz Co", "Kroger Co", "L3Harris Technologies Inc", "LKQ Corp", "Labcorp Holdings Inc", "Lam Research Corp", "Lamb Weston Holdings Inc", "Las Vegas Sands Corp.", "Leidos Holdings Inc", "Lennar Corp Class A", "Linde PLC", "Live Nation Entertainment Inc", "Lockheed Martin Corp", "Loews Corp", "Lowe's Companies Inc", "Lululemon Athletica Inc", "LyondellBasell Industries NV", "M&t Bank Corp", "MGM Resorts International", "MONDELEZ INTERNATIONAL INC Common Stock", "Marathon Oil Corporation", "Marathon Petroleum Corp", "Marketaxess Holdings Inc", "Marriott International Inc", "Marsh & McLennan Companies Inc", "Martin Marietta Materials Inc", "Marvell Technology Inc", "Masco Corp", "Mastercard Inc", "Match Group Inc", "McCormick & Company Inc", "McDonald's Corp", "McKesson Corp", "Medtronic PLC", "MercadoLibre Inc", "Merck & Co Inc", "Meta Platforms Inc", "Metlife Inc", "Mettler-Toledo International Inc", "Microchip Technology Inc", "Micron Technology Inc", "Microsoft Corp", "Mid-America Apartment Communities Inc", "Moderna Inc", "Mohawk Industries Inc", "Molina Healthcare Inc", "Molson Coors Beverage Co Class B", "Mongodb Inc", "Monolithic Power Systems Inc", "Monster Beverage Corp", "Moody's Corp", "Morgan Stanley", "Mosaic Co", "Motorola Solutions Inc", "Msci Inc", "NRG Energy Inc", "NVIDIA Corp", "NVR Inc", "NXP Semiconductors NV", "Nasdaq Inc", "NetApp Inc", "Netflix Inc", "Newmont Corporation", "News Corp Class A", "News Corp Class B", "NextEra Energy Inc", "NiSource Inc", "Nike Inc", "Nordson Corp", "Norfolk Southern Corp", "Northern Trust Corp", "Northrop Grumman Corp", "Norwegian Cruise Line Holdings Ltd", "Nucor Corp", "O'Reilly Automotive Inc", "ON Semiconductor Corp", "ONEOK Inc", "Occidental Petroleum Corp", "Old Dominion Freight Line Inc", "Omnicom Group Inc", "Oracle Corp", "Otis Worldwide Corp", "PACCAR Inc", "PDD Holdings Inc - ADR", "PG&E Corp", "PNC Financial Services Group Inc", "PPG Industries Inc", "PPL Corp", "PTC Inc", "Packaging Corp Of America", "Palo Alto Networks Inc", "Paramount Global Class B", "Parker-Hannifin Corp", "PayPal Holdings Inc", "Paychex Inc", "Paycom Software Inc", "Pentair PLC", "PepsiCo Inc", "Pfizer Inc", "Philip Morris International Inc.", "Phillips 66", "Pinnacle West Capital Corp", "Pioneer Natural Resources Co", "Pool Corp", "Principal Financial Group Inc", "Procter & Gamble Co", "Progressive Corp", "Prologis Inc", "Prudential Financial Inc", "Public Service Enterprise Group Inc", "Public Storage", "Pultegroup Inc", "Qorvo Inc", "Qualcomm Inc", "Quanta Services Inc", "Quest Diagnostics Inc", "Ralph Lauren Corp", "Raymond James Financial Inc", "Realty Income Corp", "Regency Centers Corp", "Regeneron Pharmaceuticals Inc", "Regions Financial Corp", "Republic Services Inc", "Resmed Inc", "Revvity Inc", "Robert Half Inc", "Rockwell Automation Inc", "Rollins Inc", "Roper Technologies Inc", "Ross Stores Inc", "Royal Caribbean Cruises Ltd", "Rtx Corp", "S&P Global Inc", "SBA Communications Corp", "Salesforce Inc", "Schlumberger NV", "Seagate Technology Holdings PLC", "Sempra", "ServiceNow Inc", "Sherwin-Williams Co", "Simon Property Group Inc", "Sirius XM Holdings Inc", "Skyworks Solutions Inc", "Snap-On Inc", "Southern Co", "Southwest Airlines Co", "Splunk Inc.", "Stanley Black & Decker Inc", "Starbucks Corp", "State Street Corp", "Steel Dynamics Inc", "Steris PLC", "Stryker Corp", "Sun Peak Metals Corp", "Synchrony Financial", "Synopsys Inc", "Sysco Corp", "T Rowe Price Group Inc", "T-Mobile Us Inc", "TAKE-TWO INTERACTIVE SOFTWARE, INC Common Stock", "TE Connectivity PLC", "TJX Companies Inc", "Tapestry Inc", "Targa Resources Corp", "Target Corp", "Teledyne Technologies Inc",
              "Teleflex Inc", "Teradyne Inc", "Tesla Inc", "Texas Instruments Inc", "Textron Inc", "Thermo Fisher Scientific Inc", "Tractor Supply Co", "Trade Desk Inc", "Trane Technologies PLC", "TransDigm Group Inc", "Travelers Companies Inc", "Trimble Inc", "Truist Financial Corp", "Tyler Technologies Inc", "Tyson Foods Inc", "UDR Inc", "US Bancorp", "Uber Technologies Inc", "Ulta Beauty, Inc.", "Union Pacific Corp", "United Airlines Holdings Inc", "United Parcel Service Inc", "United Rentals, Inc.", "UnitedHealth Group Inc", "Universal Health Services Inc", "VF Corp", "VICI Properties Inc", "Valero Energy Corporation", "Ventas Inc", "VeriSign, Inc", "Verisk Analytics, Inc.", "Verizon Communications Inc", "Vertex Pharmaceuticals Inc", "Viatris Inc", "Visa Inc", "Volatus Aerospace Inc", "Vulcan Materials Company", "W R Berkley Corp", "WEC Energy Group Inc", "WRKR Ltd", "WW Grainger Inc", "Walgreens Boots Alliance Inc", "Walmart Inc", "Walt Disney Co", "Warner Bros Discovery Inc", "Waste Management Inc", "Waters Corp", "Wells Fargo & Co", "Welltower Inc", "West Pharmaceutical Services Inc", "Western Digital Corp", "Westinghouse Air Brake Technologies Corp", "Weyerhaeuser Co", "Whirlpool Corp", "Williams Companies Inc", "Willis Towers Watson PLC", "Workday Inc", "Wynn Resorts, Limited", "Xcel Energy Inc", "Xylem Inc", "Yum! Brands Inc", "Zebra Technologies Corp", "Zimmer Biomet Holdings Inc", "Zions Bancorporation NA", "Zoetis Inc", "Zscaler Inc", "eBay Inc"];

const seed = 12345;
const iterations = 519;


async function measure() {
    let counter = parseInt(localStorage.getItem("counter")) || 0;
    let ordning = JSON.parse(localStorage.getItem("ordning") || "null");

    if (!ordning || ordning.length !== noun.length) {
        ordning = shuffleArray(noun, seed);
        localStorage.setItem("ordning", JSON.stringify(ordning));
    }

    let oldVal = parseInt(localStorage.getItem("oldVal"));
    let previousSearch = localStorage.getItem("search");

    if (!isNaN(oldVal) && previousSearch) {
        await waitForStockImage();
        const now = Date.now();
        const delta = now - oldVal;

        localStorage.setItem(`row_${counter}`, `${delta},${previousSearch}`);
        localStorage.setItem("counter", counter + 1);
        localStorage.removeItem("oldVal");
        localStorage.removeItem("search");

        console.log(`✔ Mätning #${counter} för "${previousSearch}": ${delta} ms`);

        // ✅ Lägg till en liten paus så att all rendering hinner bli klar
        await new Promise(resolve => setTimeout(resolve, 400));

        const nextUrl = location.pathname + "?r=" + Date.now() + "#" + Math.random();
        window.location.replace(nextUrl);
        return;
    }

    if (counter >= iterations) {
        let csv = "";
        for (let i = 0; i < iterations; i++) {
            const row = localStorage.getItem(`row_${i}`);
            if (row) {
                csv += row + "\n";
                localStorage.removeItem(`row_${i}`);
            }
        }

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "measurement_perceived.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        localStorage.clear();
        return;
    }

    const index = counter % ordning.length;
    const search = ordning[index];
    const searchField = document.getElementById('stocksearch');
    const form = document.getElementById('searchform');

    if (searchField && form) {
        searchField.value = search;
        localStorage.setItem("search", search);
        localStorage.setItem("oldVal", Date.now());
        form.submit();
    } else {
        console.warn("Formulär eller sökfält hittades inte. Försöker igen om 300ms...");
        setTimeout(measure, 300);
    }
}

(function () {
    'use strict';
    measure();
})();