const campaignCode = document.querySelector(".code")
const copyCodeBtn = document.querySelector(".copyCode")
const animationContainer = document.querySelector(".lottieAnimation")

const animationItem = bodymovin.loadAnimation({
  wrapper: animationContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://lottie.host/26330495-d39a-4ab0-bbbf-e23167a9d999/erjBn76wJ1.json"
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
