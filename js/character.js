async function renderCharacter(id) {
    const characterSelected = await getCharacter(id);

    mainContainer.innerHTML = '';
    mainContainer.innerHTML += getSectionBlock("DETALLES DEL PERSONAJE");
    mainContainer.innerHTML += characterBlock (characterSelected.image,
                                               characterSelected.name,
                                               characterSelected.status,
                                               characterSelected.species,
                                               characterSelected.gender,
                                               characterSelected.origin.name,
                                               characterSelected.location.name,
                                               characterSelected.episode);
}

async function getCharacter(id) {
    let sectionURL = API_URL + "/character/";
    let data;

    let fullURL = sectionURL + id;

    const apiRequest = await fetch(fullURL);
    data = await apiRequest.json();        
    let currentCharacter = await data;

    return currentCharacter;
}

function characterBlock (image, name, status, species, gender, originName, locationName, episodeList) {
    let statusBlock;
    let episodesBlock = '';

    for (let ep of episodeList) {
        let episode = ep.replace("https://rickandmortyapi.com/api/episode/","");
        episodesBlock += `<div onclick="renderEpisode(${episode})" class="character__episode">${episode}</div>
        `;
    }

    if(status.toLowerCase() == 'alive'){
        statusBlock = `
        <div class="character__status alive">ALIVE</div>
        <div class="character__status">DEAD</div>
        <div class="character__status">UNKNOWN</div>
        `;
    } else if (status.toLowerCase() == 'dead') {
        statusBlock = `
        <div class="character__status">ALIVE</div>
        <div class="character__status dead">DEAD</div>
        <div class="character__status">UNKNOWN</div>
        `;
    } else if (status.toLowerCase() == 'unknown') {
        statusBlock = `
        <div class="character__status">ALIVE</div>
        <div class="character__status">DEAD</div>
        <div class="character__status unknown">UNKNOWN</div>
        `;
    }
    
    return `    
    <article class="character">
        <div class="character__profile">
            <div class="character__image">
                <img src="${image}" alt="" class="character__picture">
            </div>
            <p class="character__name">
                ${name.toUpperCase()}
            </p>
        </div>
        <div class="character__info-container">
            <div class="character__information">
                <div class="character__status-container">
                    <p class="character__category-text">STATUS</p>
                    <div class="character__status-result">
                        ${statusBlock}
                    </div>
                </div>
                <div class="character__details-container">
                    <div class="character__detail">
                        <p class="character__category-text">ESPECIE</p>
                        <div class="character__subtitle">${species}</div>
                    </div>
                    <div class="character__detail">
                        <p class="character__category-text">ORIGIN</p>
                        <div class="character__subtitle">${originName}</div>
                    </div>
                    <div class="character__detail">
                        <p class="character__category-text ">LOCATION</p>
                        <div class="character__subtitle purple">${locationName}</div>
                    </div>    
                </div>
                <div class="character__episodes-category">
                    <p class="character__category-text">EPISODE</p>
                    <div class="character__episodes-container">
                        ${episodesBlock}
                    </div>
                </div>
            </div>
        </div>
    </article>
`;
}
