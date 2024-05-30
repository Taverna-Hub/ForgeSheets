const openAddCampaign = document.querySelector(".createCampaign");
const cancelAddCampaignModalBtn = document.querySelector("#cancelAddCampaign");
const modalCreateCampaign = document.querySelector(".modal-create-campaign")

function handleOpenAddCampaignModal(){
    modalCreateCampaign.style.display = 'flex'
}
function handleCloseAddCampaignModal(){
    modalCreateCampaign.style.display = 'none'
}

function disableButton() {
    const button = document.getElementById("submit_button");
    button.disabled = true;
}


openAddCampaign?.addEventListener("click", () => handleOpenAddCampaignModal())
cancelAddCampaignModalBtn?.addEventListener("click", () => handleCloseAddCampaignModal())