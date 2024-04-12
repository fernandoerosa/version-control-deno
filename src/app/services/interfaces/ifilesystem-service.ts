export interface IFilesystemService {
  createAssets(version: any, formData: FormData): Promise<string>;
}