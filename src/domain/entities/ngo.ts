import { Cause } from "../value-objects/causes";
import { SDG } from "../value-objects/SDGS";
import { Skill } from "../value-objects/skills";

export default class NGO {
    id: number;
    name: string;
    description: string;
    is_formalized: boolean;
    start_year: number;
    contact_phone: string;
    instagram_link: string;
    x_link: string;
    facebook_link: string;
    pix_qr_code_link: string;
    gallery_images_url: string[];
    skills: Skill[];
    causes: Cause[];
    sdgs: SDG[];

    constructor(
        id: number,
        name: string,
        description: string,
        is_formalized: boolean,
        start_year: number,
        contact_phone: string,
        instagram_link: string,
        x_link: string,
        facebook_link: string,
        pix_qr_code_link: string,
        gallery_images_url: string[],
        skills: Skill[],
        causes: Cause[],
        sdgs: SDG[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.is_formalized = is_formalized;
        this.start_year = start_year;
        this.contact_phone = contact_phone;
        this.instagram_link = instagram_link;
        this.x_link = x_link;
        this.facebook_link = facebook_link;
        this.pix_qr_code_link = pix_qr_code_link;
        this.gallery_images_url = gallery_images_url;
        this.skills = skills;
        this.causes = causes;
        this.sdgs = sdgs;
    }
}
