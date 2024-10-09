import { Plugin, ResolvedConfig } from "vite";
import { MyPluginOptions } from "./types";
import { FINGERPRINT_URL } from "./constants";
import fs from "fs";
import path from "path";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  let config: ResolvedConfig | undefined = undefined;

  const { localise = false } = options;

  return {
    name: "vite-plugin-fingerprintjs",
    enforce: "post",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async generateBundle() {
      if (config && localise) {
        try {
          const response = await fetch(FINGERPRINT_URL);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ${FINGERPRINT_URL}: ${response.statusText}`
            );
          }
          const content = await response.text();

          const outputPath = path.resolve(
            config.root,
            config.build.outDir,
            "finger.js"
          );
          fs.writeFileSync(outputPath, content);
          console.log(`File written to ${outputPath}`);
        } catch (error: any) {
          console.error(`Error fetching and writing file: ${error.message}`);
        }
      }
    },
    transformIndexHtml(html) {
      const script = `
<script>
  const fpPromise = import('${localise ? "/finger.js" : FINGERPRINT_URL}')
    .then(FingerprintJS => FingerprintJS.load());

  // Get the visitor identifier when you need it.
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      // Store the result on the window object
      window.fp = result;
    });
</script>
      `;
      return html.replace("</head>", `${script}</head>`);
    },
  };
}
