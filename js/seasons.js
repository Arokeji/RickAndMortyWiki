let allSeasonsHTML = '';

function renderSeasons() {

    allSeasonsHTML = '';

    mainContainer.innerHTML = '' 
        + getSectionBlock("TEMPORADAS");
    
    renderSeasonsContent(); 
}

async function renderSeasonsContent () {
    
    let allSeasons = await getSeasons();

    mainContainer.innerHTML += `
        <section class="episodes">
            ${getSeasonsCardsBlock(allSeasons)}
        </section>`;

}

function getSeasonsCardsBlock (allSeasons) {

    let currentSeason = 0;
    
    for(let season of allSeasons){   
        let currentBlock = season.episode.split("");
        let lastAirDate;
        let episodesListBlock = '';

        if(parseInt(currentBlock[1] + currentBlock[2]) !== currentSeason){
            currentSeason = parseInt(currentBlock[1] + currentBlock[2]);

            let newSeasonBlock = `
                <article class="episodes__card">
                    <div class="episodes__season">
                        SEASON ${currentSeason}
                    </div>
                    <p class="episodes__title">
                        DATE
                    </p>
                    <p class="episodes_date">
                        ${season.date} - 
                `;

            let episodesListStart = `
                </p>
                <p class="episodes__title">
                    EPISODES
                </p>
                    `;
            
            for(let ep of allSeasons){
                let currentSeasonComparison = ep.episode.split("");
                if(parseInt(currentSeasonComparison[1] + currentSeasonComparison[2]) == currentSeason){
                    episodesListBlock += `
                    <div onclick="renderEpisode(${ep.id})" class="episodes__item">
                        ${ep.name}
                    </div>
                    `;

                    lastAirDate = ep.date;
                }
            }

            allSeasonsHTML += newSeasonBlock;
            allSeasonsHTML += lastAirDate;
            allSeasonsHTML += episodesListStart;
            allSeasonsHTML += episodesListBlock;
            allSeasonsHTML += `</article>`;
        }
    }
    
    return allSeasonsHTML;
}

async function getSeasons() {
    let sectionURL = API_URL + "/episode/?page=";
    let allSeasons = [];
    let data;

    page = 1

    do{
    let fullURL = sectionURL + page;
    const apiRequest = await fetch(fullURL);
    data = await apiRequest.json();
    allSeasons = [...allSeasons, ...mapSeasons(await data.results)];
    page++;

    }while(data.info.next != null);

    return allSeasons;
}

function mapSeasons (data) {
    let dataMapped = data.map( season => {
        let fullSeason = {
            id: season.id,
            name: season.name,
            episode: season.episode,
            characters: season.characters,
            url: season.url,
            date: season.air_date
        }
        return fullSeason;
    })
    return dataMapped;
}