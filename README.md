# Ambassador Referral Linker

An independent browser extension that automatically adds your Microsoft Student Ambassador Contributor ID to supported Microsoft URLs.

[Leia em Português](README_pt-br.md)

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg) ![GitHub Release](https://img.shields.io/github/v/release/tkusal/ambassador-referral-linker) ![Manifest: V3](https://img.shields.io/badge/Manifest-V3-orange.svg) [![CI](https://github.com/tkusal/ambassador-referral-linker/actions/workflows/ci.yml/badge.svg)](https://github.com/tkusal/ambassador-referral-linker/actions/workflows/ci.yml)

![Demo](assets/demo.gif)

## Why Ambassador Referral Linker?

**The Problem:** Microsoft Student Ambassadors use their unique Contributor ID to attribute eligible activities and shared Microsoft content to their program profile. Manually cleaning localized URLs (like `/pt-br/`), correctly adding `wt.mc_id` whether or not the URL already contains query parameters, and copy-pasting your ID every single time is tedious and prone to errors.

**The Solution:** Ambassador Referral Linker automates this process. With a simple right-click on any supported Microsoft page or link, it correctly handles query parameters, injects your Contributor ID, optionally removes language locales, and copies the resulting trackable URL directly to your clipboard.

**Example:**

```text
https://learn.microsoft.com/en-us/azure/

becomes:

https://learn.microsoft.com/azure/?wt.mc_id=studentamb_123456
```

## Features

- **Right-Click Copy:** Quickly copy page URLs or specific links with your Contributor ID directly from the browser context menu.
- **Contributor ID Replacement:** Detects and replaces existing `wt.mc_id` parameters instead of creating duplicates.
- **Smart Parameter Handling:** Correctly adds `wt.mc_id` whether or not the URL already contains query parameters, avoiding malformed URLs.
- **Optional Locale Cleaning:** Removes locale segments such as `/en-us/` or `/pt-br/` when language-neutral URLs are enabled.
- **Lightweight:** Built with plain JavaScript and Manifest V3, with no runtime dependencies.

## Browser Availability

| Browser | Status                                                                                                           |
| :------ | :--------------------------------------------------------------------------------------------------------------- |
| Chrome  | [Available](https://chromewebstore.google.com/detail/ambassador-referral-linke/andakdkbonjlmcoocgjfanknedododlp) |
| Edge    | [Available](https://microsoftedge.microsoft.com/addons/detail/nbjblhjldkjffghlpnjlnccjeljehjbh)                  |
| Firefox | [Available](https://addons.mozilla.org/pt-BR/firefox/addon/ambassador-referral-linker/)                          |
| Opera   | In review                                                                                                        |
| Safari  | Planned                                                                                                          |

## Installation

<a href="https://chromewebstore.google.com/detail/ambassador-referral-linke/andakdkbonjlmcoocgjfanknedododlp"><img src="assets/chrome-badge.png" height="60" alt="Get it from the Chrome Web Store"></a> <a href="https://microsoftedge.microsoft.com/addons/detail/nbjblhjldkjffghlpnjlnccjeljehjbh"><img src="assets/edge-badge.png" height="60" alt="Get it from Microsoft Edge Add-ons"></a> <a href="https://addons.mozilla.org/pt-BR/firefox/addon/ambassador-referral-linker/"><img src="assets/firefox-badge.png" height="60" alt="Get it from Firefox Browser Add-ons"></a>

**Manual Installation (Developer Mode):**

1. Download this repository as a ZIP file (or clone it) and extract it.
2. For Chrome: Navigate to `chrome://extensions/`. For Edge: Navigate to `edge://extensions/`.
3. Open your terminal in the extracted folder and run:
   ```bash
   npm ci
   npm run build
   ```
4. Click **Load unpacked** and select the `dist/chrome` (or `dist/edge`) folder.

## Configuration & Usage

Please refer to the [Usage Guide (USAGE.md)](USAGE.md) for step-by-step instructions with images on how to configure your ID and use the extension.

## Language-Neutral URLs

When sharing Microsoft links globally, locale segments such as `/en-us/` or `/pt-br/` can direct visitors to a specific localized version of the content.
When the **"Make URLs language-neutral"** option is enabled, the extension removes these locale segments from copied URLs. Microsoft sites can then serve content according to the visitor's preferred language when supported, providing a better experience for international audiences.

## Supported Sites

The extension currently supports the following Microsoft sites:

- azure.microsoft.com
- blog.fabric.microsoft.com
- code.visualstudio.com
- community.fabric.microsoft.com
- community.powerplatform.com
- copilot.microsoft.com
- devblogs.microsoft.com
- developer.microsoft.com
- dotnet.microsoft.com
- events.microsoft.com
- imaginecup.microsoft.com
- learn.microsoft.com
- microsoft.com/insidetrack
- microsoft.com/microsoft-365-copilot
- microsoft.com/microsoft-cloud/blog
- microsoft.com/microsoft-copilot/for-individuals
- microsoft.com/microsoft-fabric
- microsoft.com/power-platform
- microsoft.com/startups
- mvp.microsoft.com
- powerbi.microsoft.com/blog
- reactor.microsoft.com
- techcommunity.microsoft.com

Missing a Microsoft site that should be supported? Please open an issue or submit a pull request.

## Privacy

Ambassador Referral Linker does not collect browsing history, analytics, personal information, or the content of the pages you visit.

Your Contributor ID and your preferences are stored using `chrome.storage.sync`, the storage mechanism provided by the browser itself. Depending on your browser's account synchronization settings, this information may be synced across your devices.

The extension does not send your data to servers controlled by the project or its maintainer.

## Permissions

The extension requests only the permissions required for its functionality:

- `contextMenus`: Adds the extension's options to the browser's context menu.
- `storage`: Stores your Contributor ID and your preferences.
- `clipboardWrite`: Allows copying the generated URL to the clipboard.
- `offscreen`: Allows the use of an offscreen document to perform the copy operation required by Manifest V3.

## Compatibility

Officially tested on Google Chrome and Microsoft Edge. Other Chromium-based browsers with Manifest V3 support may also work.

## Development and Contributions

Contributions are welcome!

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for instructions on setting up the development environment, testing, submitting pull requests, and contribution guidelines.

The project offers **English and Brazilian Portuguese** issue forms to:

- Report bugs
- Suggest new features

[Report a bug or suggest a feature](https://github.com/tkusal/ambassador-referral-linker/issues/new/choose)

Before contributing, please read our [Code of Conduct](CODE_OF_CONDUCT.md).

### Running tests

```bash
npm ci
npm test
```

## Project Structure

- `/src`: Extension source code, including the UI, background logic, and URL utilities.
- `/manifests`: Browser-specific manifest files.
- `/scripts`: Build scripts for generating extensions.
- `/dist`: Automatically generated build output for each browser.
- `/src/_locales`: Internationalization files for English and Portuguese.
- `/tests`: Automated tests for URL transformation logic.
- `/assets`: Images and media used in the documentation.
- `package.json`: Development and test configuration.

## Roadmap

- [x] Migrate to Manifest V3
- [x] Update URL handling for the current Contributor ID workflow
- [x] UI/UX revamp and single Contributor ID workflow
- [x] Refactor URL handling into testable utilities
- [x] Add automated URL transformation tests
- [x] Publish to Chrome Web Store
- [x] Publish to Microsoft Edge Add-ons
- [x] Restructure repository for multi-browser support
- [x] Make the extension compatible with Firefox (handle offscreen API and background scripts differences)
- [x] Publish to Firefox Add-ons
- [ ] Publish to Opera Add-ons (In review)
- [ ] Publish to Safari

## Credits

This project is an independent continuation and substantial refactor of the original [Skilling Champion Extension](https://github.com/mjisaak/skilling-champion-extension) created by Martin Brandl (mjisaak).

## Disclaimer

Ambassador Referral Linker is an independent open-source project and is not affiliated with, endorsed by, or maintained by Microsoft or the Microsoft Learn Student Ambassadors program.

## License

This project is open-source and licensed under the MIT License. See [LICENSE](LICENSE) for details.
