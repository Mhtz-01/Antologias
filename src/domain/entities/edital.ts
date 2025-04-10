import Deadline from "../value-objects/deadline";
import { Sponsor } from "./sponsor";
import { SDG } from "../value-objects/SDGS";
import { Cause } from "../value-objects/causes";
import { Skill } from "../value-objects/skills";

export default class Edital {
    constructor(
        public id: number | null,
        public title: string,
        public icon: string,
        public description: string,
        public funding_min: number,
        public funding_max: number,
        public sponsor: Sponsor,
        public sdgs: SDG[],
        public causes: Cause[],
        public skills: Skill[],
        public edital_url: string,
        public deadline: Deadline 
    ) {}
}
