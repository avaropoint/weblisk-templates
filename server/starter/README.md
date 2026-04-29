# Starter

Minimal Weblisk server application — one page, one domain, one agent.

## What's included

- **Orchestrator** config at `.weblisk/config.yaml`
- **Gateway** serving `public/` at `:8080` with island routing
- **Greeting domain** with one workflow that dispatches to a greeter agent
- **Greeter agent** that returns a greeting message
- **HTML page** with a single island that renders the greeting

## Quick start

```bash
weblisk new my-app --template server/starter
cd my-app
weblisk server init --platform go
weblisk server start
# → http://localhost:8080
```

## What happens

1. The CLI copies this scaffold into your project
2. `server init` reads the YAML specs in `domains/` and `agents/`, sends them
   to your configured LLM along with the platform blueprint, and generates
   the implementation code
3. `server start` builds and starts all components (orchestrator, gateway,
   domain, agent)
4. The gateway serves `public/index.html` and routes island requests to the
   greeting domain, which dispatches to the greeter agent

## Files

```
.weblisk/config.yaml         Hub topology — ports, storage, components
public/
  index.html                 Landing page with one island
  css/styles.css             Minimal styles
domains/greeting/
  domain.yaml                Domain spec — workflows and island routing
agents/greeter/
  agent.yaml                 Agent spec — capabilities and actions
```

## Next steps

- Add more islands to `index.html`
- Create additional agents in `agents/`
- Add a client template: `weblisk new my-app --template client/default`
  then merge the `public/` directories
