import { Cause } from "../value-objects/causes";
import { SDG } from "../value-objects/SDGS";
import { Skill } from "../value-objects/skills";
import { Sponsor } from "./sponsor";

export default class Edital {
    public id: number | null
    public title: string
    public icon: string
    public description: string
    public funding_min: number;
    public funding_max: number;
    public sponsor: Sponsor;
    public sdgs: SDG[];
    public causes: Cause[];
    public skills: Skill[];
    public start_of_submission: string;
    public end_of_submission: string;

    constructor(
        id: number | null,
        title: string,
        icon: string,
        description: string,
        funding_min: number,
        funding_max: number,
        sponsor: Sponsor,
        sdgs: SDG[],
        causes: Cause[],
        skills: Skill[],
        start_of_submission: string,
        end_of_submission: string
    ) {
        this.id = id;
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.funding_min = funding_min;
        this.funding_max = funding_max;
        this.sponsor = sponsor;
        this.sdgs = sdgs;
        this.causes = causes;
        this.skills = skills;
        this.start_of_submission = start_of_submission;
        this.end_of_submission = end_of_submission;
    }
}
