// Render a policy from one HTML response, without a blocking CSS request.
// Keep per-game palettes and legal text in their existing sources.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

export const policyTouchStyles = `.back, .languages a, .contents a {
      display: inline-flex;
      align-items: center;
      min-width: 48px;
      min-height: 48px;
      max-width: 100%;
      overflow-wrap: anywhere;
    }`;

export function policyStyle(root, base) {
  assert.match(base, /^\/games\/[a-z0-9-]+\/privacy\/$/);
  const css = readFileSync(resolve(root, `.${base}`, 'policy.css'), 'utf8');
  assert.ok(!/<\/style/i.test(css), 'policy.css must not close the style element');
  assert.ok(!/@import\b|url\s*\(/i.test(css), 'policy CSS must be self-contained');
  return `  <style>\n${(css + '\n' + policyTouchStyles).split(/\r?\n/).filter(line => line.trim()).map(line => `    ${line}\n`).join('')}  </style>`;
}
