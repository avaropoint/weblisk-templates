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
| **client/starter** | `weblisk new my-site` | Client website built entirely from blueprints |
| **server/starter** | `weblisk new --template server/starter` | Minimal server hub with one domain and one agent |

## Structure

```
client/
  starter/                   ← default template for `weblisk new`
    blueprints/
      global.yaml            ← project identity, brand, policies
      code.yaml              ← code generation conventions
      theme.yaml             ← design tokens (colors, spacing, type)
      pages/
        home.yaml            ← landing page with hero + features
        about.yaml           ← about page with team section
      components/
        nav.yaml             ← site navigation
        footer.yaml          ← site footer
      islands/
        contact-form.yaml    ← interactive contact form (client-only)
      content/
        features.yaml        ← structured feature list
        team.yaml            ← team member data
    assets/
      logo.svg               ← brand logo

server/
  starter/                   ← minimal server hub
    .weblisk/config.yaml     ← hub topology (ports, components)
    public/                  ← static files served by gateway
    domains/greeting/
      domain.yaml            ← domain spec (workflows, island routing)
    agents/greeter/
      agent.yaml             ← agent spec (capabilities, actions)

manifest.json                ← describes available templates
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

Server templates are declarative YAML specifications:

1. `.weblisk/config.yaml` defines the hub topology
2. `domains/*/domain.yaml` defines domain controllers
3. `agents/*/agent.yaml` defines agent capabilities
4. `weblisk server init --platform go` generates the implementation
5. `weblisk server start` runs the hub

### Combined

Layer client + server together:

```bash
weblisk new my-app
weblisk new --template server/starter --merge
```

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
