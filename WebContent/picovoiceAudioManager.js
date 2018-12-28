navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var PicovoiceAudioManager = (function() {
    const inputBufferLength = 2048;

    var inputSampleRate;
    var engine;
    var processCallback;
    var isProcessing = false;

    var inputAudioBuffer = [];

    var process = function(inputAudioFrame) {
        if (!isProcessing) {
            return;
        }

        for (var i = 0 ; i < inputAudioFrame.length ; i++) {
            inputAudioBuffer.push((inputAudioFrame[i]) * 32767);
        }

        while(inputAudioBuffer.length * engine.sampleRate / inputSampleRate > engine.frameLength) {
            var result = new Int16Array(engine.frameLength);
            var bin = 0;
            var num = 0;
            var indexIn = 0;
            var indexOut = 0;

            while(indexIn < engine.frameLength) {
                bin = 0;
                num = 0;
                while(indexOut < Math.min(inputAudioBuffer.length, (indexIn + 1) * inputSampleRate / engine.sampleRate)) {
                    bin += inputAudioBuffer[indexOut];
                    num += 1;
                    indexOut++;
                }
                result[indexIn] = bin / num;
                indexIn++;
            }

            processCallback(engine.process(result));

            inputAudioBuffer = inputAudioBuffer.slice(indexOut);
        }
    };

    var getUserMediaSuccessCallback = function(stream) {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();

        var audioSource = audioContext.createMediaStreamSource(stream);

        inputSampleRate = audioSource.context.sampleRate;

        var engineNode = audioSource.context.createScriptProcessor(inputBufferLength, 1, 1);
        engineNode.onaudioprocess = function(ev) { process(ev.inputBuffer.getChannelData(0)); };
        audioSource.connect(engineNode);
        engineNode.connect(audioSource.context.destination);
    };

    this.start = function(picovoiceEngine, picovoiceProcessCallback, errorCallback) {
        if (!navigator.getUserMedia) {
            errorCallback("this browser does not support audio capture");
        }

        navigator.getUserMedia({audio: true}, getUserMediaSuccessCallback, errorCallback);

        engine = picovoiceEngine;
        processCallback = picovoiceProcessCallback;
        isProcessing = true;
    };

    this.stop = function() {
        isProcessing = false;
        inputAudioBuffer = [];
    };
});
