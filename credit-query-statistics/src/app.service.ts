import { Injectable } from '@nestjs/common';
import { QueryTypesSqlServerService } from './query-types/adapters/out/query-types-sql-server.service';

@Injectable()
export class AppService {
    constructor(private queryTypesSqlServerService: QueryTypesSqlServerService) {}
    getHello(): string {
        //this.queryTypesSqlServerService.getQueryStatistics();
        return 'Hello World!';
    }
}
