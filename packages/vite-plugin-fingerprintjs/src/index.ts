import { Plugin, ResolvedConfig } from "vite";
import { MyPluginOptions } from "./types";
import { FINGERPRINT_URL } from "./constants";
import { fetchAndUpdateFile } from "./fetchAndUpdateFile";

export default function vitePluginCSP(
  options: MyPluginOptions | undefined = {}
): Plugin {
  let config: ResolvedConfig | undefined = undefined;

  const { useLocalScript = false } = options;

  return {
    name: "vite-plugin-fingerprintjs",
    enforce: "post",
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async generateBundle() {
      if (config && useLocalScript) {
        await fetchAndUpdateFile(config, useLocalScript, false);
      }
    },
    async configureServer(server) {
      if (config && useLocalScript) {
        await fetchAndUpdateFile(config, useLocalScript, true);
      }

      server.middlewares.use((req, res, next) => {
        // You can add additional middleware here if needed
        next();
      });
    },
    transformIndexHtml(html) {
      const script = `
<script>
  const fpPromise = import('${useLocalScript ? "/finger.js" : FINGERPRINT_URL}')
    .then(FingerprintJS => FingerprintJS.load());
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
