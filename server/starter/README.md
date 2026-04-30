# Starter (Full Stack)

A complete Weblisk project — the same website as `client/starter`, but
backed by a server hub with agents that handle the interactive parts.

## What's Different from `client/starter`?

| | `client/starter` | `server/starter` |
|---|---|---|
| **Blueprints** | Same pages, components, content | Same pages, components, content |
| **Islands** | `protocol: none` (client-only) | `protocol: agent` (server-backed) |
| **Server** | None — static site only | Hub with domain + contact agent |
| **Contact form** | `mailto:` fallback | Agent validates, stores, notifies |
| **Deploy** | Any static host | Weblisk hub (Go, Cloudflare, Node, Rust) |

If you just want a static site, use `client/starter`. If you want
server-side processing, use this template.

## Quick Start

```bash
weblisk new my-app --template server/starter
cd my-app
weblisk build                          # generate client from blueprints
weblisk server init --platform go      # generate server from specs
weblisk server start                   # start the hub
# → http://localhost:8080
```

## Project Structure

```
blueprints/                  ← same as client/starter (YAML → generated HTML/CSS/JS)
  global.yaml                ← project identity, brand, policies
  code.yaml                  ← code generation conventions
  theme.yaml                 ← design tokens
  pages/
    home.yaml                ← landing page (hero + features + contact form)
    about.yaml               ← about page (team section)
  components/
    nav.yaml                 ← responsive navigation
    footer.yaml              ← site footer
  islands/
    contact-form.yaml        ← contact form (protocol: agent — server-backed)
  content/
    features.yaml            ← feature list data
    team.yaml                ← team member data
assets/
  logo.svg                   ← brand logo

.weblisk/config.yaml         ← hub topology (orchestrator, gateway, domains, agents)
domains/website/
  domain.yaml                ← website domain (contact workflow, island routing)
agents/contact/
  agent.yaml                 ← contact agent (validate, store, notify)
```

## How It Works

1. **Blueprints** describe the website (pages, components, islands, content)
2. **`weblisk build`** generates the site into `public/` from blueprints
3. **Domain spec** declares the workflows that handle island interactions
4. **Agent spec** declares what the contact agent does (validate, store, notify)
5. **`weblisk server init`** reads specs + platform blueprint → generates server code
6. **Gateway** serves `public/` and routes island requests to the website domain
7. **Website domain** dispatches to the contact agent when the form is submitted

## The Contact Flow

```
User fills form → Island sends to gateway
                    → Gateway routes to website domain
                      → Domain triggers contact workflow
                        → Contact agent validates + stores + notifies
                          → Response flows back to island
                            → Island shows success message
```

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
