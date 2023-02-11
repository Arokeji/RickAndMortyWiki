async function renderLocation(id) {

    mainContainer.innerHTML = '' 
        + getSectionBlock("LOCALIZACION");
    
    let locationDetails = await getLocation(id);

    console.log("Hola");

    mainContainer.innerHTML += await renderLocationContent(locationDetails);

}

async function renderLocationContent (locationDetails) {
    let locationBlock = '';

    locationBlock += `
        <section class="location">
            <div class="location__card">
            
                <div class="location__name">
                    ${locationDetails.name}
                </div>
                <div class="location__spacer">
                </div>

                <div class="location__info">
                    <div class="location__block">
                        <div class="location__details-container">
                            <div class="location__header">
                                TYPE
                            </div>
                            <div class="location__detail">
                                ${locationDetails.type}
                            </div>
                        </div>

                        <div class="location__details-container">
                            <div class="location__header">
                                ORIGIN
                            </div>
                            <div class="location__detail">
                                ${locationDetails.dimension}
                            </div>
                        </div>
                    </div>
                    <div class="location__characters-container">
                        <div class="location__header">
                            CHARACTERS
                        </div>
                        <div class="location__characters">
                    `;

    
    for(let loc of locationDetails.residents){

        let imgURL = API_URL + "/character/avatar/" + loc.replace("https://rickandmortyapi.com/api/character/","") + ".jpeg";

        locationBlock += `
            <div onclick="renderCharacter(${loc.replace("https://rickandmortyapi.com/api/character/","")})" class="location__profile">
                <img src="${imgURL}" alt="" class="episode__image">
            </div>
        `;
    }
    locationBlock += `
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    return locationBlock;
}

async function getLocation(id){
    let sectionURL = API_URL + "/location/";
    let locationData = [];
    let data;

    let fullURL = sectionURL + id;
    const apiRequest = await fetch(fullURL);
    data = await apiRequest.json();

    return data;
}