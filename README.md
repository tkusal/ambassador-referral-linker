# Ambassador Referral Linker

An independent browser extension for Microsoft Learn Student Ambassadors.

Based on the [Skilling Champion Extension](https://github.com/mjisaak/skilling-champion-extension) by Martin Brandl (mjisaak).
Licensed under the MIT License.

This extension allows you to easily copy a link or page URL appending your Microsoft Student Ambassador (MSA) ID, ensuring your activities and shared links are tracked correctly.

It ensures that the Ambassador ID is properly added to the URL, so you don't have to worry about whether the URL already contains query parameters. It also provides an option to make English URLs (or any other language specific URLs) "language-neutral" (e.g., removing "en-us"). This enables Microsoft sites to detect the preferred language of the user who clicks your link and serve content in their local language.

## Usage

### 1. Configure Options

After you have installed the extension, please specify your Ambassador ID within the extension options.

You can also check options to make URLs "language-neutral" to make your links more friendly to a global audience.

### 2. Use the extension

After you have specified your Ambassador ID, you will have two options to create a link:

* **Copy a page URL** - right click anywhere on a suitable page and select "*Copy page url with Ambassador ID*"
* **Copy a link** - right click on a link on a suitable page and select "*Copy link address with Ambassador ID*"

**Note:** If you have specified multiple IDs, the context menu will allow you to choose one of them.

## Suitable Sites

Currently, the extension operates and injects IDs on the following sites:
* azure.microsoft.com
* blog.fabric.microsoft.com
* code.visualstudio.com
* community.fabric.microsoft.com
* community.powerplatform.com
* copilot.microsoft.com
* devblogs.microsoft.com
* developer.microsoft.com
* dotnet.microsoft.com
* events.microsoft.com
* imaginecup.microsoft.com
* learn.microsoft.com
* microsoft.com (and subdomains/routes like insidetrack, startups, fabric, etc)
* powerbi.microsoft.com
* reactor.microsoft.com
* studentambassadors.microsoft.com
* techcommunity.microsoft.com
