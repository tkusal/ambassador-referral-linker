// @ts-check

/**
 * Normalizes and appends the Contributor ID to a given URL, and optionally removes language paths.
 *
 * @param {string} rawUrl The original URL string.
 * @param {string} contributorId The Contributor ID to append.
 * @param {boolean} makeNeutral Whether to make the URL language-neutral.
 * @returns {string} The updated URL string.
 */
export function createReferralUrl(rawUrl, contributorId, makeNeutral) {
  if (!rawUrl) {
    return "";
  }
  if (!contributorId) {
    return rawUrl;
  }

  let url;
  try {
    url = new URL(rawUrl);
  } catch (e) {
    // If it's not a valid URL (e.g. relative or malformed), return as-is
    return rawUrl;
  }

  // Remove existing wt.mc_id parameters case-insensitively
  const keysToDelete = [];
  for (const key of url.searchParams.keys()) {
    if (key.toLowerCase() === "wt.mc_id") {
      keysToDelete.push(key);
    }
  }
  for (const key of keysToDelete) {
    url.searchParams.delete(key);
  }

  // Set the clean contributor ID
  url.searchParams.set("wt.mc_id", contributorId);

  // Remove language-locale if requested
  if (makeNeutral) {
    const validLangs = ["en", "es", "pt", "fr", "de", "it", "ja", "ko", "zh", "ru", "nl", "cs", "pl", "tr", "sv", "fi", "da", "nb", "hu", "el", "he", "id", "th", "vi", "ms", "bg", "hr", "ro", "sk", "sl", "sr", "uk", "et", "lv", "lt", "ar", "hi"];
    const localeMatch = url.pathname.match(/^\/([a-zA-Z]{2})-([a-zA-Z]{2}|[0-9]{3}|[a-zA-Z]{4}(-[a-zA-Z]{2})?)(?=\/|$)/i);
    
    if (localeMatch && validLangs.includes(localeMatch[1].toLowerCase())) {
      url.pathname = url.pathname.replace(localeMatch[0], "");
    }

    if (!url.pathname.startsWith("/")) {
      url.pathname = "/" + url.pathname;
    }
  }

  return url.href;
}
