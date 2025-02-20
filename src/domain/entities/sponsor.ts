export class Sponsor {
    id: number;
    name: string;
    iconUrl: string;
    description: string;
    site: string;
    contactEmail: string;
    phone?: string;

    constructor(
        id: number,
        name: string,
        iconUrl: string,
        description: string,
        site: string,
        contactEmail: string,
        phone?: string
    ) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.description = description;
        this.site = site;
        this.contactEmail = contactEmail;
        this.phone = phone;
    }
}
