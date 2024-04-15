import { Application } from "./deps.ts";
import mongoose from "npm:mongoose@^6.7";
import router from "./routes.ts";

const PORT = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

try {
  await mongoose.connect("mongodb://mongo-version-db/versions");
} catch (e) {
  console.log(e.message)
}


console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });