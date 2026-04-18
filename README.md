# Weblisk Templates

Official project templates for the [Weblisk](https://weblisk.dev) framework. Every file is plain HTML, CSS, or JavaScript — no build step, no template engine syntax. Open any file in a browser and it just works.

Used by the Weblisk CLI (`weblisk new`) and by the [Weblisk website](https://weblisk.dev/templates/index.html) to showcase live examples.

## Templates

| Template | Command | Description |
|----------|---------|-------------|
| **default** | `weblisk new my-app` | Minimal starter — counter island, service worker, 404 page |
| **blog** | `weblisk new --template blog` | Blog with posts, about page, theme toggle, dark mode |
| **dashboard** | `weblisk new --template dashboard` | Admin dashboard with stat cards, settings, live counter |
| **docs** | `weblisk new --template docs` | Documentation site with sidebar navigation and dark mode |

## Structure

Each template is a self-contained project directory:

```
default/                 ← base template for `weblisk new`
blog/                    ← `weblisk new --template blog`
dashboard/               ← `weblisk new --template dashboard`
docs/                    ← `weblisk new --template docs`
manifest.json            ← describes available templates
```

Inside every template:

```
template-name/
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

Every template demonstrates core Weblisk features out of the box — islands with lazy hydration (`data-island`, `data-hydrate`), reactive signals and effects, view transitions, service worker offline support, and accessibility.

## How It Works

Templates use sensible defaults that work without any processing:

- **Project name** defaults to "My App" — the CLI replaces it
- **Import maps** point to `https://cdn.weblisk.dev/` — works everywhere
- **No template syntax** — every file is valid HTML/CSS/JS

When the CLI creates a project it replaces:

1. `My App` / `my-app` → your project name
2. `https://cdn.weblisk.dev/` → `/lib/weblisk/` for local imports

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

## License

MIT — see [LICENSE](LICENSE)
