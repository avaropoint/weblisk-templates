# Starter (Full Stack)

Extends `client/starter` with a server hub — same website, but the
interactive parts (islands) are backed by server agents.

**Targets:** Same Lighthouse 100, WCAG AA, SEO/AEO/AIO compliance as
`client/starter` — plus server-side form processing with validation and storage.

## How Extends Works

This template uses `extends: client/starter` in `project.yaml`. All
blueprints (global, code, theme, pages, components, content, assets)
are inherited from the client template. Only **overrides** and
**additions** live here:

| File | Purpose |
|---|---|
| `project.yaml` | Declares `extends: client/starter` + server mode |
| `blueprints/islands/contact-form.yaml` | Overrides protocol: none → agent |
| `.weblisk/config.yaml` | Hub topology (gateway, domain, agent, health check) |
| `domains/website/domain.yaml` | Workflow routing for islands |
| `agents/contact/agent.yaml` | Contact form processing agent |

## What's Different from `client/starter`?

| | `client/starter` | `server/starter` |
|---|---|---|
| **Islands** | `protocol: none` (client-only) | `protocol: agent` (server-backed) |
| **Server** | None — static site only | Hub with domain + contact agent |
| **Contact form** | `mailto:` fallback | Agent validates + stores |
| **Deploy** | Any static host | Weblisk hub (Go, Cloudflare, Node, Rust) |

## Quick Start

```bash
weblisk new my-app --template server/starter
cd my-app
weblisk build                          # generate client from blueprints
weblisk server init --platform go      # generate server from specs
weblisk server start                   # start the hub
# → http://localhost:8080
# → http://localhost:8080/healthz (health check)
```

## Project Structure

```
project.yaml                 ← extends: client/starter (inherits all blueprints)
blueprints/
  islands/
    contact-form.yaml        ← OVERRIDE: protocol: agent (server-backed)
.weblisk/
  config.yaml                ← hub topology (orchestrator, gateway, domains, agents)
domains/website/
  domain.yaml                ← website domain (contact workflow, island routing)
agents/contact/
  agent.yaml                 ← contact agent (validate, store)
```

Everything else (pages, components, content, theme, assets) is inherited
from `client/starter` via the extends mechanism.

## How It Works

1. **`extends: client/starter`** pulls in all blueprints (pages, components, content, theme)
2. **Island override** changes contact-form from `protocol: none` → `protocol: agent`
3. **`weblisk build`** generates the site into `public/` (same as client, but island posts to server)
4. **Domain spec** declares the workflows that handle island interactions
5. **Agent spec** declares what the contact agent does (validate, store)
6. **`weblisk server init`** reads specs + platform blueprint → generates server code
7. **Orchestrator** registers the domain and agent, manages lifecycle
8. **Gateway** serves `public/` and routes island requests to the website domain
9. **Website domain** dispatches to the contact agent when the form is submitted

## The Contact Flow

```
User fills form → Island sends POST to gateway (/islands/home/contact-form)
                    → Gateway routes to website domain (port 9700)
                      → Domain triggers contact workflow
                        → Contact agent validates + stores (port 9710)
                          → Response flows back to island
                            → Island shows success message
```

## Production Checklist

Before deploying, update `.weblisk/config.yaml`:

- **CORS:** Set `origins` to your production domain
- **TLS:** Set `tls: true` or use a reverse proxy
- **Auth:** Configure gateway auth (`token`, `session`, etc.)
- **Storage:** Switch orchestrator `storage` from `memory` to persistent
- **Rate limit:** Adjust `rate_limit` for expected traffic

## Going Further

- Add more islands (newsletter signup, search, auth)
- Add more agents (content, analytics, notifications)
- Add more domains (blog, admin, api)
- Wire islands to agents with `protocol: agent` in the island blueprint

## Blueprint Reference

This template follows the standards and architecture documented in
[weblisk-blueprints](https://github.com/avaropoint/weblisk-blueprints):

- [architecture/domain.md](https://github.com/avaropoint/weblisk-blueprints/blob/main/architecture/domain.md) — Domain controller spec
- [architecture/agent.md](https://github.com/avaropoint/weblisk-blueprints/blob/main/architecture/agent.md) — Agent spec
- [standards/islands.md](https://github.com/avaropoint/weblisk-blueprints/blob/main/standards/islands.md) — Island blueprint standard
- [schemas/config.md](https://github.com/avaropoint/weblisk-blueprints/blob/main/schemas/config.md) — Hub configuration schema
