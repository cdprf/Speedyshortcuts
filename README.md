<p align="center">
  <img src="public/icons/icon128.png" width="96" height="96" alt="Nice Speed Dials logo" />
</p>

<h1 align="center">Nice Speed Dials</h1>

<p align="center">
  A fast, calm, and customizable new-tab page powered by your browser bookmarks.
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/nice-speed-dials/igdancpfkcmgelecddchfeijbofdcnaa">
    <img src="readme/chrome.png" height="58" alt="Available in the Chrome Web Store" />
  </a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/nice-speed-dials/">
    <img src="readme/firefox.png" height="58" alt="Get the Firefox Add-on" />
  </a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/nice-speed-dials/ipdcfhnakfnmchdkpboeakmijafmgnjm">
    <img src="readme/edge.png" height="58" alt="Get it from Microsoft Edge Add-ons" />
  </a>
</p>

Nice Speed Dials replaces the default new-tab page with an organized launchpad
for the sites you use most. Create speed dials, arrange them with drag and drop,
group them into nested folders, and personalize the page without handing your
bookmark data to a project-owned server.

Your speed dials are real browser bookmarks. They remain visible in the browser
bookmark manager and can follow you between devices when bookmark sync is
enabled.

## Highlights

- Create, edit, duplicate, reorder, and delete speed dials.
- Organize links in nested folders with clickable breadcrumb navigation.
- Pick searchable Lucide icons for folders.
- Open every link in a folder hierarchy at once.
- Save the current webpage from the browser context menu.
- Customize the background, grid columns, dial size, corner radius, title
  visibility, dark mode, and link behavior.
- Keep speed dials in browser bookmarks instead of a project-owned server.
- Use keyboard-friendly dialogs and accessible controls.
- Use the extension across Chrome, Firefox, and Edge.

## How your data is stored

Nice Speed Dials creates and manages this folder in your browser bookmarks:

```text
NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]
```

Every bookmark and folder inside it appears on the new-tab page. Changes made
through the browser's bookmark manager are reflected in the extension as well.

> [!IMPORTANT]
>
> Do not delete this folder unless you also want to delete your speed dials. The
> extension can recreate an empty folder, but it cannot recover deleted
> bookmarks.

Speed-dial bookmarks can sync through the browser's bookmark-sync feature.
Visual preferences and custom folder icons are kept in local extension storage.
Nice Speed Dials does not operate a server for storing your speed-dial data.

<!-- Firefox does not expose Chrome's built-in favicon API, so the Firefox build
currently requests website icons from FaviconKit using the saved website's
hostname. -->

## Browser support

| Browser | Manifest | Development             | Package            |
| ------- | -------- | ----------------------- | ------------------ |
| Chrome  | V3       | `yarn dev`              | `yarn zip`         |
| Firefox | V3       | `yarn dev:firefox`      | `yarn zip:firefox` |
| Edge    | V3       | Chrome-compatible build | `yarn zip:edge`    |

## Technology

- [SolidJS](https://www.solidjs.com/) and TypeScript for the application.
- [WXT](https://wxt.dev/) for extension entry points, development, and
  multi-browser builds.
- [Park UI](https://park-ui.com/) and [Ark UI](https://ark-ui.com/) for
  accessible interface primitives.
- [Panda CSS](https://panda-css.com/) and SCSS modules for styling and themes.
- `solid-dnd-directive` for drag-and-drop ordering.
- `lucide-solid` for interface and folder icons.
- Browser Bookmarks, Storage, Tabs, and Context Menus APIs for native browser
  integration.

## Architecture at a glance

```text
New-tab page
  └─ SolidJS components
      ├─ bookmark and folder store ──> Browser Bookmarks API
      ├─ settings store ─────────────> Extension local storage
      └─ modal and UI state

Background entry point
  └─ browser context menus ──────────> bookmarks and settings
```

The bookmark tree is the source of truth for speed dials. Components read from
the stores, and the stores coordinate browser APIs and listen for bookmark
changes made inside or outside the extension.

## Local development

### Requirements

- A modern version of Node.js
- [Yarn Classic](https://classic.yarnpkg.com/) 1.x
- Chrome, Firefox, or Edge

### Set up

```sh
git clone https://github.com/kruzkasu223/nice-speed-dials-extension.git
cd nice-speed-dials-extension
yarn install
yarn dev
```

Use `yarn dev:firefox` instead when developing in Firefox. WXT watches the
source files and rebuilds the extension. Automatic browser launch is disabled,
so load `.output/chrome-mv3` or `.output/firefox-mv3/manifest.json` through the
browser's extension-development page.

Development builds use a separate bookmark folder so they do not interfere with
the published extension:

```text
DEV_NICE_SPEED_DIALS_BOOKMARKS_[DO_NOT_DELETE]
```

### Load a production build manually

For Chrome or Edge:

1. Run `yarn build`.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode**.
4. Choose **Load unpacked** and select `.output/chrome-mv3`.

For Firefox:

1. Run `yarn build:firefox`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Choose **Load Temporary Add-on**.
4. Select `.output/firefox-mv3/manifest.json`.

## Available commands

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `yarn prepare`       | Generate Panda CSS and WXT project files |
| `yarn dev`           | Start Chrome development mode            |
| `yarn dev:firefox`   | Start Firefox development mode           |
| `yarn build`         | Create a production Chrome build         |
| `yarn build:firefox` | Create a production Firefox build        |
| `yarn zip`           | Package the Chrome extension             |
| `yarn zip:firefox`   | Package the Firefox extension            |
| `yarn zip:edge`      | Package the Edge extension               |
| `yarn zip:all`       | Package Chrome, Firefox, and Edge        |
| `yarn format`        | Format the project with Prettier         |

Generated files are written to `.wxt`, `.output`, and `styled-system`. They are
not source files and should not be committed.

## Project structure

```text
src/
├── components/       Application and reusable UI components
├── entrypoints/      WXT new-tab and background entry points
├── stores/           Bookmarks, folders, settings, and modal state
├── styles/           Component-level SCSS modules
├── theme/            Panda CSS tokens and shared styles
└── utils/            Shared utility functions
```

Static extension assets live in `public`, while WXT, Panda CSS, and Park UI are
configured from the files in the repository root. Store-facing copy is kept in
`DESCRIPTION.md`, and user-facing release notes live in `CHANGELOG.md`.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup,
coding guidelines, validation steps, and pull-request expectations.

- [Report a bug](https://github.com/kruzkasu223/nice-speed-dials-extension/issues/new)
- [Request a feature](https://github.com/kruzkasu223/nice-speed-dials-extension/issues/new)
- [View the changelog](CHANGELOG.md)

<!-- ## Roadmap

- Import and export speed dials.
- Continue improving keyboard and assistive-technology support.
- Add more organization and customization options based on user feedback. -->

## License

Nice Speed Dials is released under the MIT License.
