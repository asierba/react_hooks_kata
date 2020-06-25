export class Phone {
    value: String;

    constructor(phone: String){
        this.value = phone;
    }
} 

export class Name {
    value: String;

    constructor(name: String){
        this.value = name;
    }


} 

export class Contact{
    phone: Phone;
    name: Name;

    constructor(phone: Phone, name: Name){
        this.phone = phone;
        this.name = name;
    }
}


