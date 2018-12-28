var Porcupine = (function () {
    /**
     * Binding for wake word detection object. It initializes the JS binding for WebAssembly module and exposes
     * a factory method for creating new instances of wake word engine.
     */

    var initWasm;
    var releaseWasm;
    var processWasm;
    var sampleRate;
    var frameLength;
    var version;

    var porcupineModule = PorcupineModule();
    porcupineModule.then(function(Module) {
        initWasm = Module.cwrap('pv_porcupine_wasm_init', 'number', ['number', 'number', 'number', 'number']);
        releaseWasm = Module.cwrap('pv_porcupine_wasm_delete', ['number']);
        processWasm = Module.cwrap('pv_porcupine_wasm_process', 'number', ['number', 'number']);
        sampleRate = Module.cwrap('pv_wasm_sample_rate', 'number', [])();
        frameLength = Module.cwrap('pv_porcupine_wasm_frame_length', 'number', [])();
        version = Module.cwrap('pv_porcupine_wasm_version', 'string', [])();
    });

    var create = function (keywordIDs, sensitivities) {
        /**
         * Creates an instance of wake word detection engine (aka porcupine).
         * @param {Array} Array of keyword IDs. A keyword ID is the signature for a given phrase to be detected. Each
         * keyword ID should be stored as UInt8Array.
         * @param {Float32Array} Detection sensitivity. A higher sensitivity reduces miss rate at the cost of higher
         * false alarm rate. Sensitivity is a number within [0, 1].
         * @returns An instance of wake word detection engine.
         */
        var keywordIDSizes = Int32Array.from(keywordIDs.map(keywordID => keywordID.byteLength));
        var keywordIDSizesPointer = porcupineModule._malloc(keywordIDSizes.byteLength);
        var keywordIDSizesBuffer = new Uint8Array(porcupineModule.HEAPU8.buffer, keywordIDSizesPointer, keywordIDSizes.byteLength);
        keywordIDSizesBuffer.set(new Uint8Array(keywordIDSizes.buffer));

        var keywordIDPointers = Uint32Array.from(keywordIDs.map(keywordID => {
            var heapPointer = porcupineModule._malloc(keywordID.byteLength);
            var heapBuffer = new Uint8Array(porcupineModule.HEAPU8.buffer, heapPointer, keywordID.byteLength);
            heapBuffer.set(keywordID);
            return heapPointer;
        }));

        var keywordIDPointersPointer = porcupineModule._malloc(keywordIDPointers.byteLength);
        var keywordIDPointersBuffer = new Uint8Array(
            porcupineModule.HEAPU8.buffer,
            keywordIDPointersPointer,
            keywordIDPointers.byteLength);
        keywordIDPointersBuffer.set(new Uint8Array(keywordIDPointers.buffer));

        var sensitivitiesPointer = porcupineModule._malloc(sensitivities.byteLength);
        var sensitivitiesBuffer = new Uint8Array(porcupineModule.HEAPU8.buffer, sensitivitiesPointer, sensitivities.byteLength);
        sensitivitiesBuffer.set(new Uint8Array(sensitivities.buffer));

        var handleWasm = initWasm(
            keywordIDs.length,
            keywordIDSizesPointer,
            keywordIDPointersPointer,
            sensitivitiesPointer);
        if (handleWasm === 0) {
            throw new Error("failed to initialize porcupine.");
        }

        var pcmWasmPointer = porcupineModule._malloc(this.frameLength * 2);

        var release = function () {
            /**
             * Releases resources acquired by WebAssembly module.
             */

            releaseWasm(handleWasm);
            porcupineModule._free(pcmWasmPointer);
        };

        var process = function (pcmInt16Array) {
            /**
             * Processes a frame of audio. The required sample rate can be retrieved from .sampleRate and the length of
             * frame (number of samples within frame) can be retrieved from .frameLength.
             * @param {Int16Array} A frame of audio with properties described above.
             * @returns {Number} Index of detected keyword (phrase). When no keyword is detected it returns -1.
             */

            var pcmWasmBuffer = new Uint8Array(porcupineModule.HEAPU8.buffer, pcmWasmPointer, pcmInt16Array.byteLength);
            pcmWasmBuffer.set(new Uint8Array(pcmInt16Array.buffer));

            var keyword_index = processWasm(handleWasm, pcmWasmPointer);
            if (keyword_index === -2) {
                throw new Error("porcupine failed to process audio");
            }

            return keyword_index;
        };

        return {
            release: release,
            process: process,
            sampleRate: sampleRate,
            frameLength: frameLength,
            version: version
        }
    };

    return {create: create}
})();
