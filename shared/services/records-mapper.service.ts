import { Injectable } from '@nestjs/common';
import { ISetQueries } from '../interfaces/queries.interface';

@Injectable()
export class RecordsMapperService {
    private mapRecord(record: any) {
        let newFormatkey;
        for (let key in record) {
            newFormatkey = key.charAt(0).toLowerCase() + key.slice(1);
            record[newFormatkey] = record[key];
            delete record[key];
        }
        return record;
    }
    mapUniqueRecord(uniqueRecord: any) {
        return this.mapRecord(uniqueRecord[0]);
    }
    mapRecords(records: any[], queries?: ISetQueries) {
        const rowCollection = [],
            lengthRecords = queries ? records.length - 1 : records.length;
        let record;

        for (let x = 0; x < lengthRecords; x++) {
            record = this.mapRecord(records[x]);
            rowCollection.push(record);
        }

        if (!queries) {
            return rowCollection;
        }

        return {
            offset: queries.offset,
            size: queries.size,
            total: records[records.length - 1].total,
            results: rowCollection,
        };
    }
}
