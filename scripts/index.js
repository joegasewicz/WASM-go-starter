import "./wasm_exec.js";

if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
        const source = await (await resp).arrayBuffer();
        return await WebAssembly.instantiate(source, importObject);
    };
}

const go = new Go();
WebAssembly.instantiateStreaming(fetch("scripts/wasm_client.wasm"), go.importObject)
    .then((result) => {
        return WebAssembly.instantiate(result.module, go.importObject);
    })
    .then(instance => go.run(instance));