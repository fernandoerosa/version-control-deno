import { model, Schema } from "npm:mongoose@^6.7";

const versionSchema = new Schema({
    appName: {type: String, required: true},
    appVersionNumber: {type: String},
    appVersionCode: {type: String, required: true},
    appPackageName: {type: String, required: true},
    appAssetId: {type: String, required: true},
    isEnable: {type: String, required: true},
    }, {timestamps: true}
);

export default model("Version", versionSchema);