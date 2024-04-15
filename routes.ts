import { Router } from "./deps.ts";
import { addVersion, getAllVersions, getVersion, triggerReleaseVersion } from "./src/app/repositories/version-repository.ts";

const router = new Router();

router.post("/api/version", addVersion);
router.get("/api/versions", getAllVersions);
router.get("/api/version/:appId", getVersion);
router.post("/api/version/trigger", triggerReleaseVersion);

export default router;