import Version from "../models/version.ts";
import { FilesystemService } from "../services/filesystem.service.ts";

const getAllVersions = async ({ response }: { response: any }) => {
    const versions = await Version.find();
    response.status = 201;
    response.body = versions;
}

const getVersion = async ({ params, response }: { params: any ,response: any }) => {
    const appId = await params.appId;
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
        const body = await request.body.formData();
        console.log(body);    

        const version = new Version({
            appName: body.get("appName"),
            appVersionNumber: body.get("appVersionNumber"),
            appVersionCode: body.get("appVersionCode"),
            appPackageName: body.get("appPackageName"),
            appAssetId: body.get("appAssetId"),
            isEnable: body.get("isEnable"),
            clientId: body.get("clientId"),
            appId: body.get("appId")
        });

        const currentVersion = await Version.findOne({ clientId: version.clientId, isEnable: true });

        if (currentVersion != null) {
            await updateCurrentVersion(currentVersion!._id.toString());
        }

        await version.save();

        console.log("New Version" + await Version.findById(version._id));

        FilesystemService.createAssets(version, body);

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

        await Version.findByIdAndUpdate({ _id: _id }, update);

        console.log("VersionUpdated => " + await Version.findById(_id));
    } catch (e) {
        throw e;
    }
}

export { addVersion, getAllVersions, getVersion };