import { IdItem } from '../../interfaces/id-item';


export class Item implements IdItem {

    id: number;

    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
