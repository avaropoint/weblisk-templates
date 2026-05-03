# Weblisk Templates

Official project templates for the [Weblisk](https://weblisk.dev) framework.
Templates are **blueprints, not code** — YAML declarations that the CLI
compiles into production-ready HTML, CSS, and JavaScript via LLM generation.

No hand-written code is checked in. The source of truth is always `blueprints/`.

## Philosophy

```
YAML blueprints → LLM generation → HTML/CSS/JS output
(source code)      (compiler)       (build artifact)
```

Templates demonstrate how to build with the Weblisk blueprint model:

1. **Describe** — Write YAML that declares what the site should be
2. **Generate** — `weblisk build` compiles blueprints into production code
3. **Ship** — Serve directly, no bundler, no framework lock-in

## Templates

| Template | Command | Description |
|----------|---------|-------------|
| **client/starter** | `weblisk new my-site` | Static website — blueprints only, no server |
| **server/starter** | `weblisk new --template server/starter` | Extends client/starter with a server hub |

Both templates build the **same website** (landing page, about page,
contact form). The difference is how the interactive parts work:

| | `client/starter` | `server/starter` |
|---|---|---|
| Pages & components | Blueprints → generated HTML/CSS | Inherited via `extends` |
| Contact form island | `protocol: none` (mailto fallback) | `protocol: agent` (server-backed) |
| Server infrastructure | None | Hub + domain + contact agent |
| Deployment | Any static host | Weblisk hub |

**Both templates target:**
- Lighthouse 100 across Performance, Accessibility, Best Practices, SEO
- WCAG 2.2 AA compliance
- Full structured data (WebSite, Organization, FAQ, BreadcrumbList, speakable)
- SEO/AEO/AIO optimization (answer engines, AI discovery)
- Deterministic generation (same blueprints → same output every time)
- Weblisk v2 client library via import maps (zero build step)

**Choose `client/starter`** if you want a static site with no server.
**Choose `server/starter`** if you want server-side processing (validation, storage).

## Structure

```
client/
  starter/                   ← default template for `weblisk new`
    blueprints/
      global.yaml            ← project identity, brand, policies
      code.yaml              ← code generation conventions
      theme.yaml             ← design tokens, scales, focus styles, dark mode
      pages/
        home.yaml            ← landing: hero, features, contact — structured data
        about.yaml           ← about: content, team — breadcrumbs
      components/
        nav.yaml             ← navigation: skip-to-content, focus trap, variants
        footer.yaml          ← footer: brand, links, contact, copyright
      islands/
        contact-form.yaml    ← contact form: validation, accessibility, data schema
      content/
        features.yaml        ← feature list with icon alt text
        team.yaml            ← team data with avatar/social placeholders
      assets/
        logo.yaml            ← logo variants, favicon generation, PWA manifest
        media.yaml           ← font loading strategy, responsive image rules
    assets/
      logo.svg               ← brand logo (32x32 SVG)

server/
  starter/                   ← extends client/starter (no duplication)
    project.yaml             ← declares extends: client/starter
    blueprints/
      islands/
        contact-form.yaml    ← OVERRIDE: protocol: agent (server-backed)
    .weblisk/config.yaml     ← hub topology (orchestrator, gateway, domains, agents)
    domains/website/
      domain.yaml            ← website domain (contact workflow, island routing)
    agents/contact/
      agent.yaml             ← contact agent (validate, store)

manifest.json                ← describes available templates + extends relationships
```

## How It Works

### Client templates

Client templates contain only blueprints and static assets. When the CLI
creates a project:

1. Template files are copied to your project directory
2. `{{name}}` / `{{domain}}` placeholders are replaced with your values
3. `weblisk build` sends blueprints to the configured LLM
4. The LLM generates the site into `public/` (gitignored)
5. `weblisk dev` serves the output with hot reload

### Server templates

Server templates **extend** client templates — they don't duplicate them.
The `extends` mechanism resolves the base template's blueprints and allows
selective overrides:

1. `project.yaml` declares `extends: client/starter`
2. All blueprints are resolved from the base (pages, components, content, theme, assets)
3. Only overridden files live in the server template (e.g., island with `protocol: agent`)
4. `weblisk build` generates the client site from the merged blueprint tree
5. `.weblisk/config.yaml` defines the hub topology
6. `domains/*/domain.yaml` defines workflows and island routing
7. `agents/*/agent.yaml` defines agent capabilities and actions
8. `weblisk server init --platform go` generates the server implementation
9. `weblisk server start` runs the hub (gateway serves `public/` + routes islands to agents)

## Template Resolution

The CLI resolves templates from multiple sources in priority order:

1. **Local project** — `./templates/` in your project directory
2. **Custom sources** — repos listed in `WL_TEMPLATE_SOURCES`
3. **Core** — this repository (always present as fallback)

## Creating Custom Templates

1. Create a Git repository with the same directory layout
2. Add a `manifest.json` (optional — discovered by convention)
3. Set `WL_TEMPLATE_SOURCES` to your repo URL
4. Your templates take priority over the defaults

## Related Projects

| Repo | Purpose |
|------|---------|
| [weblisk-blueprints](https://github.com/avaropoint/weblisk-blueprints) | Framework specification and architecture |
| [weblisk](https://github.com/avaropoint/weblisk) | Client-side JS runtime |
| [weblisk-cli](https://github.com/avaropoint/weblisk-cli) | CLI that uses these templates |

## License

MIT — see [LICENSE](LICENSE)
