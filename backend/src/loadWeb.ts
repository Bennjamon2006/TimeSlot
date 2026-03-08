import express from "express";
import { resolve } from "path";
import { existsSync, readFileSync } from "fs";

const webPath = resolve(__dirname, "../../frontend/dist");

export default function loadWeb(app: express.Application) {
  if (existsSync(webPath)) {
    app.use(express.static(webPath));

    const index = readFileSync(resolve(webPath, "index.html"), "utf-8");

    app.get("/*any", (req, res) => {
      res.setHeader("Content-Type", "text/html").send(index);
    });

    console.log(`Web interface loaded from ${webPath}`);
  }
}
