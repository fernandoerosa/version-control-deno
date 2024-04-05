import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const { RELEASE_VERSION_TRIGGER_URL, RELEASE_VERSION_TRIGGER_TOKEN } = config();

export class TriggerService {

  static async triggerRelease(version: any) {  
    const formData = new FormData();
    const fileContent = await Deno.readFile(`./public/${version.assetName}`);
    const blob = new Blob([fileContent]);

    formData.append('version', "v" + version.appVersionNumber + "-" + version.appVersionCode);
    formData.append('appAssets.zip', blob);

    const headers = {
      'Authorization': `Basic ${RELEASE_VERSION_TRIGGER_TOKEN}`,
    };
    
    fetch(RELEASE_VERSION_TRIGGER_URL, {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    }); 
  }
}
