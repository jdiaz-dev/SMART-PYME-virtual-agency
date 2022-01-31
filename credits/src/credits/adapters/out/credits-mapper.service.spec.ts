import { Test, TestingModule } from '@nestjs/testing';
import { CreditsMapperService } from './credits-mapper.service';

describe('CreditsMapperService', () => {
  let service: CreditsMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditsMapperService],
    }).compile();

    service = module.get<CreditsMapperService>(CreditsMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
