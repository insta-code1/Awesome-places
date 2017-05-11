import { Location } from "./location";

export class Place {

    constructor(
        public title: string,
        private description: string,
        public location: Location,
        public imagePath: string) {
    }
}