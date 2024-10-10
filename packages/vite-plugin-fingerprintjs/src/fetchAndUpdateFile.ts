import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ResolvedConfig } from "vite";
import { FINGERPRINT_URL } from "./constants";

/**
 * Checks if the file exists, hashes it, and fetches a new one if necessary.
 * @param config - Vite resolved configuration
 * @param useLocalScript - Whether to use the local script
 * @param devMode - Whether the function is running in development mode
 */
export async function fetchAndUpdateFile(
  config: ResolvedConfig,
  useLocalScript: boolean,
  devMode: boolean
) {
  if (config && useLocalScript) {
    const outputPath = devMode
      ? path.resolve(config.publicDir, "finger.js")
      : path.resolve(config.root, config.build.outDir, "finger.js");

    try {
      // Check if the file exists
      if (fs.existsSync(outputPath)) {
        // Read the existing file
        const existingFileContent = fs.readFileSync(outputPath, "utf-8");

        // Hash the existing file
        const existingFileHash = crypto
          .createHash("sha256")
          .update(existingFileContent)
          .digest("hex");

        // Fetch the file from the CDN
        const response = await fetch(FINGERPRINT_URL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${FINGERPRINT_URL}: ${response.statusText}`
          );
        }
        const fetchedContent = await response.text();

        // Hash the fetched file
        const fetchedFileHash = crypto
          .createHash("sha256")
          .update(fetchedContent)
          .digest("hex");

        // Compare the hashes
        if (existingFileHash !== fetchedFileHash) {
          // Write the new file if hashes are different
          fs.writeFileSync(outputPath, fetchedContent);
          console.log(`File updated and written to ${outputPath}`);
        } else {
          console.log("Local file is up-to-date.");
        }
      } else {
        // If the file doesn't exist, fetch and write it
        const response = await fetch(FINGERPRINT_URL);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${FINGERPRINT_URL}: ${response.statusText}`
          );
        }
        const content = await response.text();
        fs.writeFileSync(outputPath, content);
        console.log(`File written to ${outputPath}`);
      }
    } catch (error: any) {
      console.error(`Error fetching and writing file: ${error.message}`);
    }
  }
}
