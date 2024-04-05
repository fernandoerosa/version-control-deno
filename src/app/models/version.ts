import { model, Schema } from "npm:mongoose@^6.7";

const versionSchema = new Schema({
      appName: {type: String, required: true},
      appVersionNumber: {type: String},
      appVersionCode: {type: Number, required: true},
      appPackageName: {type: String, required: true},
      appAssetId: {type: Number, required: true},
      assetName: {type: String},
      isEnable: {type: Boolean, required: true},
      clientId: {type: Number, required: true},
      appId: {type: Number, required: true},
    }, 
    {
      timestamps: true
    }
);

export default model("Version", versionSchema);