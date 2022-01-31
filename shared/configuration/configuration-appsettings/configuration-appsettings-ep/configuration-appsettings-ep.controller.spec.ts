import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationAppsettingsEpController } from './configuration-appsettings-ep.controller';

describe('ConfigurationAppsettingsEpController', () => {
  let controller: ConfigurationAppsettingsEpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationAppsettingsEpController],
    }).compile();

    controller = module.get<ConfigurationAppsettingsEpController>(ConfigurationAppsettingsEpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
