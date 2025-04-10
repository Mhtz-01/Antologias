import Edital from "@/domain/entities/edital";
import IEditaisRepository from "@/domain/entities/IEditaisRepository";

class InMemoryEditaisRepository implements IEditaisRepository {
    private editais: Edital[] = []
    private lastId = 0

    async save(edital: Edital): Promise<Edital> {
        if (!edital.id) {
            edital.id = ++this.lastId
            this.editais.push(edital)
        } else {
            throw new Error("Esse edital já existe!")
        }
        return Promise.resolve(edital);
    }

    async findAll(): Promise<Edital[]> {
        return Promise.resolve([...this.editais]);
    }

    async findByID(id: number): Promise<Edital> {
        const index = this.editais.findIndex((t) => t.id === id);
        if (index !== -1) {
            return Promise.resolve(this.editais[index]);
        } else {
            throw new Error("Não existe um edital com esse ID!");
        }
    }

    async updateByID(id: number, updatedEdital: Edital): Promise<Edital> {
        const index = this.editais.findIndex((t) => t.id === id);

        if (index !== -1) {
            this.editais[index] = { ...updatedEdital, id }; 
            return Promise.resolve(this.editais[index]);
        } else {
            throw new Error("Erro ao atualizar edital!");
        }
    }

    async delete(id: number): Promise<boolean> {
        const initialLength = this.editais.length;
        this.editais = this.editais.filter((edital) => edital.id !== id);
        return Promise.resolve(this.editais.length < initialLength);
    }
}

export default new InMemoryEditaisRepository();
