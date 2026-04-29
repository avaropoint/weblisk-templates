# Weblisk Templates

Official project templates for the [Weblisk](https://weblisk.dev) framework. Client templates are plain HTML, CSS, and JavaScript — no build step, no template engine syntax. Server templates are YAML specs that the CLI + LLM generates into runnable code.

Used by the Weblisk CLI (`weblisk new`) and by the [Weblisk website](https://weblisk.dev/templates/index.html) to showcase live examples.

## Templates

### Client

Client-only templates. Every file is valid HTML/CSS/JS — open in a browser and it works.

| Template | Command | Description |
|----------|---------|-------------|
| **default** | `weblisk new my-app` | Minimal starter — counter island, service worker, 404 page |
| **blog** | `weblisk new --template client/blog` | Blog with posts, about page, theme toggle, dark mode |
| **dashboard** | `weblisk new --template client/dashboard` | Admin dashboard with stat cards, settings, live counter |
| **docs** | `weblisk new --template client/docs` | Documentation site with sidebar navigation and dark mode |

### Server

Server templates include hub configuration, domain specs, and agent specs. The CLI reads the YAML specs and dispatches to the configured LLM to generate platform-specific code (Go, Cloudflare Workers, etc.).

| Template | Command | Description |
|----------|---------|-------------|
| **starter** | `weblisk new --template server/starter` | Minimal server — orchestrator, gateway, one domain, one agent |

### Both

Want client + server together? Layer them:

```bash
weblisk new my-app --template client/blog --template server/starter
```

The client's files and the server's `public/` files merge naturally — client templates provide the pages and islands, server templates provide the backend infrastructure.

## Structure

```
client/                      ← client-only templates
  default/                   ← base template for `weblisk new`
  blog/                      ← blog starter
  dashboard/                 ← admin dashboard starter
  docs/                      ← documentation site starter

server/                      ← server templates (YAML specs → LLM-generated code)
  starter/                   ← minimal server hub

manifest.json                ← describes all available templates
```

### Client template structure

```
client/template-name/
├── index.html               ← home page
├── 404.html                 ← not-found page
├── css/styles.css           ← app styles + dark mode
├── js/islands/
│   ├── shell.js             ← bootstraps Weblisk + registers SW
│   └── *.js                 ← island components
├── sw.js                    ← service worker (offline fallback)
├── .env                     ← Weblisk CLI config
└── .gitignore
```

### Server template structure

```
server/template-name/
├── .weblisk/config.yaml     ← hub topology (ports, components)
├── public/                  ← static files served by gateway
│   ├── index.html
│   └── css/styles.css
├── domains/<name>/
│   └── domain.yaml          ← domain spec (workflows, island routing)
├── agents/<name>/
│   └── agent.yaml           ← agent spec (capabilities, actions)
└── README.md
```

Every client template demonstrates core Weblisk features out of the box — islands with lazy hydration (`data-island`, `data-hydrate`), reactive signals and effects, view transitions, service worker offline support, and accessibility.

## How It Works

**Client templates** use sensible defaults that work without any processing:

- **Project name** defaults to "My App" — the CLI replaces it
- **Import maps** point to `https://cdn.weblisk.dev/` — works everywhere
- **No template syntax** — every file is valid HTML/CSS/JS

When the CLI creates a project it replaces:

1. `My App` / `my-app` → your project name
2. `https://cdn.weblisk.dev/` → `/lib/weblisk/` for local imports

**Server templates** are declarative specs, not generated code:

1. `.weblisk/config.yaml` defines the hub topology
2. `domains/*/domain.yaml` defines domain controllers (workflows, island routing)
3. `agents/*/agent.yaml` defines agent capabilities and actions
4. `weblisk server init --platform go` reads these specs, sends them to the LLM along with the [platform blueprint](https://github.com/avaropoint/weblisk-blueprints/tree/main/platforms), and generates the implementation
5. The generated code is committed to the project — no further build steps

## Template Resolution

The CLI resolves templates from multiple sources in priority order:

1. **Local project** — `./templates/` in your project directory
2. **Custom sources** — repos listed in `WL_TEMPLATE_SOURCES`
3. **Core** — this repository (always present as fallback)

Local templates override core templates by matching the same path.

## Creating Custom Templates

1. Create a Git repository with the same directory structure
2. Add a `manifest.json` (optional — files are discovered by convention)
3. Set `WL_TEMPLATE_SOURCES` to your repo URL
4. Your templates take priority over the defaults

## Related Projects

| Repo | Purpose |
|------|---------|
| [weblisk](https://github.com/avaropoint/weblisk) | Client-side JS runtime |
| [weblisk-cli](https://github.com/avaropoint/weblisk-cli) | CLI that uses these templates |
| [weblisk-blueprints](https://github.com/avaropoint/weblisk-blueprints) | Server framework specification |

## License

MIT — see [LICENSE](LICENSE)
