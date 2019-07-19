all:
	npm run asbuild
	chisel run
	wasm2wat build/optimized.wasm -o build/optimized.wast

