import { model, Schema } from "npm:mongoose@^6.7";

const assetSchema = new Schema({
      appName: {type: String, required: true},
      appPackageName: {type: String, required: true},
      assetPath: {type: String},
    }, 
    {
      timestamps: true,
    }
);

export interface IAsset {
  _id: string,
  appName: string,
  appPackageName: string,
  assetPath: string,
}

export default model("Asset", assetSchema);