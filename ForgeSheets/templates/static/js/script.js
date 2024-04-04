const campaignAnchor = document.querySelector('.campaign');
const sheetsAnchor = document.querySelector('.sheets');

campaignAnchor.addEventListener("load", () => {
    sheetsAnchor.classList.remove('active');
    console.log('b')
    campaignAnchor.classList.add('active');
})
sheetsAnchor.addEventListener("load", () => {
    campaignAnchor.classList.remove('active');
    console.log('a')
    sheetsAnchor.classList.add('active');
})

