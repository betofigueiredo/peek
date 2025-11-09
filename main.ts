import fs from "fs/promises";
import data from "./start/src/example-data/example.json";

async function main() {
  try {
    const res = data?.map((r) => {
      const valueBetween100And500 =
        Math.floor(Math.random() * (500 - 100 + 1)) + 100;
      r.responseTime = valueBetween100And500;
      return r;
    });
    await fs.writeFile(
      "./start/src/example-data/example3.json",
      `export const data = ${JSON.stringify(res, null, 2)}\n`,
      "utf-8",
    );
    console.log("File written successfully.");
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

main();
