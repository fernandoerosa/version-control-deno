import { config } from "https://deno.land/x/dotenv/mod.ts";
import Version from "../models/version.ts";
const { DATA_API_KEY, APP_ID } = config();
const BASE_URI = `https://sa-east-1.aws.data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action`;
const DATA_SOURCE = "Cluster0";
const DATABASE = "mult-build";
const COLLECTION = "mult-build";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": DATA_API_KEY
  },
  body: ""
};

const addVersion = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
    const body = await request.body.json();
    const version = new Version(body);

    await version.save();

    console.log(await Version.findById(version._id));

    response.status = 201;
    response.body = {
      success: true,
      data: version,
      // insertedId
    };

};

export { addVersion };