export class Chat {

    public $key: string;

    constructor(
        public lastMessage: string,
        public timestamp: any,
        public title: string,
        public headline: string,
        public photo: string
    ) {}

}