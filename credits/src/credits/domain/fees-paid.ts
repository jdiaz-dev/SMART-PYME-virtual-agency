export class FeesPaid {
    constructor(private period: number, private amountFeesPaid: number) {}

    calculateFeesPaid() {
        return `${this.amountFeesPaid}/${this.period}`;
    }
    calculateFeesPaidInPercentage() {
        return ((this.amountFeesPaid * 100) / this.period).toFixed(2);
    }
}
