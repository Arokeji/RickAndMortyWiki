async function renderEpisode(id) {
    
    mainContainer.innerHTML = '' 
        + getSectionBlock("EPISODIO");
    
    let episodeDetails = await getEpisode(id);

    mainContainer.innerHTML += await renderEpisodeContent(episodeDetails);

}

async function renderEpisodeContent (episodeDetails) {
    let episodeBlock = '';

    episodeBlock += `
        <section class="episode">
            <div class="episode__card">
            
                <div class="episode__name">
                    ${episodeDetails.name}
                </div>
                <div class="episode__spacer">
                </div>

                <div class="episode__info">
                    <div class="episode__block">
                        <div class="episode__details-container">
                            <div class="episode__header">
                                EPISODE
                            </div>
                            <div class="episode__detail">
                                ${episodeDetails.episode}
                            </div>
                        </div>

                        <div class="episode__details-container">
                            <div class="episode__header">
                                DATE
                            </div>
                            <div class="episode__detail">
                                ${episodeDetails.air_date}
                            </div>
                        </div>
                    </div>
                    <div class="episode__characters-container">
                        <div class="episode__header">
                            CHARACTERS
                        </div>
                        <div class="episode__characters">
                    `;

    
    for(let char of episodeDetails.characters){

        let imgURL = API_URL + "/character/avatar/" + char.replace("https://rickandmortyapi.com/api/character/","") + ".jpeg";

        episodeBlock += `
            <div onclick="renderCharacter(${char.replace("https://rickandmortyapi.com/api/character/","")})" class="episode__profile">
                <img src="${imgURL}" alt="" class="episode__image">
            </div>
        `;
    }
    episodeBlock += `
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;

    return episodeBlock;
}

async function getEpisode(id){
    let sectionURL = API_URL + "/episode/";
    let episodeData = [];
    let data;

    let fullURL = sectionURL + id;
    const apiRequest = await fetch(fullURL);
    data = await apiRequest.json();
    //episodeData = mapEpisode(await data);

    return data;
}

