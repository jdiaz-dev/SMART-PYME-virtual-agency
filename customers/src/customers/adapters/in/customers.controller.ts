import { Body, Controller, Post, UseFilters, UseInterceptors, Inject } from '@nestjs/common';
import { IGetCustomerRequest } from 'src/customers/application/in/get.customer.request';
import { CustomersPersistenceService } from '../out/customers-persistence.service';
import { CustomerDto, CustomerResponse, GetCustomerDto } from './dtos/get-customer.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { ValidateGetCustomerDtoPipe } from './pipes/validate-get-customer-dto.pipe';

const entity = 'customers';
@ApiTags(entity)
@Controller({
    path: entity,
    version: '1',
})
@UseInterceptors(BaseResponseInterceptor)
export class CustomersController {
    private getCustomerRequest: IGetCustomerRequest;

    constructor(
        public recordsMapperService: RecordsMapperService,
        customersPersistenceService: CustomersPersistenceService,
    ) {
        this.getCustomerRequest = customersPersistenceService;
    }
    @ApiOkResponse({ type: CustomerResponse })
    @Post()
    async getCustomer(@Body(ValidateGetCustomerDtoPipe) getCustomerDto: GetCustomerDto) {
        const customer = await this.getCustomerRequest.getCustomer(getCustomerDto);

        const customerMapped: CustomerDto = this.recordsMapperService.mapUniqueRecord(customer);
        return customerMapped;
    }
}
