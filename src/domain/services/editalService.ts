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
  deadline: Deadline;
}

interface UpdateEditalParams extends CreateEditalParams {
  id: number;
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
    deadline
  }: CreateEditalParams): Promise<Edital> {

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

  static async getById(id: number): Promise<Edital> {
    return await RepositoryFactory.getEditalRepository().findByID(id);
  }

  static async update({
    id,
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
  }: UpdateEditalParams): Promise<Edital> {
    const edital = new Edital(
      id,
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

    return await RepositoryFactory.getEditalRepository().update(id, edital);
  }

  static async delete(id: number): Promise<void> {
    await RepositoryFactory.getEditalRepository().delete(id);
  }
}
