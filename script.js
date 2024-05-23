
// gewoon om te testen of git werkt nu EN NOG EEN KEER

godenDict = {
    1: {
        'god':'Icarus',
        'land':'China',
        'object':'rat'
    },
    2: {
        'god':'Robin Hood',
        'land':'India',
        'object': 'rog'
    }
};

// in principe zou je voor elke letter van het alfabet een lijst kunnen onthouden.
//          - atomen
//          - geschiedenis data zijn niet goed omdat tijd oneindig opdeelbaar is (tenzij je per eeuw gaat, of per officiele periodeb)
//  
//      algemener kan je denken dat studenten te onthouden info in een schema moeten zetten. Je kan met letters een vast pad door het schema volgen.
//
//      mss met spatie een random current word kiezen?
//      tab ofzo om er een rode stip bij te zetten
//      bij 3 stippen prompt voor ezelsbrug
//      ezelsbrug tonen voor nextword (als de ezelsbrug bestaat)
//      mss is er ook iets te doen met de beginletter van nextword


document.onkeydown = keysPressed;

let attribute = 'landDisplay'; // default value



document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const currentWord = document.getElementById(attribute).textContent;

    if (keyName === getNextWord(currentWord).charAt(0).toLowerCase()) {
        const nextWord = getNextWord(currentWord);
        document.getElementById(attribute).textContent = nextWord;
        imagePath =`${nextWord}.png`;
        console.log('imagepath is '+ imagePath);
        document.getElementById('wordImage').onerror=function() {this.onerror=null;this.src='No.png';}

        document.getElementById('wordImage').setAttribute('src', imagePath);
        document.getElementById('wordImage').setAttribute('alt', nextWord);
 
    }
});

function keysPressed(e) {

    if (e.shiftKey == 1)
        {
            switch(e.code) {
                case 'KeyG': attribute='godDisplay'; break;
                case 'KeyL': attribute='landDisplay'; break;
                case 'KeyO': attribute='objectDisplay'; break;
                case 'KeyS': attribute='schaalDisplay'; break;
                case 'KeyA': attribute='atoomDisplay'; break;
                case 'KeyE': attribute='eeuwDisplay'; break;
            }
        }
};

function imageExists(url){
    var image = new Image();
    image.src = url;
    if (!image.complete) {
        return false;
    }
    else if (image.height === 0) {
        return false;
    }
    return true;
}

function getNextWord(currentWord) {
    const goden = ['Icarus', 'Robin Hood', 'Odysseus', 'Gilgamesh', 'Mozes', 'Anansi', 'Mulan', 'Achilles', 'David', 'Sint Pieter','Franciscus Van Assisi', 'Johannes De Doper', 'Jezus', 'Sint Valentijn', "Jeanne D'Arc", 'Sinterklaas', 'Damiaan', 'Simeon De Styliet', 'Sint Sebastiaan', 'Zeus','Hera','Hermes','Athena', 'Apollo', 'Aphrodite','Hades','Hephaestos','Ares','Dionysos','Odin','Frigg','Baldur','Loki','Freyr','Freya','Hel','Heimdallr','Thor','Njord','Brahma','Vishnu','Shiva','Lakshmi','Saraswati','Parvati','Kali','Surya','Hanuman','Ganesha','Osiris','Isis','Horus','Thoth','Ra','Taweret','Set','Ptah','Sobek','Nut','Papa Legba','Erzulie','Ogoun', 'Damballah Wedo', 'Kouzen Zaka','Mami Wata', 'Baron Samedi', 'Maman Brigitte', 'Sopona', 'Marinette Bras Cheches', 'Michael Jackson','Madonna','Prince','Bob Marley','Beethoven','Nina Simone','David Bowie','James Brown','Patti Smith','Elton John','Tutankhamon','Haile Selassie', 'Hirohito', 'Sargon Van Akkad','Julius Caesar','Constantijn De Grote','Caligula','Dalai Lama','Hitler','Henry Puyi','Tonatiuh (Zon)','Freddie Mercury (mercurius)','Lucifer (Venus)','Gaia (Aarde)','Martian (Mars)','Ctulhu (Jupiter)','Cronos (Saturnus)','Oscar Wilde (Uranus)','Neptunus (neptunus)','Pilgrim Dusmano (Pluto)','Hemelschaar'];
    const landen = ['China', 'India', 'Verenigde Staten', 'Indonesie', 'Pakistan', 'Brazilie', 'Nigeria', 'Bangladesh', 'Rusland', 'Mexico','Japan','Filippijnen','Ethiopie', 'Congo', 'Egypte', 'Vietnam', 'Iran', 'Turkije', 'Duitsland','Frankrijk', 'Verenigd Koninkrijk', 'Thailand', 'Zuid-Afrika', 'Tanzania', 'Italie','Myanmar', 'Zuid-Korea','Colombia', 'Kenia', 'Spanje','Argentinie','Algerije','Sudan', 'Uganda','Oekraine' , 'Irak', 'Canada', 'Polen', 'Marokko', 'Oezbekistan', 'Saudi-Arabie', 'Peru', 'Afghanistan', 'Maleisie','Angola','Ghana','Mozambique','Yemen','Nepal','Venezuela','Ivoorkust','Madagascar','Australie','Noord-Korea','Kameroen','Niger','Taiwan','Sri Lanka','Burkina Faso', 'Mali', 'Chili', 'Roemenie', 'Malawi','Kazakhstan', 'Zambia', 'Syrie', 'Ecuador', 'Nederland', 'Senegal', 'Guatemala','Chad','Somalie','Zimbabwe','Cambodja','Zuid-Sudan','Rwanda','Guinee','Burundi','Benin','Bolivie','Haiti','Tunesie', 'Belgie','Cuba','Jordanie','Griekenland','Tsjechie','Dominicaanse Republiek', 'Zweden', 'Portugal', 'Azerbeidzjan','Hongarije','Honduras','Wit-Rusland','Verenigde Arabische Emiraten', 'Israel','Tajikistan','Oostenrijk','Papoea Nieuw-Guinea','Zwitserland'];
    const objecten = ['Rat', 'Rog', 'Room', 'Roos', 'Raaf', 'Ruine', 'Rok', 'Raap', 'Rail', 'Tor', 'Tut/Tiet','Deeg','Duim','Das','Duif','Teen','Teek'];
    const schalen = ['Femto','Pico', 'Nano', 'Micro', 'Milli', 'Meter', 'Kilo', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta'];
    const atomen = ['H (Waterstof)', 'He (Helium)', 'Li (Lithium)', 'Be (Beryllium)', 'B (Boor)', 'C (Koolstof)', 'N (Stikstof)', 'O (Zuurstof)', 'F (Fluor)', 'Ne (Neon)', 'Na (Natrium)', 'Mg (Magnesium)', 'Al (Aluminium)', 'Si (Silicium)', 'P (Fosfor)', 'S (Zwavel)', 'Cl (Chloor)', 'Ar (Argon)', 'K (Kalium)', 'Ca (Calcium)', 'Sc (Scandium)', 'Ti (Titanium)', 'V (Vanadium)', 'Cr (Chroom)', 'Mn (Mangaan)', 'Fe (IJzer)', 'Co (Kobalt)', 'Ni (Nikkel)', 'Cu (Koper)', 'Zn (Zink)', 'Ga (Gallium)', 'Ge (Germanium)', 'As (Arsenicum)', 'Se (Selenium)', 'Br (Broom)', 'Kr (Krypton)', 'Rb (Rubidium)', 'Sr (Strontium)', 'Y (Yttrium)', 'Zr (Zirkonium)', 'Nb (Niobium)', 'Mo (Molybdeen)', 'Tc (Technetium)', 'Ru (Ruthenium)', 'Rh (Rhodium)', 'Pd (Palladium)', 'Ag (Zilver)', 'Cd (Cadmium)', 'In (Indium)', 'Sn (Tin)', 'Sb (Antimoon)', 'Te (Telluur)', 'I (Jodium)', 'Xe (Xenon)', 'Cs (Cesium)', 'Ba (Barium)', 'La (Lanthanium)', 'Ce (Cerium)', 'Pr (Praseodymium)', 'Nd (Neodymium)', 'Pm (Promethium)', 'Sm (Samarium)', 'Eu (Europium)', 'Gd (Gadolinium)', 'Tb (Terbium)', 'Dy (Dysprosium)', 'Ho (Holmium)', 'Er (Erbium)', 'Tm (Thulium)', 'Yb (Ytterbium)', 'Lu (Lutetium)', 'Hf (Hafnium)', 'Ta (Tantaal)', 'W (Wolfraam)', 'Re (Rhenium)', 'Os (Osmium)', 'Ir (Iridium)', 'Pt (Platina)', 'Au (Goud)', 'Hg (Kwik)', 'Tl (Thallium)', 'Pb (Lood)', 'Bi (Bismut)', 'Po (Polonium)', 'At (Astaat)', 'Rn (Radon)', 'Fr (Francium)', 'Ra (Radium)', 'Ac (Actinium)', 'Th (Thorium)', 'Pa (Protactinium)', 'U (Uranium)', 'Np (Neptunium)', 'Pu (Plutonium)', 'Am (Americium)', 'Cm (Curium)', 'Bk (Berkelium)', 'Cf (Californium)', 'Es (Einsteinium)', 'Fm (Fermium)'];
    const eeuwen = ["Trojaanse oorlog",
    "Koning David. onstaan Kush",
    "Zhou China. I Ching. 10e E. Vedische Aryers in India. Solomon zoon van david is koning israel. Bouw 1e tempel. Gouden Nebun hats. Ontstaan Ethiopie uit paring solomon en queen of sheba. solomon sterft en israel valt uiteen in judah en israel.",
    "Dido. Begin Neo-Assyrische rijk",
    "Romulus en Remus (753). Homeros 8e E. Kush vormen 25e dynastie in Egypte: Black pharaos.",
    "Ashurbanipal van neo-assyrie pakt Egypte af van de black farao. Wordt verslagen intern doo neo Babylon Nebuchadnezzar (1200j na 1e Babylon met Hammurabi , 1700j na Sargon met AKKADIA, 2100j na Gilgamesh in SUMER) dus 7e eeuw, 19e eeuw, 23e eeuw (allemaal priemgetallen) en dan nog 27 voor gilgamesh (SUMER)",
    "Cyrus de grote start Achaemeniden, haalt de christenen uit neobabylon caprivity en ",
    "Gouden eeuw van Pericles. 5e E. Romeinse Republiek begint",
    "Alexander",
    "Punische oorlog: Griekenland vs carthago Hannibal",
    "Romeinen pakken alles in 2e E: Griekenland, Spanje, africa (carthago destroyed in 3e punische), egypte, Asia minor en zelfs de strook.van Marseille om Spanje te verbinden. marian reforms. gracchen. Han empire max, (tot Vietnam en Kazachstan) maar moeten tribute betalen aan xiongnou omdat silk Road er nog niet is",
    "Caesar",
    "Augustus , Nero, Jezus great fire rome, colloseum (flavians)",
    "5 goede keizers golden age 2e E",
    "Severaanse dynastie (militaire monarchie) en crisis 3e E en Diocletianus",
    "Constantijn maakt christendom tot staatshlgods. zogezegd ook donatie van Constantijn wereldlijke macht voor paus. kerk van heilig graf in Jeruzalem ",
    "Clovis verovert Frankrijk en Duitsland (langhaar merovingers)",
    "Justinianus en plaag 6e E",
    "Rashidun kalifaat vlak na Mohammed ",
    "Karel Martel Poitiers en Charlemagne ",
    "Vikings 9e E (vallen in deze eeuw al andalus aan en establishen danelaw)",
    "Medieval warm period. bloei caliphaat cordoba in al andalus. laatste viking uit Engeland met Erik bloodaxe. begin Song net spiegelbeeld van begin Zhou",
    "Song dynasty wonder + William conquerer (descendant van viking rollo) eindigt viking age in 11e E na throneclaim van viking Sweyn Forkbeard en viking koning Cnut in Engeland medieval warm period",
    "Kruistocht 1 en 2 terwijl islam India verovert medieval warm period ",
    "Mongools rijk grootste expansie einde medieval warm period in 1250. Kublai Khan pakt song dynastie en vestigt Yuan in 1279. Nog meer kruistochten oa kinderkruistocht 1212",
    "Ottomaanse rijk gouden eeuw 14e E en black death, suleiman gouden eeuw ottomanen (trouwt met zijn rosse slavische haremslaaf)",
    "Ming dynastie , mehmed conqueror pakt byzantium",
    "Ontdekkers en hervormers, piek ottoman met suleiman paddestoelhoed",
    "Vorsten en regenten gouden eeuw Nederland 17e E",
    "Pruiken en revoluties 18e E",
    "Fabrieken en ... (industriele revolutie) 19e E",
    "TV en Computer 20e E",
    "21e eeuw"
    ];
    const words = attribute === 'godDisplay' ? goden : attribute === 'landDisplay' ? landen : attribute === 'objectDisplay' ? objecten : attribute === 'schaalDisplay' ? schalen : attribute === 'atoomDisplay' ? atomen : eeuwen;
    const currentWordIndex = words.indexOf(currentWord);
    const nextWordIndex = (currentWordIndex + 1) % words.length; // get the index of the next word in the array, looping back to the beginning if necessary
    const nextWord = words[nextWordIndex];
    return nextWord;
}

