run:
	python -m SimpleHTTPServer

build:
	GOOS=js GOARCH=wasm go build -o scripts/wasm_client.wasm wasm_go_starter.go