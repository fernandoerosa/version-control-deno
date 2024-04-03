import { config } from "https://deno.land/x/dotenv/mod.ts";
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
    try {
        const body = await request.body.json()
        const version = await body;
        const URI = `${BASE_URI}/insertOne`;
        const query = {
          collection: COLLECTION,
          database: DATABASE,
          dataSource: DATA_SOURCE,
          document: version
        };
        options.body = JSON.stringify(query);
        const dataResponse = await fetch(URI, options);
        const { insertedId } = await dataResponse.json();
        
        response.status = 201;
        response.body = {
          success: true,
          data: version,
          insertedId
        };
    } catch (err) {
      response.body = {
        success: false,
        msg: err.toString(),
      };
    }
  };
  
  export { addVersion };