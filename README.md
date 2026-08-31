<p align="center">
  <img src="public/icons/icon128.png" width="96" height="96" alt="Nice Speed Dials logo" />
</p>

<h1 align="center">Nice Speed Dials</h1>

<p align="center">
  Open your favorite sites from a new tab built on browser bookmarks.
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

Nice Speed Dials replaces the default new-tab page with a grid of links you
choose. Drag them into order, group them in folders, and adjust the layout or
background to fit your setup.

Each speed dial is a browser bookmark. You can edit the same links in your
browser's bookmark manager, and your browser can sync them between devices when
bookmark sync is enabled.

## Features

- Add, edit, copy, reorder, or delete a speed dial.
- Sort links into nested folders and move through them with breadcrumbs.
- Give each folder an icon from the built-in searchable library.
- Open every link in a folder, including links in its subfolders.
- Save the current page from the browser's right-click menu.
- Change the background, grid, dial size, corner radius, title visibility, dark
  mode, and link behavior.
- Use the same bookmark-backed setup in Chrome, Firefox, or Edge.

## Bookmarks and privacy

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
No Nice Speed Dials account is required, and the project does not run a server
that stores your bookmarks.

Firefox does not provide the favicon feature used by Chromium browsers. On
Firefox, Nice Speed Dials sends the hostname of each saved site to FaviconKit so
it can display that site's icon. The extension does not include analytics.

Read the full [privacy policy](PRIVACY.md).

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
- [Ark UI](https://ark-ui.com/) for accessible interface primitives.
- [Tailwind CSS](https://tailwindcss.com/) for styling and owned design tokens.
- `solid-dnd-directive` for drag-and-drop ordering.
- `lucide-solid` for interface and folder icons.
- Browser Bookmarks, Storage, Tabs, and Context Menus APIs for native browser
  integration.

## Architecture

```text
New-tab page
  └─ SolidJS components
      ├─ bookmark and folder store ──> Browser Bookmarks API
      ├─ settings store ─────────────> Extension local storage
      └─ modal and UI state

Background entry point
  └─ browser context menus ──────────> bookmarks and settings
```

The bookmark tree is the source of truth. The stores read it through browser
APIs and listen for bookmark changes made inside or outside the extension.

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

| Command              | Purpose                           |
| -------------------- | --------------------------------- |
| `yarn prepare`       | Generate WXT project files        |
| `yarn dev`           | Start Chrome development mode     |
| `yarn dev:firefox`   | Start Firefox development mode    |
| `yarn build`         | Create a production Chrome build  |
| `yarn build:firefox` | Create a production Firefox build |
| `yarn zip`           | Package the Chrome extension      |
| `yarn zip:firefox`   | Package the Firefox extension     |
| `yarn zip:edge`      | Package the Edge extension        |
| `yarn zip:all`       | Package Chrome, Firefox, and Edge |
| `yarn format`        | Format the project with Prettier  |

Generated files are written to `.wxt` and `.output`. They are not source files
and should not be committed.

## Project structure

```text
src/
├── components/       Application and reusable UI components
├── entrypoints/      WXT new-tab and background entry points
├── stores/           Bookmarks, folders, settings, and modal state
├── index.css         Tailwind entry point and shared design tokens
└── utils/            Shared utility functions
```

Static extension assets live in `public`. WXT and Tailwind CSS are configured
from files in the repository root. Store copy is in `DESCRIPTION.md`; release
notes are in `CHANGELOG.md`.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

- [Report a bug](https://github.com/kruzkasu223/nice-speed-dials-extension/issues/new)
- [Request a feature](https://github.com/kruzkasu223/nice-speed-dials-extension/issues/new)
- [View the changelog](CHANGELOG.md)

<!-- ## Roadmap

- Import and export speed dials.
- Continue improving keyboard and assistive-technology support.
- Add more organization and customization options based on user feedback. -->

## License

Nice Speed Dials is licensed under the
[GNU General Public License v3.0 only](LICENSE).
