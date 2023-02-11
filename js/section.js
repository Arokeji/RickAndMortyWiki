function getSectionBlock(sectionText) {

    return `
    <nav class="topper">
    <div class="topper__back">
            <span onclick="sectionSelector('HOME');" class="topper__arrow fa-solid fa-arrow-left"></span>
        </div>
        <div class="topper__mini-title">
            <p class="topper__title">RICK & MORTY</p>
            <p class="topper__subtitle">THE WIKI</p>
        </div>
    <div class="topper__space">
    </div>
    </nav>  
    <section class="section">
        <p class="section__name">
            ${sectionText}
        </p>
    </section>
    `;
}
