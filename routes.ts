import { Router } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { addVersion } from "./src/app/repositories/version-repository.ts";

const router = new Router();

router.post("/api/version", addVersion);

export default router;