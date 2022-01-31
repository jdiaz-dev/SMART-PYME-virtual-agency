import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
    mapForAppMarketing(results: {}[]) {
        results.forEach((queryStatistic: any) => {
            queryStatistic.queryType = 'Consulta de crédito';

            if (queryStatistic.documentType === 'DNI') {
                //document type
                queryStatistic.userType = 'Persona';
            } else if (queryStatistic.documentType === 'RUC') {
                queryStatistic.userType = 'Empresa';
            }
        });
    }
}
