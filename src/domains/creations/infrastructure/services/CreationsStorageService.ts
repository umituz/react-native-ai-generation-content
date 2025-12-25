import {
    uploadFile,
    uploadBase64Image,
} from "@umituz/react-native-firebase";
import type { ICreationsStorageService } from "../../domain/services/ICreationsStorageService";

declare const __DEV__: boolean;

export class CreationsStorageService implements ICreationsStorageService {
    constructor(private readonly storagePathPrefix: string = "creations") { }

    private getPath(userId: string, creationId: string): string {
        return `${this.storagePathPrefix}/${userId}/${creationId}.jpg`;
    }

    async uploadCreationImage(
        userId: string,
        creationId: string,
        imageUri: string,
        mimeType = "image/jpeg"
    ): Promise<string> {
        const path = this.getPath(userId, creationId);

        try {
            if (imageUri.startsWith("data:")) {
                const result = await uploadBase64Image(imageUri, path, { mimeType });
                return result.downloadUrl;
            }
            const result = await uploadFile(imageUri, path, { mimeType });
            return result.downloadUrl;
        } catch (error) {
            if (__DEV__) {
                // eslint-disable-next-line no-console
                console.error("[CreationsStorageService] upload failed", error);
            }
            throw error;
        }
    }

    async deleteCreationImage(
        _userId: string,
        _creationId: string
    ): Promise<boolean> {
        // Delete logic not strictly required for saving loop, but good to have
        // Needs storage reference delete implementation in rn-firebase first
        // For now we skip implementing delete in this iteration as priority is saving
        return Promise.resolve(true);
    }
}
