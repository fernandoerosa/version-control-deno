import { Application } from "https://deno.land/x/oak/mod.ts";
import mongoose from "npm:mongoose@^6.7";
import router from "./routes.ts";

const PORT = 3000;
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

try {
  await mongoose.connect("mongodb://localhost:27017/users");
} catch (e) {
  console.log(e.message)
}


console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });