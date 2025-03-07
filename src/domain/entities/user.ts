import NGO from "./ngo";

export default class User {
    name: string;
    email: string;
    ngo: NGO;

    constructor(name: string, email: string, ngo: NGO) {
        this.name = name;
        this.email = email;
        this.ngo = ngo;
    }
}
