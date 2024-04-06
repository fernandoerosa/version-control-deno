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

export interface IVersion {
  _id: string,
  appName: string,
  appVersionNumber: string,
  appVersionCode: number,
  appPackageName: string,
  appAssetId: number,
  assetName: string,
  isEnable: boolean,
  clientId: number,
  appId: number,
}

export default model("Version", versionSchema);