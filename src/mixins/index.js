export default {
    methods: {
        speak (text) {
            let msg = new SpeechSynthesisUtterance()
            // let voices = window.speechSynthesis.getVoices();
            // msg.voice = voices[10]; // Note: some voices don't support altering params
            msg.voice = speechSynthesis.getVoices().filter((voice) => {
                return voice.name === 'Google UK English Female'
            })[0]
            msg.voiceURI = 'native'
            msg.volume = 1 // 0 to 1
            msg.rate = 0.8 // 0.1 to 10
            msg.pitch = 1 // 0 to 2
            msg.text = text
            msg.lang = 'en-US'
            speechSynthesis.speak(msg)
        }
    }
}
