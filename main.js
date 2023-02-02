const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent

let recognition = new SpeechRecognition()
let speechRecognitionList = new SpeechGrammarList()

recognition.continuous = false;
recognition.lang = 'ko-KR'
recognition.interimResults = false
recognition.maxAlternatives = 1

const hints = document.getElementById("hints")
const area = document.getElementById("sp-area")
const diagnostic = area

document.body.onclick = () => {
    recognition.start()
    hints.style.visibility = "hidden"
    console.log("음성을 인식할 준비가 되었어요")
}

recognition.onresult = (event) => {
    const result = event.results[0][0].transcript
    area.textContent = result
    console.log("Confidence " + event.results[0][0].confidence)
}

recognition.onspeechend = () => {
    recognition.stop()
}

recognition.onnomatch = function(event) {
    diagnostic.textContent = '음성을 인식하지 못했어요'
}

recognition.onerror = (event) => {
    diagnostic.textContent = "Error occurred in recognition: " + event.error
}
