const mainContainer = document.querySelector(".main");
const API_URL = "https://rickandmortyapi.com/api";

window.onload = () => {
    sectionSelector('HOME');
}

function sectionSelector (section) {
    switch (section){
        case 'HOME':
            renderBlock (homeBlock);
            linkInyector ("navigation__button");
            break;
        case 'PERSONAJES':
            renderCharacters();
            break;
        case 'TEMPORADAS':
            renderSeasons();
            break;
        case 'LOCALIZACIONES':
            renderLocations();
            break;           
        default:
            printHome();
            break;
    }
}