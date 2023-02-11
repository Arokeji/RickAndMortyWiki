let locationsCurrentPage = 1;
let allLocationsHTML = '';

async function renderLocations(page, locationsFound) {

    allLocationsHTML = '';

    mainContainer.innerHTML = '' 
        + getSectionBlock("BUSCADOR DE LOCALIZACIONES")
        + searchLocationBlock;
    
        renderLocationsContent(page, locationsFound); 
}

async function renderLocationsContent (page, locationsFound) {
    let pageLocations;
    
    mainContainer.innerHTML += `
        <section class="locations">
        `;

    if (page != -1){
        pageLocations = await getLocations(page);

        mainContainer.innerHTML += `
            <div class="locations">
                ${getLocationsBlock(pageLocations)}
            </div>`;

        if(pageLocations.length == 20){
            mainContainer.innerHTML += `
            <div class="load" onclick="renderLocations(${locationsCurrentPage})">
                <span class="load__more">
                    + MAS
                </span>
            </div>`;
        }
            
    } else {
        mainContainer.innerHTML += `
            <div class="card">
                ${getLocationsBlock(locationsFound)}
            </div>`;
    }

    mainContainer.innerHTML += `
            </section>
        `;
        
}

function getLocationsBlock (pageLocations) {    
    for(let loc of pageLocations){

        allLocationsHTML += `
            <article class="locations__card">
                <div class="locations__name">
                    ${loc.name}
                </div>
                <div class="locations__duo">
                    <div class="locations__block">
                        <p class="locations__title">
                            TIPO
                        </p>
                        <p class="locations_result">
                            ${loc.type}
                        </p>
                    </div>
                    <div class="locations__spacer"></div>
                    <div class="locations__block">
                        <p class="locations__title">
                            DIMENSION
                        </p>
                        <p class="locations_result">
                            ${loc.dimension} 
                        </p>
                    </div>
                </div> 
                <div onclick="renderLocation(${loc.id})" class="locations__item">
                    + MAS DETALLES
                </div>
            </article>
        `;
        }

        return allLocationsHTML;
}


async function getLocations(page) {
    let sectionURL = API_URL + "/location/?page=";
    let allLocations = [];
    let dataLoc;

    if(!page){
        page = 1;
    }

    let fullURL = sectionURL + page;

    const apiRequest = await fetch(fullURL);
    dataLoc = await apiRequest.json();
    if(dataLoc.results !== undefined){
        allLocations = [...allLocations, ...mapLocations(await dataLoc.results)];
    locationsCurrentPage++;
    }
    
    return allLocations;
}

function mapLocations (dataLoc) {
    let dataMapped = dataLoc.map( loc => {
        let fullLocation = {
            id: loc.id,
            name: loc.name,
            type: loc.type,
            dimension: loc.dimension,
            url: loc.url
        }
        return fullLocation;
    })
    return dataMapped;
}

async function findLocation() {
    let sectionURL = API_URL + "/location/?page=";
    let allLocations = [];
    let data;
    let page = 0;

    do{
        let fullURL = sectionURL + page;
        const apiRequest = await fetch(fullURL);
        data = await apiRequest.json();
        allLocations = [...allLocations, ...mapLocations(await data.results)];
        page++;
    }while(data.info.next != null)

    let searchQuery = document.querySelector('.search__input').value;

    let locationsFound = allLocations.filter(char => {
            return char.name.toLowerCase().includes(searchQuery.toLowerCase());
        });

    allLocationsHTML = '';
    renderLocations(-1, locationsFound);
}

