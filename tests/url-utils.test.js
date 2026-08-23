import test from "node:test";
import assert from "node:assert";
import { createReferralUrl } from "../src/url-utils.js";

test("createReferralUrl - appends contributor ID to clean URL", () => {
  const result = createReferralUrl("https://learn.microsoft.com/azure", "studentamb_123456", false);
  assert.strictEqual(result, "https://learn.microsoft.com/azure?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - appends contributor ID keeping other parameters", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/azure?foo=bar&test=1",
    "studentamb_123456",
    false
  );
  assert.strictEqual(
    result,
    "https://learn.microsoft.com/azure?foo=bar&test=1&wt.mc_id=studentamb_123456"
  );
});

test("createReferralUrl - replaces existing wt.mc_id parameter", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/azure?wt.mc_id=old_id",
    "studentamb_123456",
    false
  );
  assert.strictEqual(result, "https://learn.microsoft.com/azure?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - replaces existing cased and multiple wt.mc_id parameters", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/azure?WT.mc_id=old_id&Wt.Mc_Id=another&foo=bar",
    "studentamb_123456",
    false
  );
  assert.strictEqual(
    result,
    "https://learn.microsoft.com/azure?foo=bar&wt.mc_id=studentamb_123456"
  );
});

test("createReferralUrl - preserves URL hash and search params", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/azure?foo=bar#section-1",
    "studentamb_123456",
    false
  );
  assert.strictEqual(
    result,
    "https://learn.microsoft.com/azure?foo=bar&wt.mc_id=studentamb_123456#section-1"
  );
});

test("createReferralUrl - language-neutral: strips standard ll-cc locale", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/en-us/azure",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/azure?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: strips pt-br locale", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/pt-br/training",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/training?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: strips es-419 (3-digit region)", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/es-419/copilot",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/copilot?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: strips zh-hans (4-letter script subtag)", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/zh-hans/dotnet",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/dotnet?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: strips sr-latn-rs (script + region)", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/sr-latn-rs/visualstudio",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/visualstudio?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: does NOT strip non-locale path /web-apps/", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/web-apps/azure",
    "studentamb_123456",
    true
  );
  assert.strictEqual(
    result,
    "https://learn.microsoft.com/web-apps/azure?wt.mc_id=studentamb_123456"
  );
});

test("createReferralUrl - language-neutral: does NOT strip non-locale path /ai-ml/", () => {
  const result = createReferralUrl(
    "https://azure.microsoft.com/ai-ml/azure",
    "studentamb_123456",
    true
  );
  assert.strictEqual(
    result,
    "https://azure.microsoft.com/ai-ml/azure?wt.mc_id=studentamb_123456"
  );
});

test("createReferralUrl - language-neutral: does NOT strip non-locale path /how-to/", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/how-to/use",
    "studentamb_123456",
    true
  );
  assert.strictEqual(result, "https://learn.microsoft.com/how-to/use?wt.mc_id=studentamb_123456");
});

test("createReferralUrl - language-neutral: does NOT strip non-locale path /dot-net/", () => {
  const result = createReferralUrl(
    "https://learn.microsoft.com/dot-net/fundamentals",
    "studentamb_123456",
    true
  );
  assert.strictEqual(
    result,
    "https://learn.microsoft.com/dot-net/fundamentals?wt.mc_id=studentamb_123456"
  );
});

test("createReferralUrl - returns original URL if contributor ID is empty", () => {
  const result = createReferralUrl("https://learn.microsoft.com/azure", "", false);
  assert.strictEqual(result, "https://learn.microsoft.com/azure");
});

test("createReferralUrl - handles malformed/invalid URLs as-is", () => {
  const result = createReferralUrl("not-a-valid-url", "studentamb_123456", false);
  assert.strictEqual(result, "not-a-valid-url");
});
