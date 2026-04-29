# Blueprint Site

A complete website described entirely as blueprints. No hand-written
HTML, CSS, or JavaScript — everything is generated from YAML declarations.

## Quick Start

```bash
weblisk new my-site --template client/blueprint-site
cd my-site
weblisk build
weblisk dev
```

## Project Structure

```
blueprints/
  global.yaml         # Project identity, brand, policies
  code.yaml           # Code generation conventions
  theme.yaml          # Design tokens (colors, spacing, typography scales)
  pages/
    home.yaml         # Landing page with hero + features
    about.yaml        # About page with team section
  components/
    nav.yaml          # Site navigation
    footer.yaml       # Site footer
  islands/
    contact-form.yaml # Contact form (client-only, no agent needed)
  content/
    features.yaml     # Structured feature list
    team.yaml         # Team member data
assets/
  logo.svg            # Brand logo
```

## How It Works

1. **Edit blueprints** — Describe what you want in YAML
2. **Build** — `weblisk build` sends blueprints to the configured LLM
3. **Preview** — `weblisk dev` serves the generated output
4. **Iterate** — Change a blueprint, rebuild, preview instantly

The `public/` directory (generated output) is in `.gitignore`. Your
source of truth is `blueprints/`.

## Adding a Page

Create a new file in `blueprints/pages/`:

```yaml
# blueprints/pages/pricing.yaml
type: page
route: /pricing
title: "Pricing"
layout: default

sections:
  - type: content
    heading: "Simple pricing for everyone"
  - type: grid
    source: content/plans.yaml
    columns: 3
```

Then create the content it references:

```yaml
# blueprints/content/plans.yaml
items:
  - name: Starter
    price: Free
    features: [1 project, Community support]
  - name: Pro
    price: $29/mo
    features: [Unlimited projects, Priority support, Analytics]
  - name: Enterprise
    price: Custom
    features: [Everything in Pro, SLA, Dedicated agent]
```

Run `weblisk build` — the page exists.

## Adding Interactivity

Create an island blueprint:

```yaml
# blueprints/islands/newsletter.yaml
type: island
name: newsletter
protocol: none               # client-only (no agent)

fields:
  - name: email
    type: email
    required: true

behavior:
  validate: on-blur
  submit: mailto             # or: agent:newsletter-subscribe

ui:
  loading: none
  success: "Thanks! You're subscribed."
  error: "Please enter a valid email."
```

Reference it in a page:

```yaml
sections:
  - type: island
    blueprint: islands/newsletter
```

## Going Full Stack

To add server-side functionality:

1. Create `.weblisk/config.yaml` for hub configuration
2. Add `agents/` with agent YAML specs
3. Update island blueprints to reference agents
4. Run `weblisk server init` to generate server code

See the `server/starter` template for the server-side scaffold.

## Standards

This template follows the project standards documented in
[weblisk-blueprints/standards/](https://github.com/avaropoint/weblisk-blueprints/tree/main/standards).
