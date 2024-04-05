import { Application, send } from "https://deno.land/x/oak@14.2.0/mod.ts";
import mongoose from "npm:mongoose@^6.7";
import router from "./routes.ts";

const PORT = 3000;
const ROOT_DIR = "./public";
const ROOT_DIR_PATH = "/public";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  if (!ctx.request.url.pathname.startsWith(ROOT_DIR_PATH)) {
    next();
    return;
  }
  const filePath = ctx.request.url.pathname.replace(ROOT_DIR_PATH, "");
  await send(ctx, filePath, {
    root: ROOT_DIR,
  });
});

try {
  await mongoose.connect("mongodb://localhost:27017/users");
} catch (e) {
  console.log(e.message)
}


console.log(`Server listening on port ${PORT}`);
await app.listen({ port: PORT });