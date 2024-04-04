import { Router } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { addVersion, getAllVersions, getVersion } from "./src/app/repositories/version-repository.ts";

const router = new Router();

router.post("/api/version", addVersion);
router.get("/api/versions", getAllVersions);
router.get("/api/version/:appId", (ctx) => getVersion(ctx));

export default router;