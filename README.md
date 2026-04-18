# Weblisk Templates

Official project templates for the [Weblisk](https://weblisk.dev) framework. Every file is plain HTML, CSS, or JavaScript — no build step, no template engine syntax. Open any file in a browser and it just works.

Used by the Weblisk CLI to scaffold projects, and by the Weblisk website to showcase live examples.

## Structure

```
scaffold/           Self-contained project starters (one directory per set)
  default/          Minimal starter — home + 404
  blog/             Blog with posts and about page
  dashboard/        Dashboard with settings panel
  docs/             Documentation site with sidebar
pages/              Standalone page templates for `weblisk add page`
islands/            Island component templates for `weblisk add island`
init/               Project config files (.env, .gitignore)
manifest.json       Describes available templates and their metadata
```

Each scaffold set is a complete, runnable project directory.

Every template demonstrates core Weblisk features out of the box — islands with lazy hydration, reactive signals, theme switching, view transitions, service worker offline support, and accessibility.

## How It Works

Templates use sensible defaults that work without any processing:

- **Project name** defaults to "My App" — the CLI replaces it on scaffold
- **Import maps** point to `https://cdn.weblisk.dev/` — works everywhere
- **Year** is rendered with `<span class="wl-year">` + inline JS — always current
- **No template syntax** — every file is valid HTML/CSS/JS

When the CLI scaffolds a project, it does two simple string replacements:

1. `My App` / `my-app` → your project name
2. `https://cdn.weblisk.dev/` → `/lib/weblisk/` (only when `--local` is used)

## Template Resolution

The CLI resolves templates from multiple sources in priority order:

1. **Local project** — `./templates/` in your project directory
2. **Custom sources** — repos listed in `WL_TEMPLATE_SOURCES`
3. **Core** — this repository (always present as fallback)

Local templates override core templates by matching the same path.

## Using on the Weblisk Website

Every scaffold set can be embedded or linked directly. The files use the CDN import map by default, so they render in any browser:

```html
<iframe src="/templates/scaffold/blog/app/blog.html"></iframe>
```

Source code can be displayed alongside the live preview to show exactly how each page was built.

## Creating Custom Templates

1. Create a Git repository with the same directory structure
2. Add a `manifest.json` (optional — files are discovered by convention)
3. Set `WL_TEMPLATE_SOURCES` to your repo URL
4. Your templates take priority over the defaults

## License

MIT — see [LICENSE](LICENSE)
