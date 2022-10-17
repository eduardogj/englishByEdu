// Initialize new SpeechSynthesisUtterance object
let speech = new SpeechSynthesisUtterance();

// Set Speech Language
speech.lang = "en";

let voices = []; // global array of available voices
let englishVoice = [];


window.speechSynthesis.onvoiceschanged = () => {
  // Get List of Voices
  voices = window.speechSynthesis.getVoices();


speech.voice = voices[0];

  englishVoice = voices.filter(function(language){
    return language.lang == "en-US";
  })

// Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
let voiceSelect = document.querySelector("#voices");
englishVoice.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));

};

document.querySelector("#rate").addEventListener("input", () => {
  // Get rate Value from the input
  const rate = document.querySelector("#rate").value;

  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
  document.querySelector("#rate-label").innerHTML = "x" + rate;
});

// Deixar botão de volume desligado.
// document.querySelector("#volume").addEventListener("input", () => {
//   // Get volume Value from the input
//   const volume = document.querySelector("#volume").value;

//   // Set volume property of the SpeechSynthesisUtterance instance
//   speech.volume = 1;

//   // Update the volume label
//   document.querySelector("#volume-label").innerHTML = volume;
// });

document.querySelector("#voices").addEventListener("change", () => {
  speech.voice = englishVoice[document.querySelector("#voices").value];
});

document.querySelector("#start").addEventListener("click", () => {
  // Set the text property with the value of the textarea
  speech.text = document.querySelector("textarea").value;

  // Start Speaking
  window.speechSynthesis.speak(speech);

});
