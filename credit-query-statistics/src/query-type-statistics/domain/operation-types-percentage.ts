export interface IOperationType {
    OperationTypeId: string;
    Name: string;
    Total: number;
}

export class OperationTypesPercentage {
    constructor(private operationTypes: IOperationType[]) {}

    /* calculatePercentages() {
        let total = this.operationTypes.reduce(this.add, 0);

        for (let x = 0; x < this.operationTypes.length; x++) {
            this.operationTypes[x].Total = this.operationTypeInPercentage(total, this.operationTypes[x].Total);
        }
        return this.operationTypes;
    }
    private add(accumulator, operationType: IOperationType) {
        return accumulator + operationType.Total;
    }
    private operationTypeInPercentage(totalOperations: number, amountOperations: number): number {
        return parseFloat(((amountOperations * 100) / totalOperations).toFixed(2));
    } */
}
