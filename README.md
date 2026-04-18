# Weblisk Templates

Official project templates for the [Weblisk](https://weblisk.dev) framework. Used by the Weblisk CLI to scaffold projects, generate pages, and create island components.

## Structure

```
scaffold/       Full-page templates used during `weblisk new`
page/           Standalone page templates for `weblisk add page`
island/         Island component templates for `weblisk add island`
core/           Core files included in every scaffold (CSS, SW, env)
templates.json  Manifest defining template sets and categories
```

## Template Sets

| Set | Description | Pages |
|-----|-------------|-------|
| `default` | Minimal starter | home, 404 |
| `blog` | Blog with posts | home, 404, blog, about |
| `dashboard` | Dashboard app | home, 404, dashboard, settings |
| `docs` | Documentation site | home, 404, docs |

## Usage

The Weblisk CLI resolves templates from multiple sources in order:

1. **Local project** — `./templates/` in your project directory
2. **Custom sources** — repos listed in `WL_TEMPLATE_SOURCES`
3. **Core** — this repository (always present as fallback)

Local templates override core templates with the same name, allowing full customization without forking.

### Custom Template Sources

```bash
export WL_TEMPLATE_SOURCES="https://github.com/your-org/your-templates.git"
weblisk new my-app --template blog
```

## Template Variables

All `.tpl` files use Go `text/template` syntax:

| Variable | Description |
|----------|-------------|
| `{{.Name}}` | Project or component name |
| `{{.Title}}` | Title-cased display name |
| `{{.TitleLower}}` | Lowercase title |
| `{{.Year}}` | Current year |
| `{{.CDNBase}}` | Framework CDN base URL |
| `{{.Port}}` | Dev server port |

## Creating Custom Templates

1. Create a Git repository with the same directory structure
2. Add a `templates.json` manifest (optional — files are discovered by convention)
3. Set `WL_TEMPLATE_SOURCES` to your repo URL
4. Your templates take priority over the defaults

## License

MIT — see [LICENSE](LICENSE)
