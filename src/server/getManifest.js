import fs from "fs";

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
  } catch (err) {
    console.err(err);
  }
};

export default getManifest;
