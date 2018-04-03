var sayThis;
var wordList;

$(document).ready(function() {
    sayThis = $("#sayThis");
    wordList = $("#wordList");

    // chrome.tts.getVoices(
    //     function(voices) {
    //       for (var i = 0; i < voices.length; i++) {
    //         console.log('Voice ' + i + ':');
    //         console.log('  name: ' + voices[i].voiceName);
    //         console.log('  lang: ' + voices[i].lang);
    //         console.log('  gender: ' + voices[i].gender);
    //         console.log('  extension id: ' + voices[i].extensionId);
    //         console.log('  event types: ' + voices[i].eventTypes);
    //       }
    //     });

    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        var string = selection[0];
        if (string.length > 0) {
            sayThis.val(string);
        }
    });

    $('#speak').click(function(event){
        chrome.tts.stop();
        if (sayThis.val()) {
            chrome.tts.speak(sayThis.val(), {
                rate : 0.8,
                lang: "ko-KR",
                voiceName: "Google 한국의",
                onEvent: function(event) {
                    // console.log(event.type);
                }
            });
        }
    });

    sayThis.focus(function(event){
        chrome.tts.stop();
    });
});