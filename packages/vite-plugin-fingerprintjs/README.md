# Vite Plugin FingerprintJS

This is a plugin for integrating FingerprintJS with Vite. It sits on top of the [official FingerprintJS package](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs).
Currently does not support the Pro version of FingerprintJS.

```bash
npm install -D vite-plugin-fingerprintjs
# or
yarn add -D vite-plugin-fingerprintjs
# or
pnpm add -D vite-plugin-fingerprintjs
```

## Basic Usage

**Warning**: // If you're using an ad blocker or Brave/Firefox/Arc etc, fingerprint will get blocked.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import fingerprint from "vite-plugin-fingerprintjs";

export default defineConfig({
  plugins: [react(), fingerprint()],
});
```

## Smarter Usage

`useLocalScript: true` will ensure fingerprint does not get blocked by the browser.
It will fetch the script from the public CDN and store it locally in your vite public folder and load that instead.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import fingerprint from "vite-plugin-fingerprintjs";

export default defineConfig({
  plugins: [react(), fingerprint({ useLocalScript: true })],
});
```

### Accessing with React

```tsx
import { useMemo } from "react";

const useFingerprint = () => {
  return useMemo(() => {
    return window.fp || null;
  }, []);
};

export default useFingerprint;
```
