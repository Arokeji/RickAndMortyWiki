function renderBlock(section) {
    mainContainer.innerHTML = '' + section;
};

function linkInyector (className) {
    const elements = [...document.getElementsByClassName(className)];
    for (let e of elements) {
        e.addEventListener ('click', () => {
            sectionSelector (e.innerText);
        });
    }
}