import { ArgumentMetadata, Injectable, PipeTransform,BadRequestException } from '@nestjs/common';
import {GetCustomerDto} from '../dtos/get-customer.dto';
import { ErrorMessagesCustomerEnum } from "../../../../../../shared/enums/messages-failed-request";

@Injectable()
export class ValidateGetCustomerDtoPipe implements PipeTransform {
  transform(value: GetCustomerDto, metadata: ArgumentMetadata) {
    if (!/^\d+$/.test(value.documentNumber)) {
      throw new BadRequestException(ErrorMessagesCustomerEnum.CUSTOMER_DOCUMENT_INVALID_CHAR);
    }
    if (!/^\d+$/.test(value.phone)) {
      throw new BadRequestException(ErrorMessagesCustomerEnum.CUSTOMER_PHONE_INVALID_CHAR);
    }
    if (value.documentNumber.length!=8 && value.documentNumber.length!=11) {
      throw new BadRequestException(ErrorMessagesCustomerEnum.CUSTOMER_DOCUMENT_INVALID_LENGTH);
    }
    if(value.phone.length!=9){
      throw new BadRequestException(ErrorMessagesCustomerEnum.CUSTOMER_PHONE_INVALID_LENGTH);
    }
    return value;
  }
}
