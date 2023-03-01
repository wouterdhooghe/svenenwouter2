
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
//          - 



let attribute = 'landDisplay'; // default value



document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const currentWord = document.getElementById(attribute).textContent;

    if (keyName === getNextWord(currentWord).charAt(0).toLowerCase()) {
        const nextWord = getNextWord(currentWord);

        document.getElementById(attribute).textContent = nextWord;
        const imagePath = `${nextWord}.png`; // assume all image files have a .png extension
        document.getElementById('wordImage').setAttribute('src', imagePath);
        document.getElementById('wordImage').setAttribute('alt', nextWord);
 
    }
});

function getNextWord(currentWord) {
    const goden = ['Icarus', 'Robin Hood', 'Odysseus', 'Gilgamesh', 'Mozes', 'Anansi', 'Mulan', 'Achilles', 'David', 'Sint Pieter','Franciscus Van Assisi', 'Johannes De Doper', 'Jezus', 'Sint Valentijn', "Jeanne D'Arc", 'Sinterklaas', 'Damiaan', 'Simeon De Styliet', 'Sint Sebastiaan', 'Zeus','Hera','Hermes','Athena', 'Apollo', 'Aphrodite','Hades','Hephaestos','Ares','Dionysos','Odin','Frygg','Baldur','Loki','Freyr','Freya','Hel','Heimdalr','Thor','Njord','Brahman','Vishnu','Shiva','Lakshmi','Saraswati','Parvati','Kali','Surya','Hanuman','Ganesha','Osiris','Isis','Horus','Toth','Ra','Taweret','Set','Ptah','Sobek','Nut','Papa Legba','Erzulie','Ogoun'];
    const landen = ['China', 'India', 'Verenigde Staten', 'Indonesie', 'Pakistan', 'Brazilie', 'Nigeria', 'Bangladesh', 'Rusland', 'Mexico','Japan','Filippijnen','Ethiopie', 'Congo', 'Egypte', 'Vietnam', 'Iran', 'Turkije', 'Duitsland','Frankrijk', 'Verenigd Koninkrijk', 'Thailand', 'Zuid-Afrika', 'Uganda', 'Italie','Myanmar', 'Zuid-Korea','Columbia', 'Kenya', 'Spanje','Argentinie','Algerije','Sudan', 'Uganda','Oekraine' ];
    const objecten = ['Rat', 'Rog', 'Room', 'Roos', 'Raaf', 'Ruine', 'Rok', 'Raap', 'Rail', 'Tor', 'Tut/Tiet','Deeg','Duim','Das','Duif','Teen','Teek'];
    const words = attribute === 'godDisplay' ? goden : attribute === 'landDisplay' ? landen : objecten;
    const currentWordIndex = words.indexOf(currentWord);
    const nextWordIndex = (currentWordIndex + 1) % words.length; // get the index of the next word in the array, looping back to the beginning if necessary
    const nextWord = words[nextWordIndex];
    return nextWord;
}
