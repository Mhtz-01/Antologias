export class Sponsor {
    id: number;
    name: string;
    icon_url: string;
    description: string;
    website: string;
    contactEmail: string;
    phone?: string;

    constructor(
        id: number,
        name: string,
        icon_url: string,
        description: string,
        website: string,
        contactEmail: string,
        phone?: string
    ) {
        this.id = id;
        this.name = name;
        this.icon_url = icon_url;
        this.description = description;
        this.website = website;
        this.contactEmail = contactEmail;
        this.phone = phone;
    }
}
