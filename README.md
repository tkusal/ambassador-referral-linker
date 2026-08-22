# Ambassador Referral Linker

An independent browser extension for Microsoft Learn Student Ambassadors that adds your Contributor ID to Microsoft links and optionally creates language-neutral URLs.

Based on the [Skilling Champion Extension](https://github.com/mjisaak/skilling-champion-extension) by Martin Brandl.

## Features

- **Automatic Contributor ID Insertion**: Appends your `wt.mc_id` Contributor ID to Microsoft links via the context menu.
- **Smart Parameter Handling**: Resolves conflicts with existing `wt.mc_id` query parameters case-insensitively, keeping your URLs clean and unambiguous.
- **Language-Neutral URL Conversion**: Optionally strips locale codes (e.g. `/en-us/`, `/pt-br/`, `/es-419/`, `/zh-hans/`) from URLs. This allows Microsoft sites to serve content in the target user's preferred browser language.
- **Privacy-First**: The extension runs entirely in the browser, does not inspect page content, and does not transmit any browsing history or data to external servers.

## Installation

### For Google Chrome

1. Download this repository as a ZIP file (or clone it) and extract it.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** in the top-left and select the `src` folder inside the extracted directory.

### For Microsoft Edge

1. Download this repository as a ZIP file (or clone it) and extract it.
2. Open Microsoft Edge and navigate to `edge://extensions/`.
3. Enable **Developer mode** in the left sidebar.
4. Click **Load unpacked** and select the `src` folder inside the extracted directory.

## How to Find Your Contributor ID

1. Go to your Microsoft Learn Student Ambassadors dashboard.
2. Locate your Contributor/Referral ID (typically in the format `studentamb_123456` or similar numeric formats).
3. Copy this ID for configuration in the extension.

## Usage

### 1. Configure the Extension

- Click the extension icon in your browser toolbar to open the options page.
- Enter your **Contributor ID** in the input field.
- (Optional) Check the **Make URLs language-neutral** box.
- Click **Save Contributor ID**.

### 2. Copy Referral Links

Right-click on any supported Microsoft page or link to access the context menu options:
- **Copy link address with Contributor ID**: Appends your ID to a clicked link.
- **Copy page URL with Contributor ID**: Appends your ID to the current page's URL.

## Supported Microsoft Sites

The extension operates on the following domains and their subdomains:
- `learn.microsoft.com`
- `azure.microsoft.com`
- `code.visualstudio.com`
- `copilot.microsoft.com`
- `devblogs.microsoft.com`
- `developer.microsoft.com`
- `dotnet.microsoft.com`
- `events.microsoft.com`
- `imaginecup.microsoft.com`
- `powerbi.microsoft.com`
- `reactor.microsoft.com`
- `studentambassadors.microsoft.com`
- `techcommunity.microsoft.com`
- `*.microsoft.com` (and all subdomains/routes like insidetrack, startups, fabric, etc.)

## How Language-Neutral URLs Work

When sharing Microsoft links globally, regional prefixes in the URL (such as `/en-us/` or `/pt-br/`) force the visitor's browser to display the content in that specific language/locale. 

By checking **Make URLs language-neutral**, the extension automatically strips these prefixes from the copied URL. When other users click the clean link, Microsoft sites will automatically detect their browser's language setting and show the page in their preferred local language.

## Privacy & Security

This extension respects your privacy:
- **No external telemetry**: It does not read page content or send browsing data to external servers.
- **Browser Sync**: It uses `chrome.storage.sync` to securely save your Contributor ID and settings, allowing it to sync across your signed-in browser profiles (e.g. between devices) using standard browser synchronization protocols.

## Development

You can run automated tests to check URL processing logic using Node.js (version 18 or later):

```bash
npm install
npm test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on how to submit pull requests and contribute to the project.

## Credits

This project is a modern, independent continuation of the [Skilling Champion Extension](https://github.com/mjisaak/skilling-champion-extension) originally created by Martin Brandl.

## License

This project is open-source and licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Disclaimer

This is an independent open-source project and is not affiliated with, endorsed by, or maintained by Microsoft.
