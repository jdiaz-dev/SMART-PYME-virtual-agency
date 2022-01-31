import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUiidPipe implements PipeTransform {
    async transform(guid: string) {
        console.log('---------------guid', guid);
        if (guid.length !== 36) {
            throw new BadRequestException('Ingresa un id valido');
        }
        return guid;
    }
}
