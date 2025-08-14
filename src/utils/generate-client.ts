import { writeFile } from "node:fs/promises";
import { Integration } from "express-zod-api";
import { appConfig } from "@config/app-config";
import routing from "@routes";
import path from "node:path";
import fs from "node:fs";

(async function () {

  const dir = path.dirname(appConfig.clientFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  await writeFile(
    appConfig.clientFile,
    // or just: new Integration({ routing }).print(),
    await new Integration({ routing, variant: "types" }).printFormatted(),
    "utf-8",
  );
  console.log('Client file generated : ' + appConfig.clientFile);
})();
