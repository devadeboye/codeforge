PROTOC ?= /opt/homebrew/bin/protoc

.PHONY: dev build test lint proto format

proto:
	@echo "Validating Protocol Buffers..."
	@$(PROTOC) --proto_path=libs/proto --descriptor_set_out=/dev/null libs/proto/*.proto
	@echo "Protobuf definitions are valid."

dev:
	pnpm dev

build:
	pnpm build

test:
	pnpm test

lint:
	pnpm lint

format:
	pnpm format
