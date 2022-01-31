export class WorkStreamRequest {
    constructor(
        public workStream: string,
        public host: string,
        public origin: string,
        public requestJson: {},
        public requestDate: string | any,
        //public responseJson:{},
        //public responseDate:string,
        public userAgent: string,
        public requestIP: string,
    ) {}
}
