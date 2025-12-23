export interface ICreationsStorageService {
    uploadCreationImage(
        userId: string,
        creationId: string,
        imageUri: string,
        mimeType?: string
    ): Promise<string>;

    deleteCreationImage(
        userId: string,
        creationId: string
    ): Promise<boolean>;
}
