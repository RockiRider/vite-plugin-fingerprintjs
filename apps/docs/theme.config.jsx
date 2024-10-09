export default {
  logo: <span style={{ fontWeight: 600 }}>vite-plugin-fingerprintjs</span>,
  project: {
    link: "https://github.com/RockiRider/csp",
  },
  docsRepositoryBase: "https://github.com/RockiRider/csp/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | vite-plugin-fingerprintjs",
      description: "vite-plugin-fingerprintjs",
      openGraph: {
        description: "A vite plugin to handle your CSP",
        siteName: "vite-plugin-fingerprintjs",
      },
      twitter: {},
    };
  },
  head: <></>,
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a
          href="https://vite-plugin-fingerprintjs.tsotne.co.uk"
          target="_blank"
        >
          vite-plugin-fingerprintjs
        </a>
        .
      </span>
    ),
  },
  darkMode: true,
};
