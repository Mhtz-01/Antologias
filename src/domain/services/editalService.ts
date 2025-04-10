import Edital from "../entities/edital";
import { Sponsor } from "../entities/sponsor";
import RepositoryFactory from "../factories/RepositoryFactory";
import { SDG } from "../value-objects/SDGS";
import { Cause } from "../value-objects/causes";
import { Skill } from "../value-objects/skills";
import Deadline from "../value-objects/deadline";

interface CreateEditalParams {
  title: string;
  icon: string;
  description: string;
  funding_min: number;
  funding_max: number;
  sponsor: Sponsor;
  sdgs: SDG[];
  causes: Cause[];
  skills: Skill[];
  edital_url: string;
  start_of_submission: string;
  end_of_submission: string;
}

export default class EditalService {
  static async create({
    title,
    icon,
    description,
    funding_min,
    funding_max,
    sponsor,
    sdgs,
    causes,
    skills,
    edital_url,
    start_of_submission,
    end_of_submission,
  }: CreateEditalParams): Promise<Edital> {
    const deadline = new Deadline(
      new Date(start_of_submission),
      new Date(end_of_submission)
    );

    const edital = new Edital(
      null,
      title,
      icon,
      description,
      funding_min,
      funding_max,
      sponsor,
      sdgs,
      causes,
      skills,
      edital_url,
      deadline
    );

    return await RepositoryFactory.getEditalRepository().save(edital);
  }

  static async getEditais(): Promise<Edital[]> {
    return await RepositoryFactory.getEditalRepository().findAll();
  }
}
