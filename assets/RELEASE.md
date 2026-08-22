# Release Information

## Tag the repository to trigger the release workflow

```bash
git tag v1.0.0
git push origin --tags
```

## Upload Description

This extension is designed for Microsoft Learn Student Ambassadors. It allows you to easily copy links or page URLs with your Contributor ID (`wt.mc_id`) attached, ensuring your sharing activities are correctly tracked. 

The context menu is available on the following sites and their subdomains:

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

## How to use:

1. Open the extension options page and save your **Contributor ID** (e.g., `studentamb_123456`).
2. Go to any supported Microsoft site (such as https://learn.microsoft.com/).
3. Right-click on a link or the page.
4. Select **Copy link address with Contributor ID** or **Copy page URL with Contributor ID**.
5. Your clipboard will contain the URL with your Contributor ID appended as a `wt.mc_id` query parameter.
