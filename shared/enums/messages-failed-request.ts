export enum ErrorMesaggesEnum {
    CUSTOMER_NOT_FOUND = 'No estás registrado como cliente de CMAC',
    CREDIT_NOT_FOUND = 'Crédito no encontrado',
    CREDITS_NOT_FOUND = 'Créditos no encontrados',
    CREDIT_ID_REQUIRED = 'El creditId es requerido para el tipo 1',
    QUERY_TYPE_ID_INVALID = 'El id del tipo de consulta no es válido',
}

export enum ErrorMessagesFeesEnum {
    STATUS_FEE_ID_INVALID = 'El id del estado de la Cuota es invalido',
    CREDIT_PAYMENT_FEE_NOT_FOUND = 'No existe Cuotas de pago para este crédito',
}

export enum ErrorSendEmailEnum {
    EMAIL_NOT_SEND = 'Un Error a ocurrido al momento de enviar el email',
}

export enum ErrorMessagesCustomerEnum {
    CUSTOMER_PHONE_INVALID_LENGTH = 'El número de celular debe tener 9 dígitos',
    CUSTOMER_PHONE_INVALID_CHAR = 'El número de celular debe ser compuesto solo por números',
    CUSTOMER_DOCUMENT_INVALID_LENGTH = 'Los números de documentos deben tener 8 o 11 dígitos',
    CUSTOMER_DOCUMENT_INVALID_CHAR = 'Los números de documentos deben ser compuesto solo por números',
}
