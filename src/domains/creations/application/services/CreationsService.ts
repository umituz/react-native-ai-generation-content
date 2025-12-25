
import { generateUUID } from "@umituz/react-native-uuid";
import type { ICreationsRepository } from "../../domain/repositories/ICreationsRepository";
import type { ICreationsStorageService } from "../../domain/services/ICreationsStorageService";
import type { CreationType } from "../../domain/value-objects";
import { BaseRepository } from "@umituz/react-native-firebase";
import type { Creation } from "../../domain/entities/Creation";

export interface CreateCreationDTO {
    userId: string;
    type: CreationType;
    prompt: string;
    metadata?: Record<string, unknown>;
    imageUri: string; // can be local file uri or base64
    aspectRatio?: number;
}

export class CreationsService extends BaseRepository {
    constructor(
        private readonly repository: ICreationsRepository,
        private readonly storageService: ICreationsStorageService,
        private readonly _collectionName: string = "creations" // Default to generic name, app can override via repo
    ) {
        super();
    }

    async saveCreation(dto: CreateCreationDTO): Promise<string> {
        const db = this.getDb();
        if (!db) throw new Error("Firestore not initialized");

        try {
            const creationId = generateUUID();

            const imageUrl = await this.storageService.uploadCreationImage(
                dto.userId,
                creationId,
                dto.imageUri
            );

            await this.repository.create(dto.userId, {
                id: creationId,
                uri: imageUrl,
                type: dto.type.id,
                prompt: dto.prompt,
                metadata: dto.metadata || {},
                createdAt: new Date(),
                isShared: false,
                isFavorite: false,
            });

            return creationId;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
            throw error;
        }
    }

    async getCreation(userId: string, id: string): Promise<Creation | null> {
        return this.repository.getById(userId, id);
    }

    async updateCreation(
        userId: string,
        id: string,
        updates: { metadata?: Record<string, unknown> },
    ): Promise<boolean> {
        return this.repository.update(userId, id, updates);
    }

    async deleteCreation(userId: string, id: string): Promise<boolean> {
        return this.repository.delete(userId, id);
    }
}
