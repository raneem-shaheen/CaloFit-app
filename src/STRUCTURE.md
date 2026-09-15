# CaloFit source structure

The current project uses JavaScript and JSX, so new files follow the existing `.js` and `.jsx` convention. The architecture can be migrated to TypeScript by changing extensions and adding types without moving files.

| Folder | Purpose | What belongs here |
| --- | --- | --- |
| `assets` | Static visual resources | Images, fonts, local SVGs and icon assets. |
| `components` | App-wide UI | User menu, route guards and global shell components. |
| `config` | Runtime configuration | The only place that reads `import.meta.env`. |
| `core/base-api` | Network foundation | API provider, base service and query-client setup. |
| `core/constants` | Shared fixed values | Permission slugs, enums and option lists. |
| `core/helpers` | Pure utilities | Formatters, sorters and file-download helpers. |
| `core/routes` | Routing | The route table and lazy route wrappers. |
| `features/<feature>` | Feature UI | Pages, modals, table columns and feature-local styles. |
| `hooks` | Cross-feature hooks | URL table state, back navigation and reusable behavior. |
| `layouts` | Page shells | Dashboard layout, sidebar and responsive navigation. |
| `locales/<lang>` | Translation dictionaries | One matching translation JSON file per language. |
| `services/<feature>` | Feature data access | Service class, DTOs and React Query hooks. |
| `shared/components` | Reusable UI wrappers | Tables, forms, modals, loaders, errors and chart wrappers. |
| `shared/templates` | Reusable page patterns | List, report and detail page compositions. |
| `stores` | Client state | Small Zustand stores; persist only reload-safe state. |
| `themes` | Design system entry point | Color tokens and the single component-library theme. |

## Styling rules

`index.css` is the global foundation: variables, typography, reset and document defaults. `App.css` owns the dashboard composition and responsive layout. Future components should keep local styles beside the component and reuse the variables from `index.css`.

The palette uses deep forest ink, lime actions, pale blue data accents and warm orange highlights. `Space Grotesk` is used for headings and `DM Sans` for readable interface copy, with local fallbacks when fonts are unavailable.
