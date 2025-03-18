// ==UserScript==
// @name         Mätscript
// @namespace    http://tampermonkey.net/
// @version      2024-09-24
// @description  Script för att mäta söktiden för ord i artiklar
// @author       You
// @match        http://grupp1.cms.webug.se/
// @include      http://grupp1.cms.webug.se/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

var noun=new Array("bedroom","song","structure","pickle","nut","plane","room","dust","carpenter","camp","office","grape","fuel","cap","minister","pest","morning","scarecrow","trip","test","stream","month","summer","tub","baseball","cast","dime","arm","rake","money","hen","straw","head","cobweb","geese","cat","glove","edge","actor","daughter","space","substance","flower","self","sound","fang","fight","toe","fork","kitten","rabbit","bean","swing","oranges","mitten","fog","class","nose","pleasure","flesh","feather","river","celery","van","scale","badge","robin","sweater","gate","mountain","alarm","pollution","cake","donkey","wealth","oatmeal","cherry","joke","faucet","summer","airplane","reward","scissors","believe","rain","lettuce","zipper","club","songs","kite","kiss","kick","sea","grandmother","jam","moon","veil","juice","stomach","frame","hill","fruit","queen","boundary","pig","drug","giraffe","shape","limit","fiction","loaf","face","toothache","tramp","rate","railway","sponge","flag","hope","education","beginner","boy","creature","notebook","voice","meeting","bird","coach","team","hose","riddle","linen","wrist","grim reaper","mint","plantation","fifth","quicksand","library","family","cat","brick","value","help","recess","parent","soda","icicle","son","stove","street","wing","flock","deer","winter","sea","railway","sack","mongrel","pan","pail","show","apparel","governor","ladybug","wool","lift","weather","afterthought","achieve","meal","hook","note","step","acoustics","shop","water","grandmother","umbrella","grandfather","man","island","hope","zoo","history","day","pie","line","volleyball","beam","anger","cellar","interest","rat","owner","holiday","order","faucet","pot","swim","chin","sweater","celery","sugar","lunch","space","road","wilderness","garden","Steve Jobs","linen","pencil","feet","meal","name","sun","trail","passenger","rifle","arithmetic","toothpaste","screw","milk","volcano","hen","able","ball","rock","cabbage","hobbies","judge","friends","cellar","zebra","spiders","opinion","cub","front","grain","foot","town","surprise","bed","offer","furniture","hairspray","bead","sofa","fog","magic","spade","suit","cattle","hall","nest","station","ghost","brother","week","knot","haircut","vein","beggar","beast","bushes","galley","vegetable","year","eye","balloon","pear","underwear","book","Ipad","income","thread","cars","secretary","hill","zephyr","glue","lawyer","horn","death","brush","hole","water","approval","view","kitty","stream","smoke","sister","wish","underwear","thrill","reaction","metal","girls","grandfather","appliance","language","fold","liquid","grain","food","soup","mother","battle","flower","stranger","hydrant","soda","children","moon","carpenter","stench","owl","veil","book","hate","corn","ache","government","gate","feast","crate","lettuce","plot","wrench","caption","clover","cause","animal","force","furniture","volcano","wheel","farm","friction","crowd","pail","grade","argument","throne","number","slave","elbow","governor","route","sidewalk","stranger","kite","crayon","education","reason","carriage","servant","morning","glass","answer","tent","straw","beetle","heart","horn","father","dirt","food","playground","beef","advice","sheet","jellyfish","throat","motion","aftermath","bread","apple","cream","police","scent","texture","map","cactus","breakfast","popcorn","visitor","suit","patch","doctor","afternoon","sink","lumber","bath","lamp","dad","sail","great uncle","cats","arch","effect","kettle","cart","measure","cave","kiss","cemetery","spark","volleyball","game","story","ocean","plant","good-bye","oven","writer","insurance","yard","seed","range","circle","sock","horse","frog","game","table","digestion","trick","oatmeal","title","meat","bun","unit","swing","cable","dust","snake","giants","cannon","sofa","health","notebook","monkey","system","cracker","arithmetic","feeling","font","holiday","basket","dress","cent","stocking","goldfish","can","girl","brain","oil","tank","key","rainstorm","instrument","apple","home","jar","bike","invention","development","calculator","heat","string","action","channel","jeans","string","spark","frame","rainstorm","lizard","hearing","territory","dog","coil","jail","zinc","stone","level","girl","scene","soap","butter","spy","bomb","light","guide","mom","toes","doll","selection","cow","vase","earthquake","hot","elbow","car","pet","rain","fear","stew","lightning bolt","mailbox","receipt","bucket","vest","dock","park","bubble","geese","wood","niece","finger","goose","cattle","turkey","seat","fuel","lunchroom","stove","seashore","lake","hobbies","hook","pear","birthday","shoe","spoon","temper","boot","banana","vacation","tiger","knife","summer","snow","winter","throne","squirrel","crown","bat","fowl","ray","song","form","treatment","owl","goldfish","farmer","friction","knowledge","toothbrush","stage","goose","feather","desk","lace","stretch","crook","heat","son","giraffe","flavor","mother","clam","earthquake","airport","downtown","sense","plastic","aunt","van","chicken","operation","friend","organization","flowers","mice","music","basketball","cloth","creator","voyage","branch","hair","rat","orange","pancake","umbrella","laborer","heart","partner","scarf","sun","wren","list","fly","calendar","cup","marble","twig","home","coast","grade","eggnog","dinner","skate","field","activity","feet","seashore","boy","bait","kite","locket","seed","insect","maid","mountain","scale","tree","ornament","cemetery","guitar","rake","crow","frog","spot","rose","support","health","honey","society","crib","army","light","sort","north","poison","border","street","quiet","tray","drum","pinkie","month","vest","quilt","science","recess","cast","vegetable","vase","use","feast","picture","rail","honey","lock","pocket","hat","reading","pen","ghost","toad","uncle","memory","star","lip","fang","grass","voyage","gun","visitor","fan","knee","idea","goose","stealth yacht","cave","mask","sleet","number","snail","observation","ocean","fireman","mother");

// Main-funktionen som generarar randomtexten
// KOD SOM SKAPAR SEED
function jsf32(a, b, c, d) {
  a |= 0; b |= 0; c |= 0; d |= 0;
  var t = a - (b << 23 | b >>> 9) | 0;
  a = b ^ (c << 16 | c >>> 16) | 0;
  b = c + (d << 11 | d >>> 21) | 0;
  b = c + d | 0;
  c = d + t | 0;
  d = a + t | 0;
  return (d >>> 0) / 4294967296;
}

Math.random = function() {
    var ran = jsf32(0xF1EA5EED, Math.randSeed + 6871, Math.randSeed + 1889, Math.randSeed + 56781);
    Math.randSeed += Math.floor(ran * 37237);
    return ran;
}

Math.setSeed = function(seed) {
    Math.randSeed = seed;
    for (var i = 0; i < 10; i++) Math.random();
}

var origRandom = Math.random;
Math.randSeed = Math.floor(Date.now());

(function() {
    'use strict';

    let iterations = 75;

    localStorage.removeItem("oldVal");

    // Vänta tills sidan är helt laddad innan scriptet körs
    window.addEventListener('load', function() {
        console.log("Page fully loaded");

        var counter = parseInt(localStorage.getItem("counter")) || 0;

        if(counter < iterations) {
            counter++; // Öka räknaren varje gång
            localStorage.setItem("counter", counter); // Spara den nya räknaren

            Math.setSeed(counter);
            var search = noun[Math.floor(Math.random()*noun.length)];

            var searchField = document.getElementById('mod-finder-searchword110'); // Sök på noun från ordlistan
            if (searchField) {
                searchField.value = search;

                localStorage.setItem("searchPerformed", "true"); // Spara
                localStorage.setItem("search", search); // Spara sökterm
            }

            // Skicka formuläret och klicka på "Spara & Stäng" automatiskt efter en delay
            setTimeout(function() {
                var form = document.querySelector(".mod-finder.js-finder-searchform.form-search");
                var measurement = performance.now();
                var old = parseInt(localStorage.getItem("oldVal")) || 0;
                if (form) {
                    form.submit();
                } else {
                    console.error('Search did not work');
                }
            }); // 500-millisekunders fördröjning
        }else{
         // localStorage.removeItem("counter");
        }
    });
})();