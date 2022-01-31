import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ICustomerId } from 'src/customers/adapters/out/interfaces/customer-id';
import { SaveTypeQueryDto } from '../dtos/save-query-type-by-customer.dto';
import { ITypeQuery } from '../interfaces/credit-query-statistic';
import { CustomersPersistenceService } from './../../../../customers/adapters/out/customers-persistence.service';
import { ICustomerAndCreditIds } from './../../../../customers/adapters/out/interfaces/customer-and-credit-ids';
const DeviceDetector = require('device-detector-js');
const deviceDetector = new DeviceDetector();

@Injectable()
export class TransformUserAgentPipe implements PipeTransform {
    constructor(private customersPersistenceService: CustomersPersistenceService) {}

    async transform(data: ITypeQuery, metadata: ArgumentMetadata) {
        let ids: ICustomerAndCreditIds[], customerId: ICustomerId[], statistic: SaveTypeQueryDto;
        const dataDevice = deviceDetector.parse(data.userAgent);

        statistic = new SaveTypeQueryDto(
            dataDevice.os ? dataDevice.os.name : '',
            dataDevice.device ? dataDevice.device.type : '',
            dataDevice.device ? dataDevice.device.brand + ' ' + dataDevice.device.model : '',
            data.requestIp,
        );
        if (data.creditGUID) {
            ids = await this.customersPersistenceService.getCustomerAndCreditIds(
                data.customerGUID,
                data.creditGUID,
            );

            statistic.customerId = ids[0].CustomerId;
            statistic.creditId = ids[0].CreditId;
        } else {
            customerId = await this.customersPersistenceService.getCustomerId(data.customerGUID);
            statistic.customerId = customerId[0].CustomerId;
        }

        return statistic;
    }
}
