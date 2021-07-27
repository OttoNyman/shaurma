export class User{
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    isCashier: boolean;

    get fullName(){
        return this.firstName + ' ' + this.lastName;
    }
}
