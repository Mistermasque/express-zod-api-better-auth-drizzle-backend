import { writeFile } from "node:fs/promises";
import { Documentation } from "express-zod-api";
import routing from "@routes";
import { appConfig } from "@config/app-config";
import { readFileSync } from "node:fs";
import { serverConfig } from "@config/server-config";
import path from "node:path";
import fs from "node:fs";

(async function () {

  const packageFile = path.join(path.dirname(__filename), '..', '..', 'package.json');
  const jsonString = readFileSync(packageFile, 'utf-8');
  console.log('Reading package.json from: ' + packageFile);
  const manifest = JSON.parse(jsonString) as { version: string, name: string };

  const dir = path.dirname(appConfig.docFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await writeFile(
    appConfig.docFile,
    new Documentation({
      routing,
      config: serverConfig,
      version: manifest.version,
      title: manifest.name,
      serverUrl: serverConfig.baseUrl,
      tags: {
        Public: "Endpoints accessible without authentication",
        Display: "Endpoints available for display usage",
        Auth: "Authenticate users and devices endpoints",
        Users: "Managing Users endpoints",
        Regions: "Managing regions endpoints",
        Communities: "Managing communities endpoints",
        Posts: "Managing posts, comments and like endpoints",
        Devices: "Managing devices endpoints"
      }
    }).getSpecAsYaml(),
    "utf-8",
  );
  console.log('Doc file generated : ' + appConfig.docFile);
})();
