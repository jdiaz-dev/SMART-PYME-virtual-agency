import { Module } from '@nestjs/common';
import {ConfigurationAppsettingsEpController} from "./configuration-appsettings-ep/configuration-appsettings-ep.controller"

@Module({
    controllers:[ConfigurationAppsettingsEpController]
})
export class ConfigurationAppsettingsModule {}
