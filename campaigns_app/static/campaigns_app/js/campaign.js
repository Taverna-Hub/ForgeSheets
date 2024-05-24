const campaignCode = document.querySelector(".code")
const copyCodeBtn = document.querySelector(".copyCode")
const animationContainer = document.querySelector(".lottieAnimation")

const animationItem = bodymovin.loadAnimation({
  wrapper: animationContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://lottie.host/6175c2bc-23e9-48a3-a5f8-82ac2427f731/atQ5qM9sIA.json"
})

function handleCopyCodeToClipboard() {
  navigator.clipboard.writeText(campaignCode.textContent);
  animationContainer.classList.remove("hide");
  animationItem.setSpeed(2);
  animationItem.goToAndPlay(0, true);
}

copyCodeBtn.addEventListener("click", () => handleCopyCodeToClipboard())
animationItem.addEventListener("complete", () => {
  animationContainer.classList.add("hide");
})
