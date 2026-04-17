import { DynamicModule, Module } from "@nestjs/common";
import { DiskStorageProvider } from "./implementations/disk-storage-provider";
import { S3StorageProvider } from "./implementations/s3-storage-provider";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({})
export class StorageModule {
    static register(): DynamicModule {
        return {
            module: StorageModule,
            imports: [ConfigModule],
            providers: [
                {
                    provide: "STORAGE_PROVIDER",
                    useFactory: (configService: ConfigService) => {
                        const driver = configService.get('STORAGE_DRIVER');
                        if (driver === "disk") {

                            return new DiskStorageProvider();
                        }
                        return new S3StorageProvider();
                    },
                    inject: [ConfigService],
                },
            ],
            exports: ["STORAGE_PROVIDER"],
        };
    }
}