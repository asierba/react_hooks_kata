
export class Contact{
    phone: string;
    name: string;
    isFavorite: boolean;

    constructor(phone: string, name: string, isFavorite: boolean = false){
        this.phone = phone;
        this.name = name;
        this.isFavorite = isFavorite;
    }
}


