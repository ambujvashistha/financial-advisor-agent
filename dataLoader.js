import fs from "fs";

export function loadJSON(path) {
  try {
    const data = fs.readFileSync(path, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading file:", path);
    return null;
  }
}
