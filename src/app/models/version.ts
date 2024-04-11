import { model, Schema } from "npm:mongoose@^6.7";

const versionSchema = new Schema({
      appVersionNumber: {type: String},
      appVersionCode: {type: Number, required: true},
      appAssetId: {type: String, required: true},
      isEnable: {type: Boolean, required: true},
      appId: {type: Number, required: true},
    }, 
    {
      timestamps: true,
    }
);

export interface IVersion {
  _id: string,
  appVersionNumber: string,
  appVersionCode: number,
  appAssetId: string,
  isEnable: boolean,
  appId: number,
}

export default model("Version", versionSchema);