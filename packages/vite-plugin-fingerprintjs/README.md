# Vite Plugin FingerprintJS

This is a plugin for integrating FingerprintJS with Vite. It sits on top of the official FingerprintJS.
Currently does not support the Pro version of FingerprintJS.

```bash
npm install -D vite-plugin-fingerprintjs
# or
yarn add -D vite-plugin-fingerprintjs
# or
pnpm add -D vite-plugin-fingerprintjs
```

## Basic Usage

```ts
// vite.config.ts
import { defineConfig } from "vite";
import fingerprint from "vite-plugin-fingerprintjs";

export default defineConfig({
  plugins: [react(), fingerprint()],
});
```
