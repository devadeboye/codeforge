# CodeForge

A real-time collaborative code editor with a cyberpunk/hacker aesthetic, sandboxed code execution, and a microservices backend — built to showcase engineering excellence.

![CodeForge UI Mockup](offline-assets/ui-mockup.jpg)

---

## Overview

CodeForge is a web-based IDE that allows multiple users to edit code simultaneously with zero data loss. Think VS Code meets Google Docs, wrapped in a cyberpunk Dracula theme with neon-glow cursors and glassmorphism UI.

**Key Features:**

- **Real-time collaboration** — CRDT-powered multi-user editing via Yjs
- **Live presence** — Neon-glow cursors with user labels and remote selections
- **Sandboxed execution** — Run code in ephemeral Docker containers (Node.js, Python, Go, Rust)
- **File explorer** — Recursive folder tree with glassmorphism styling
- **Integrated terminal** — Xterm.js terminal with real-time output streaming
- **Cyberpunk aesthetic** — Dracula palette, neon effects, Fira Code ligatures

---

## Architecture

CodeForge is a monorepo with a React SPA frontend and 5 backend microservices:

```
Browser (React + Vite)
       |
       v
  API Gateway --gRPC--> User Service (Auth)
  (Fastify)   --gRPC--> Project Service (Metadata)
              --WS----> Sync Service (CRDT Collaboration)
              --WS----> Execution Service (Code Runner)
```

| Service | Stack | Purpose |
|---------|-------|---------|
| **API Gateway** | Node.js / Fastify | Thin routing proxy, rate limiting, JWT validation |
| **User Service** | Node.js / Fastify / Prisma | Auth, JWT, OAuth (GitHub/Google), profiles |
| **Project Service** | Node.js / Fastify / Prisma | Project/file CRUD, permissions, metadata |
| **Sync Service** | Node.js / Fastify / WebSocket | Yjs CRDT rooms, presence, event relay |
| **Execution Service** | Go | Sandboxed Docker container code execution |

**Infrastructure:** PostgreSQL, Redis (Pub/Sub), Docker, Kubernetes.

---

## Tech Stack and Design Decisions

### Why React + Vite instead of Next.js?

CodeForge is a full-screen IDE in the browser — a pure single-page application. Every core component is inherently client-side only:

- CodeMirror 6 (the editor) cannot be server-side rendered.
- Xterm.js (the terminal) is browser-only.
- Yjs (CRDT sync) runs entirely in the browser over WebSockets.
- Presence and cursor state are purely client-side.

With Next.js, over 90% of components would require the `"use client"` directive. We'd be fighting the framework rather than benefiting from it. Next.js's core value — server-side rendering, server components, SEO optimization — provides zero benefit for an authenticated IDE where there's nothing to index and nothing to render on the server.

React + Vite gives us near-instant HMR during development, a leaner bundle with no unused framework overhead, simple static deployment (build to files, serve from a CDN or nginx), and a simpler mental model with no server/client component boundary to reason about.

Knowing when *not* to use Next.js is a stronger engineering signal than defaulting to it for everything.

### Why CodeMirror 6 instead of Monaco Editor?

For a collaborative editor with a custom cyberpunk aesthetic, CodeMirror 6 is the technically superior choice.

**Collaboration.** CodeMirror 6's internal document model is based on immutable state and transactions — a design that maps naturally to CRDT operations. Collaboration was a first-class design goal of the editor. Monaco's internals were not designed with this in mind, and its Yjs binding (`y-monaco`) works but sits on top of architecture that wasn't built for concurrent editing.

**Custom cursors.** The cyberpunk mockup requires neon-glow cursors with user labels like "Alex", "Neo", and "Trinity". CodeMirror gives full CSS control over cursor rendering, making this straightforward. With Monaco, achieving the same effect requires CSS hacks that fight the editor's internal rendering and risk breaking on updates.

**Bundle size.** CodeMirror 6 ships at roughly 200KB for a full setup. Monaco ships at 5-10MB. In a collaborative setting where we want fast initial load and may have multiple editors open, the difference matters.

**Theming.** CodeMirror 6 uses CSS variables for theming, giving us full flexibility to implement the Dracula + cyberpunk aesthetic exactly as designed. Monaco uses JSON-based theme configs, which are more limited.

**The trade-off we accept:** we lose Monaco's built-in IntelliSense (autocomplete, type hints, go-to-definition). For the MVP, the hero features are collaborative editing, live presence, and the cyberpunk UI — not IDE-grade autocomplete. Language Server Protocol (LSP) integration can be added later if needed.

### Why gRPC for internal communication?

All service-to-service communication (Gateway to User Service, Gateway to Project Service, Sync to Project Service) uses gRPC with Protocol Buffers instead of HTTP/REST.

**Performance.** The API Gateway translates incoming REST requests to gRPC calls. If we used HTTP/REST internally, every request would go through double JSON serialization and deserialization at the Gateway. gRPC's binary protocol eliminates this overhead.

**Contract safety.** The `.proto` files in `libs/proto/` are the single source of truth for all service APIs. If a service changes its response shape, the generated client stubs won't compile until the consumer updates. This prevents silent API drift, which is a real risk across 5 services.

**Auto-generated stubs.** Type-safe client and server code is generated directly from the proto definitions — no hand-written HTTP clients or request/response boilerplate.

**Go natural fit.** The Execution Service is written in Go, where gRPC is a first-class citizen with excellent tooling and performance.

Browser-facing communication remains HTTP/REST and WebSocket, since those are the protocols browsers speak natively.

---

## Project Structure

```
codeforge/
├── apps/ui/              # React + Vite frontend (SPA)
├── services/
│   ├── gateway/          # API Gateway (Fastify, gRPC client)
│   ├── user/             # User Service (Fastify, Prisma, gRPC server)
│   ├── project/          # Project Service (Fastify, Prisma, gRPC server)
│   ├── sync/             # Sync Service (Fastify, WebSocket, gRPC client)
│   └── execution/        # Execution Service (Go, Docker)
├── libs/
│   ├── proto/            # Protobuf definitions (.proto files)
│   ├── shared-types/     # Shared TypeScript types
│   └── eslint-config/    # Shared linting config
├── k8s/                  # Kubernetes manifests
├── docker-compose.yaml   # Local dev orchestration
├── Makefile              # Dev commands
└── README.md
```

---

## Getting Started

Setup instructions will be added as services are implemented. The project is under active development.

### Prerequisites

- Node.js 20+
- Go 1.22+
- Docker and Docker Compose
- pnpm
- buf CLI (for protobuf compilation)

### Quick Start

```bash
# Clone the repo
git clone https://github.com/devadeboye/codeforge.git
cd codeforge

# Install dependencies
pnpm install

# Generate gRPC stubs from proto definitions
make proto

# Start all services (PostgreSQL, Redis, and 5 microservices)
make dev

# Start the frontend
cd apps/ui && pnpm dev
```

---

## License

MIT
