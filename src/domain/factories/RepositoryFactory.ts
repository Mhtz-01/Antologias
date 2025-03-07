import IEditaisRepository from "../entities/IEditaisRepository";
import InMemoryEditaisRepository from "../../infra/repositories/InMemoryEditaisRepository";
import config from "../../config/AppConfig";
import PostgreSQLEditaisRepository from "@/infra/repositories/PostgreSQLEditaisRepository";

export default class RepositoryFactory {
    static getEditalRepository(): IEditaisRepository {
        switch (config.repositoryType) {
            case "inMemory":
                return InMemoryEditaisRepository
            case "PostgreSQL":
                return PostgreSQLEditaisRepository
            default:
                throw new Error("Tipo de repositório não suportado: " + config.repositoryType);
        }
    }
}
