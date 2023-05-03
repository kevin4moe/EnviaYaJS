import https from "https";
import ratesOptions from "../assets/rates.json" assert { type: "json" };
import * as dotenv from "dotenv";
dotenv.config();

const data = JSON.stringify({
  ...ratesOptions,
  api_key: process.env.API_KEY_DEV,
  enviaya_account: process.env.API_ENVIAYA_ACCOUNT,
  carrier_account: process.env.API_CARRIER_ACCOUNT,
});

const options = {
  hostname: process.env.API_HOSTNAME,
  path: `${process.env.API_PATH}/rates`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https
  .request(options, (res) => {
    console.log(res.statusCode);
    let data = "";
    res.on("data", (chunk) => {
      console.log("chunk", chunk);
      data += chunk;
    });
    res.on("end", () => {
      console.log(JSON.parse(data));
    });
  })
  .on("error", (err) => {
    console.error({ error: err });
  });

req.write(data);
req.end();
