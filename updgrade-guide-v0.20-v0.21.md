
## v0.20.0 &rarr; v0.21.0

This release focuses on trimming WXT's install footprint and simplifying project configuration.

:::tip
Read through all the changes once before updating your code.
:::

### Install Footprint

When installing `wxt` v0.20, it downloaded 98 MB and 366 packages to your `node_modules`. v0.21 cuts this down to 22MB / 156 packages - that's 22.4% the previous size! This is a good improvement, but frankly, not good enough. Why?

- `wxt init` is slow for new developers trying it out
- Less exposure to supply chain attacks
- More compute and storage used by servers hosting the package and clients downloading it degrades hardware and shortens their life-cycle

If you want to explore WXT's dependencies and why it's so large, here's a few links:

- <https://pkg-size.dev/wxt@%5E0.21?no-peers>
- <https://npmgraph.js.org/?q=wxt@^0.21>
- <https://node-modules.dev/grid/depth#install=wxt@^0.21>

We'll continue working on minimizing WXT's install footprint.

### Minimum Node.js, Vite, and TypeScript Versions

| Tool       | Old requirement                   | New requirement                    |
| ---------- | --------------------------------- | ---------------------------------- |
| Node.js    | `>=20.12.0`                       | `>=22`                             |
| Vite       | `^5.4.19 \|\| ^6.3.4 \|\| ^7.0.0` | `^6.3.4 \|\| ^7.0.0 \|\| ^8.0.0-0` |
| TypeScript | Not enforced                      | `>=5.4`                            |

Vite 5 support was dropped as part of moving WXT's dev server off `vite-node` and onto Vite's native `ModuleRunner`/Environment API, which requires Vite &ge;6.3.4.

### `vite`, `web-ext`, and `typescript` Are Now Peer Dependencies

Previously, WXT installed its own copies of `vite` and `web-ext` for you (you never had to add them to your `package.json`). Now, all three are declared as [`peerDependencies`](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#peerdependencies) instead of regular dependencies, so **your project controls the exact version that gets used**, and WXT's install size shrinks.

- `vite` is a **required** peer, add it to your `devDependencies`.
- `web-ext` and `typescript` are **optional** peers, only needed if you use the corresponding features (see [below](#opt-into-opening-the-browser-during-dev-mode) for `web-ext`).

```sh
pnpm add -D vite typescript
```

### Opt Into Opening the Browser During Dev Mode

In v0.21, `web-ext` is now an optional peer dependency - if it's installed, the browser will be opened automatically. If not, the feature is disabled.

- **To continue opening the browser automatically**: Install `web-ext` as a dependency

  ```sh
  pnpm add -D web-ext
  ```

- **If you don't use this feature**: Don't install it and you can delete any `web-ext.config.ts` options and/or remove any `webExt.enabled: false` config

You can still disable this behavior by setting `webExt.enabled: false` in your `wxt.config.ts` file or `web-ext.config.ts` file if the package is present.

> Projects created with `wxt init` will include `web-ext` in their `package.json`, opting new projects into this feature by default.

### `.wxt/tsconfig.json` Compiler Option Changes

The generated `.wxt/tsconfig.json` was updated to match Vite's current recommended TypeScript settings, and now requires **TypeScript &ge;5.4**.

```jsonc
{
  "compilerOptions": {
    "lib": ["ESNext", "DOM", "DOM.Iterable"], // [!code ++]
    "target": "ESNext",
    "module": "ESNext", // [!code --]
    "module": "Preserve", // [!code ++]
    "moduleDetection": "force", // [!code ++]
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true, // [!code ++]
    "verbatimModuleSyntax": true, // [!code ++]
    "noEmit": true,
    "esModuleInterop": true, // [!code --]
    "forceConsistentCasingInFileNames": true, // [!code --]
    "resolveJsonModule": true, // [!code --]
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true, // [!code ++]
    "noUncheckedIndexedAccess": true, // [!code ++]
    "noImplicitOverride": true, // [!code ++]
  },
}
```

If these changes do cause problems, `verbatimModuleSyntax` and `noUncheckedIndexedAccess` are the two most likely culprits. It's recommended you fix the issues and leave the new settings enabled.

However, if you want to revert the config back and upgrade to the recommended options at a later time, you can add the following to your `wxt.config.ts` file:

<details>

```ts
export default defineConfig({
  hooks: {
    'prepare:tsconfig': (_, { tsconfig }) => {
      // Reverts TSConfig back to WXT v0.20
      // - https://wxt.dev/guide/resources/upgrading.html#wxttsconfigjson-compiler-option-changes
      delete tsconfig.lib;
      tsconfig.module = 'ESNext';
      delete tsconfig.moduleDetection;
      delete tsconfig.allowImportingTsExtensions;
      delete tsconfig.verbatimModuleSyntax;
      tsconfig.esModuleInterop = true;
      tsconfig.forceConsistentCasingInFileNames = true;
      tsconfig.resolveJsonModule = true;
      delete tsconfig.noFallthroughCasesInSwitch;
      delete tsconfig.noUncheckedIndexedAccess;
      delete tsconfig.noImplicitOverride;
    },
  },
});
```

</details>

### `url:` Imports Removed

The `url:` import feature (importing and bundling remote code by URL, e.g. `import 'url:https://code.jquery.com/jquery.js'`) has been removed due to the supply-chain risk of a compromised CDN silently injecting code into your build.

There is no config flag to restore this behavior. If you relied on it:

- **Prefer an NPM package** if one exists for the library you need.
- **Vendor the file**: download it once, commit it to your repo, and import it locally like any other file. This lets you review the code and track changes via version control, instead of trusting a URL to never change.

:::details Why was this removed?
See <https://github.com/wxt-dev/wxt/issues/2262> and <https://github.com/wxt-dev/wxt/issues/2229> for the full discussion. A proposal to restore this behind a mandatory integrity hash is being tracked in [#2514](https://github.com/wxt-dev/wxt/pull/2514); if there's enough demand, it may come back as a separate, opt-in WXT module instead of core.
:::

### Zip Filename Template Changes

The default filename templates for `zip.artifactTemplate` and `zip.sourcesTemplate` changed, and the <span v-pre>`{{version}}`</span> template variable's meaning changed:

- <span v-pre>`{{version}}`</span> now always resolves to `manifest.version` (previously it resolved to `manifest.version_name ?? manifest.version`).
- A new <span v-pre>`{{versionName}}`</span> variable was added with the old <span v-pre>`{{version}}`</span> behavior (`manifest.version_name ?? manifest.version`).
- A new <span v-pre>`{{packageVersion}}`</span> variable was added, resolving to your `package.json`'s version.
- A new <span v-pre>`{{modeSuffix}}`</span> variable was added (`-dev` for development builds, `''` for production).

The defaults themselves changed to use these new variables:

```diff
- artifactTemplate: '{{name}}-{{version}}-{{browser}}.zip'
+ artifactTemplate: '{{name}}-{{packageVersion}}-{{browser}}{{modeSuffix}}.zip'

- sourcesTemplate: '{{name}}-{{version}}-sources.zip'
+ sourcesTemplate: '{{name}}-{{packageVersion}}-sources{{modeSuffix}}.zip'
```

- **If you don't customize `artifactTemplate`/`sourcesTemplate`**: your production zip filenames will not change, but dev and other build modes will be output to separate directories.

  > If you previously install the dev version of your extension in your browser, note that the output directory has changed and you'll need to re-install it next time you run the dev command.

- **If you have a custom template**: replace any <span v-pre>`{{version}}`</span> usage with <span v-pre>`{{versionName}}`</span> to keep the old value, or explicitly opt back into the old defaults:

  ```ts [wxt.config.ts]
  export default defineConfig({
    zip: {
      artifactTemplate: '{{name}}-{{versionName}}-{{browser}}.zip',
      sourcesTemplate: '{{name}}-{{versionName}}-sources.zip',
    },
  });
  ```

For more info on the difference between `manifest.version` and `manifest.version_name`, see the [Manifest Config docs](/guide/essentials/config/manifest#version-and-version-name).

### Sources ZIP: `includeSources`/`excludeSources` Now Behave Like a Standard Allowlist

Previously, `includeSources`/`excludeSources` behaved counterintuitively: `all files - excludeSources + includedSources = zipped files`. This is not the standard behavior for allowlist/blocklists.

As of v0.21, these options behave as expected: `includedSources - excludeSources = zipped files`.

Additionally, a new `zip.dotSources` option (default `false`) was added to control whether hidden files/directories can be included in the zip.

This will likely be the biggest pain point of the upgrade. You will need to rebuild your included and excluded sources lists from scratch. Luckily, it's simpler than before!

1. Do you need any hidden files? If so, set `zip.dotSources` to `true`
1. Add base files and directories that need to be in the ZIP to `zip.includeSources`
1. Run `wxt zip -b firefox` and confirm all the files you need are included
1. Remove files from the zip by adding them to `zip.excludeSources`
1. Run `wxt zip -b firefox` and confirm only the files you need are in the zip

:::tip
`wxt zip -b firefox` now prints every file included in the sources ZIP. This will help you identify missing or unwanted files more quickly.
:::

Here's an example configuration:

```ts
// wxt.config.ts
export default defineConfig({
  srcDir: 'src',
  zip: {
    // Say I have a .tool-versions file I want to include
    dotSources: true,
    // Specify base folders and files to include
    includeSources: [
      'src',
      'public',
      'package.json',
      'bun.lock',
      'README.md',
      '.tool-versions',
    ],
    // Exclude any folders inside the base folders that are not needed, like test data
    excludeSources: ['**/__fixtures__'],
  },
});
```

### `createShadowRootUi` DOM Changes

`@webext-core/isolated-element` was upgraded from v1 to v3. The only breaking change relevant to WXT projects is that the internal structure of the shadow root's is simpler:

:::code-group

```html [Before]
<html>
  <head>
    <style>
      ...
    </style>
  </head>
  <body>
    ...your app
  </body>
</html>
```

```html [After]
<style>
  ...
</style>
<div>...your app</div>
```

:::

Historically, CSS frameworks haven't had good support for shadow roots, so we needed a full `<html>` structure for styles to be applied correctly. But that has change this past few years, frameworks have started to include the `host:` selector alongside `root:` (which is required for base styles to be applied to the shadow root's host element):

```css
:root { /* [!code --] */
:root, :host { /* [!code ++] */
    /* base styles... */
}
```

If you use `createShadowRootUi`, see if your UI looks the same after this update without any changes.

If the styles are broken, you can continue using the full `<html>` structure by installing the v1 of `@webext-core/isolated-element` - WXT will respect whatever version of the package is listed in your `package.json`.

```sh
pnpm add @webext-core/isolated-element@^1
```

In the next major version, support for `@webext-core/isolated-element` v1 will be dropped, so you have some time to migrate.

### Content & Unlisted Script `globalName` Now Defaults to `false`

Content scripts and unlisted scripts are built as an IIFE. Previously, WXT generated a global variable to hold the IIFE's return value for all scripts by default. Now, no global variable is generated by default, producing a smaller, anonymous IIFE that prevents variable collisions with the page.

If you rely on the return value of your script, for example when injecting it with `browser.scripting.executeScript` and reading `InjectionResult.result`, set `globalName: true` to restore the old behavior:

```ts
export default defineUnlistedScript({
  globalName: true, // [!code ++]
  main() {
    return 'some value';
  },
});
```

This applies per-entrypoint, to both `defineContentScript` and `defineUnlistedScript`.

### ESLint Auto-Import Config Now Detects Your Installed ESLint Version

Setting `imports.eslintrc.enabled: true` used to always assume you wanted the legacy ESLint 8 config format, regardless of which ESLint version you actually had installed.

Now, `true` behaves the same as `'auto'`: WXT detects your installed ESLint version and generates the matching file automatically (ESLint 9+ &rarr; `eslint-auto-imports.mjs`, ESLint &le;8 &rarr; `eslintrc-auto-import.json`).

- If you're on ESLint 9+ but never explicitly set `enabled: 9`, you'll now get the new flat-config file instead of the legacy one.
- To force the old ESLint 8 format regardless of your installed version, set `enabled: 8` explicitly.

See the [ESLint config docs](/guide/essentials/config/auto-imports#eslint) for the full set of options and how to wire up the generated file.

### Deprecated APIs Removed From v0.21

APIs deprecated in v0.20 have been removed:

- `wxt.config.runner` / `ExtensionRunnerConfig` / `defineRunnerConfig` &rarr; use `wxt.config.webExt` / `defineWebExtConfig` instead.
- `dev.server.hostname` &rarr; use `dev.server.host` instead.
- The `wxt/testing` barrel export &rarr; import from the specific submodule instead:

  ```ts
  import { fakeBrowser, WxtVitest } from 'wxt/testing'; // [!code --]
  import { fakeBrowser } from 'wxt/testing/fake-browser'; // [!code ++]
  import { WxtVitest } from 'wxt/testing/vitest-plugin'; // [!code ++]
  ```

- The `clean(root: string)` JS API overload &rarr; Pass a root like this instead `clean({ root: './my-extension' })`

### CWS v2 API Support

`publish-browser-extension` was upgraded to v5, which adds support for the new Chrome Web Store v2 API to `wxt submit`! Instead of using a refresh token for auth, it uses a service account, which is much easier to setup and never expires. It also supports a few other features: <https://developer.chrome.com/blog/cws-api-v2>

To setup your project to use v2, run `wxt submit init` and go through the setup process for the CWS, selecting v2 when prompted.

v1 will stop working **15th October 2026**, so you have a few months to migrate.

### `@webext-core/fake-browser` v2

If you use `wxt/testing/fake-browser` (or `@webext-core/fake-browser` directly) in unit tests, note that its types now match `@wxt-dev/browser` instead of `webextension-polyfill`. This is the same change WXT's own `browser` went through in [v0.20](#webextension-polyfill-removed).

Most notably, **mocking `browser.runtime.onMessage` listeners that return a promise no longer works**, use `sendResponse` instead:

```ts
fakeBrowser.runtime.onMessage.addListener(async () => { // [!code --]
  return await someAsyncWork(); // [!code --]
fakeBrowser.runtime.onMessage.addListener((_message, _sender, sendResponse) => { // [!code ++]
  someAsyncWork().then(sendResponse); // [!code ++]
  return true; // [!code ++]
});
```

If you use use a messaging library, it will likely continue working as-is.

### New Deprecations in v0.20

Deprecated APIs will be removed in the next major release.

- `useAppConfig` deprecated in favor of `getAppConfig` - same function, just renamed. This avoids react linters mistaking it as a hook.
