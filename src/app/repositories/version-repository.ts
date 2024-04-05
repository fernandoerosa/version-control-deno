import Version from "../models/version.ts";
import { FilesystemService } from "../services/filesystem.service.ts";
import { TriggerService } from "../services/trigger.service.ts";

const triggerReleaseVersion = async ({
  request,
  response
}: {
  request: any,
  response: any
}) => {
  const formData = await request.body.formData();
  console.log(formData);

  const version = await Version.findOne({ appId: formData.get("appId"), isEnable: true });

  console.log(version);

  TriggerService.triggerRelease(version);
  response.status = 201;
}

const getAllVersions = async ({ response }: { response: any }) => {
  const versions = await Version.find();
  response.status = 201;
  response.body = versions;
}

const getVersion = async ({ params, response }: { params: any, response: any }) => {
  const appId = await params.appId;
  console.log(appId)

  const version = await Version.findOne({ appId: appId, isEnable: true });

  response.status = 201;
  response.body = version;
}

const addVersion = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    const formData = await request.body.formData();
    console.log(formData);

    const version = new Version({
      appName: formData.get("appName"),
      appVersionNumber: formData.get("appVersionNumber"),
      appVersionCode: formData.get("appVersionCode"),
      appPackageName: formData.get("appPackageName"),
      appAssetId: formData.get("appAssetId"),
      isEnable: formData.get("isEnable"),
      clientId: formData.get("clientId"),
      appId: formData.get("appId"),
    });

    const currentVersion = await Version.findOne({ clientId: version.clientId, isEnable: true });

    if (currentVersion != null) {
      await updateCurrentVersion(currentVersion!._id.toString());
    }

    console.log("New Version" + await Version.findById(version._id));

    FilesystemService.createAssets(version, formData);

    response.status = 201;
    response.body = {
      success: true,
      data: version,
    };
  } catch (e) {
    response.status = 400;
    response.body = {
      error: e.message
    }
  }
};

const updateCurrentVersion = async (_id: string) => {
  try {
    const update = { isEnable: false };
    const filter = { _id: _id };

    await Version.findByIdAndUpdate(filter, update);
    console.log("VersionUpdated => " + await Version.findById(_id));
  } catch (e) {
    throw e;
  }
}

export { addVersion, getAllVersions, getVersion, triggerReleaseVersion };