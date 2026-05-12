<!--
 @since 2025.08.13
 @changed 2025.08.13, 15:23
-->

# Action - Turning Cards Interactive - Vercel Hosted Vite React Application

[The VLOOKUP trainer applicaiton](https://action-cards-interactive.vercel.app/) is implemented via React, Vite, TS, and Tailwind, deployed to Vercel. Developed for Russian company [Action Academy](https://academy.action-mcfr.ru/).

It's a simple pharmacy wahrehouse trainer.

![Application banner](public/opengraph-image.jpg 'Application banner')

## Build info (auto-generated)

- Project info: v.0.0.2 / 2026.05.12 14:00:23 +0300

## Resources

- Vercel deployed app: https://action-cards-interactive.vercel.app/
- Repository: https://github.com/lilliputten/action-cards-interactive/

## Workspace

Core resources:

- Client entry point (react app): [src/main.tsx](src/main.tsx).
- Client template: [index.html](index.html).
- Client-side core component: [src/components/PharmaStore/PharmaStoreScreen.tsx](src/components/PharmaStore/PharmaStoreScreen.tsx).

## Installation

Just run `pnpm install --frozen-lockfile` to install all the dependencies.

Set up local [environent variables](#environent-variables) (not required).

## Environent variables

The application environent variables could be provided by the environment (from github actions or vercel environment setup) or be set in the local `.env` file (see a template in [.env.SAMPLE](.env.SAMPLE));

- `VITE_NO_STRICT_MODE`: Disable react strict mode (causes double hooks' invocations).

## Local development

Run local development server via a command:

```bash
pnpm dev
```

-- It will start the server app locally, on a port 5173.

## Maintenance tools

Run prettier and all the linters:

```bash
pnpm check-all
```

Run tests:

```bash
pnpm test
```

## See also

- [Changelog](CHANGELOG.md)
