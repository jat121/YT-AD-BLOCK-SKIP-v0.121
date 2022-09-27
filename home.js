const b = document.getElementById("text");
const heading = document.getElementById("heading");
const speaker = document.getElementById("speaker");
const tool = document.getElementById("tool");

chrome.storage.sync.get(["skipTime"], (res) => {
    let count = res.skipTime ?? 1;
    heading.innerHTML = `Skipped <b>${count}</b> Ads till now <br> Saved ${count * 15 > 60 ? `${Math.ceil(count * 15 / 60)} Fat Minutes` : "Fat seconds"} for you!!`
});
speaker.addEventListener("click", () => {
    speaker.style.backgroundColor = "black"
    tool.style.opacity = 1;
    tool.style.transform = `translateY("-10px")`;
    tool.innerText = "I'm Speaking....."

    chrome.tts.speak(`
    सुनो भाइयों और बहेनों अब   बिना विज्ञापनों के youtube देखें और मौज करें
    `, {
        lang: "hi-IN", rate: 0.75,
        onEvent: function (event) {
            console.log('Event ' + event.type + ' at position ' + event.charIndex);
            if (event.type == 'end') {
                console.log('Error: ' + event);
                speaker.style.backgroundColor = `rgba(168,164,164,0.3)`
                tool.style.opacity = 0;
                tool.style.transform = ``;
                tool.innerText = "Click and Listen!"
            }
        }
    })
})


