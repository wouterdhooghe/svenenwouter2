
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
    const goden = ['Icarus', 'Robin Hood', 'Odysseus', 'Gilgamesh', 'Mozes', 'Anansi', 'Mulan', 'Achilles', 'David', 'Sint Pieter','Franciscus Van Assisi', 'Johannes De Doper', 'Jezus', 'Sint Valentijn', "Jeanne D'Arc", 'Sinterklaas', 'Damiaan', 'Simeon De Styliet', 'Sint Sebastiaan', 'Zeus','Hera','Hermes','Athena', 'Apollo', 'Aphrodite','Hades','Hephaestos','Ares','Dionysos','Odin','Frygg','Baldur','Loki','Freyr','Freya','Hel','Heimdalr','Thor','Njord','Brahman','Vishnu','Shiva','Lakshmi','Saraswati','Parvati','Kali','Surya','Hanuman','Ganesha','Osiris','Isis','Horus','Toth','Ra','Taweret','Set','Ptah','Sobek','Nut','Papa Legba','Erzulie','Ogoun', 'Damballah Wedo', 'Kouzen Zaka','Mami Wata', 'Baron Samedi', 'Maman Brigitte', 'Sopona', 'Marinette Bras Cheches', 'Michael Jackson','Madonna','Prince','Bob Marley','Beethoven','Nina Simone','David Bowie','Patti Smith','Elton John','Tutankhamon','Haile Selassie', 'Hirohito', 'Sargon Van Akkad','Cuba','Jordanie','Griekenland','Tsjechie','Dominicaanse Republiek', 'Zweden', 'Portugal', 'Azerbeidzjan','Hongarije','Honduras','Wit-Rusland','Verenigde Arabische Emiraten', 'Israel','Tajikistan','Oostenrijk','Papoea Nieuw-Guinea','Zwitserland'];
    const landen = ['China', 'India', 'Verenigde Staten', 'Indonesie', 'Pakistan', 'Brazilie', 'Nigeria', 'Bangladesh', 'Rusland', 'Mexico','Japan','Filippijnen','Ethiopie', 'Congo', 'Egypte', 'Vietnam', 'Iran', 'Turkije', 'Duitsland','Frankrijk', 'Verenigd Koninkrijk', 'Thailand', 'Zuid-Afrika', 'Uganda', 'Italie','Myanmar', 'Zuid-Korea','Columbia', 'Kenya', 'Spanje','Argentinie','Algerije','Sudan', 'Uganda','Oekraine' , 'Irak', 'Canada', 'Marokko', 'Uzbekistan', 'Saudi-Arabie', 'Peru', 'Afghanistan', 'Maleisie','Angola','Ghana','Mozambique','Yemen','Nepal','Venezuela','Ivoorkust','Madagascar','Australie','Noord-Korea','Kameroen','Niger','Taiwan','Sri Lanka','Burkina Faso', 'Mali', 'Chili', 'Roemenie', 'Malawi','Kazakhstan', 'Zambia', 'Syrie', 'Ecuador', 'Nederland', 'Senegal', 'Guatemala','Chad','Somalie','Cambodja','Zuid-Sudan','Rwanda','Burundi','Benin','Bolivie','Haiti','Tunesie', 'Belgie','Julius Caesar','Constantijn De Grote','Caligula','Dalai Lama','Hitler','Henry Puyi','Tonatiuh (Zon)','Freddie Mercury (mercurius)','Lucifer (Venus)','Gaia (Aarde)','Martian (Mars)','Ctulhu (Jupiter)','Cronos (Saturnus)','Oscar Wilde (Uranus)','Neptunus (neptunus)','Pilgrim Dusmano (Pluto)','Hemelschaar'];
    const objecten = ['Rat', 'Rog', 'Room', 'Roos', 'Raaf', 'Ruine', 'Rok', 'Raap', 'Rail', 'Tor', 'Tut/Tiet','Deeg','Duim','Das','Duif','Teen','Teek'];
    const schalen = ['Femto','Pico', 'Nano', 'Micro', 'Milli', 'Meter', 'Kilo', 'Mega', 'Giga', 'Tera', 'Peta', 'Exa', 'Zetta', 'Yotta']
    const words = attribute === 'godDisplay' ? goden : attribute === 'landDisplay' ? landen : attribute === 'objectDisplay' ? objecten : schalen;
    const currentWordIndex = words.indexOf(currentWord);
    const nextWordIndex = (currentWordIndex + 1) % words.length; // get the index of the next word in the array, looping back to the beginning if necessary
    const nextWord = words[nextWordIndex];
    return nextWord;
}
