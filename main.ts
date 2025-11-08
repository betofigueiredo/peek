import fs from "fs/promises";
import { data } from "./src/data/example.ts";

async function main() {
  try {
    const res = data.map((r) => {
      if (r.id) return r;
      return {
        ...r,
        id: crypto.randomUUID(),
        method: "GET",
        status: 200,
        responseTime: "230ms",
      };
    });
    await fs.writeFile(
      "src/data/example2.ts",
      `export const data = ${JSON.stringify(res, null, 2)}\n`,
      "utf-8",
    );
    console.log("File written successfully.");
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

main();
