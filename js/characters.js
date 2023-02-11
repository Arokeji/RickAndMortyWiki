let charactersCurrentPage = 1;
let allCardsHTML = '';

function renderCharacters(page, charactersFound) {
    allCardsHTML = '';

    mainContainer.innerHTML = '' 
        + getSectionBlock("BUSCADOR DE PERSONAJES")
        + searchCharacterBlock;
    
    renderCharactersContent(page, charactersFound); 
}

async function renderCharactersContent (page, charactersFound) {
    let pageCharacters;
    
    if (page != -1){
        pageCharacters = await getCharacters(page);
        mainContainer.innerHTML += `
            <div class="card">
                ${getCardsBlock(pageCharacters)}
            </div>`;

        if(pageCharacters.length == 20){
            mainContainer.innerHTML += `
            <div class="load" onclick="renderCharacters(${charactersCurrentPage})">
                <span class="load__more">
                + MAS
                </span>
            </div>`;
        }
            
    } else {
        mainContainer.innerHTML += `
            <div class="card">
                ${getCardsBlock(charactersFound)}
            </div>`;
    }
}

function getCardsBlock (pageCharacters) {    
    for(let char of pageCharacters){
        let statusBlock;

        if(char.status.toLowerCase() == 'alive'){
            statusBlock = `
            <div class="card__status alive">${char.status.toUpperCase()}</div>
            `;
        } else if (char.status.toLowerCase() == 'dead') {
            statusBlock = `
            <div class="card__status dead">${char.status.toUpperCase()}</div>
            `;
        } else if (char.status.toLowerCase() == 'unknown') {
            statusBlock = `
            <div class="card__status unknown">${char.status.toUpperCase()}</div>
            `;
        }

        allCardsHTML += `
        <article class="card__item">
            <div class="card__top">
                <p class="card__name">${char.name.toUpperCase()}</p>
                    <div class="card__status alive">${statusBlock}</div>
            </div>
            <div class="card__details">
                <div class="card__image">
                        <img class="card__picture" src="${char.image}" alt="">
                </div>
                <div class="card__information">
                    <div class="card__species">
                            <p class="card__title">ESPECIE</p>
                            <p class="card__subtitle">${char.species}</p>
                    </div>
                    <div class="card__genre">
                        <p class="card__title">GENERO</p>
                        <p class="card__subtitle">${char.gender}</p>
                    </div>
                    <div class="card__origin">
                        <p class="card__title">ORIGEN</p>
                        <p class="card__subtitle">${char.origin.name}</p>
                    </div>
                    <div class="card__location">
                        <p class="card__title">LOCALIZACION</p>
                        <p class="card__subtitle">${char.location.name}</p>
                    </div>
                </div>
            </div>
            <div onclick="renderCharacter(${char.id})" class="card__more">
                <p class="card__more-text">
                    + MAS DETALLES
                </p>
            </div>
        </article>
        `;
        }

        return allCardsHTML;
}


async function getCharacters(page) {
    let sectionURL = API_URL + "/character/?page=";
    let allCharacters = [];
    let data;

    if(!page){
        page = 1;
    }

    let fullURL = sectionURL + page;

    const apiRequest = await fetch(fullURL);
    data = await apiRequest.json();
    if(data.results !== undefined){
        allCharacters = [...allCharacters, ...mapCharacters(await data.results)];
    charactersCurrentPage++;
    }
    
    return allCharacters;
}

function mapCharacters (data) {
    let dataMapped = data.map( char => {
        let fullCharacter = {
            id: char.id,
            name: char.name,
            status: char.status,
            species: char.species,
            type: char.type,
            gender: char.gender,
            origin: char.origin,
            location: char.location,
            image: char.image,
            episode: char.episode,
            url: char.url
        }
        return fullCharacter;
    })
    return dataMapped;
}

async function findCharacter() {
    let sectionURL = API_URL + "/character/?page=";
    let allCharacters = [];
    let data;
    let page = 0;

    do{
        let fullURL = sectionURL + page;
        const apiRequest = await fetch(fullURL);
        data = await apiRequest.json();
        allCharacters = [...allCharacters, ...mapCharacters(await data.results)];
        page++;
    }while(data.info.next != null)

    let searchQuery = document.querySelector('.search__input').value;

    let charactersFound = allCharacters.filter(char => {
            return char.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

    allCardsHTML = '';
    renderCharacters(-1, charactersFound);
}

