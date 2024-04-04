import Version from "../models/version.ts";

const getAllVersions = async ({response} : {response: any}) => {
  const versions = await Version.find();
  response.status = 201;
  response.body = versions;
}

const addVersion = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body.json();
    const version = new Version(body);

    const currentVersion = await Version.findOne({ clientId: version.clientId, isEnable: true });

    if (currentVersion != null) {
      await updateCurrentVersion(currentVersion!._id.toString());
    }

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

const updateCurrentVersion = async (_id: string) => {
  try {
    const update = { isEnable: false };

    await Version.findByIdAndUpdate({_id: _id}, update);

    console.log("VersionUpdated => " + await Version.findById(_id));
  } catch (e) {
    throw e;
  }
}

export { addVersion, getAllVersions };