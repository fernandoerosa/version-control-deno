import { IAsset } from "../models/asset.ts";
import Version from "../models/version.ts";
import Asset from "../models/asset.ts";
import { IVersion } from "../models/version.ts";
import { CapacitorFilesystemService } from "../services/filesystem.service.ts";
import { IFilesystemService } from "../services/interfaces/ifilesystem-service.ts";
import { TriggerService } from "../services/trigger.service.ts";
import { Request, Response } from "https://deno.land/x/oak@14.2.0/mod.ts";

const triggerReleaseVersion = async ({
  request,
  response
}: {
  request: Request,
  response: Response
}) => {
  const formData: FormData = await request.body.formData();
  const version: IVersion = await Version.findOne({ appId: formData.get("appId"), isEnable: true }) as IVersion;
  const asset: IAsset = await Asset.findById(version.appAssetId) as IAsset;

  console.log(version);
  console.log(asset);

  await TriggerService.triggerRelease(version, asset);
  response.status = 201;
}

const getAllVersions = async ({
  response
}: {
  response: Response
}) => {
  const versions: Array<IVersion> = await Version.find();
  response.status = 201;
  response.body = versions;
}

const getVersion = async ({
  params,
  response
}: {
  params: any,
  response: Response
}) => {
  console.log(typeof params)
  const appId: number = await params.appId;
  console.log(appId)

  const version: IVersion = await Version.findOne({ appId: appId, isEnable: true }) as IVersion;

  response.status = 201;
  response.body = version;
}

const addVersion = async ({
  request,
  response,
}: {
  request: Request,
  response: Response
}) => {
  try {
    const filesystemService: IFilesystemService = new CapacitorFilesystemService();

    const formData: FormData = await request.body.formData();
    const versionData = JSON.parse(JSON.stringify(Object.fromEntries(formData)));

    const version = new Version(versionData);

    const currentVersion: IVersion = await Version.findOne({ clientId: version.appId, isEnable: true }) as IVersion;

    if (currentVersion != null) {
      await _updateCurrentVersion(currentVersion!._id.toString());
    }

    version.appAssetId = await filesystemService.createAssets(version, formData);
 
    await version.save();
    
    console.log("New Version" + await Version.findById(version._id));

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

const _updateCurrentVersion = async (_id: string) => {
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