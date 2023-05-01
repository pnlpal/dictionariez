import utils from "utils"
import message from "./message.coffee"

playAudios = (urls) ->
    return unless urls?.length
    
    _checkEnd = (audio) ->
        if (audio.ended) 
            return true
        
        await utils.promisifiedTimeout 200
        _checkEnd audio

    _play = (url) ->
        new Promise (resolve, reject) ->
            return resolve() if not url

            audio = new Audio(url)
            audio.oncanplay = ()->
                audio.play()
                # console.log url

            _checkEnd(audio).then resolve
    
    for url in urls
        await _play(url)

playSynthesis = ({text, lang, voice}) ->
    return if window.speechSynthesis.speaking
    msg = new SpeechSynthesisUtterance()
    msg.text = text
    msg.lang = lang if lang 

    if lang == 'en-US'
        voices = speechSynthesis.getVoices()
        msg.voice = voices.find((x) => x.name == voice) \
        || voices.find((x) => x.name == 'Google US English') \
        || voices.find((x) => x.lang == 'en-US' && x.name == 'Samantha') \
        || voices[0]

    window.speechSynthesis.speak(msg)

export default {
    play: playSynthesis

    init: () ->
        message.on 'play audios', ({ ameSrc, breSrc, otherSrc, checkSetting, synthesisObj}) ->
            if checkSetting 
                if not setting.getValue 'enableAmeAudio'
                    ameSrc = null
                if not setting.getValue 'enableBreAudio'
                    breSrc = null

                playAudios [ameSrc, breSrc ]
            
            if otherSrc
                playAudios [otherSrc]
            
            if synthesisObj
                playSynthesis synthesisObj

        
        message.on 'play synthesis', ({ text, lang }) ->
            playSynthesis text, lang 

}