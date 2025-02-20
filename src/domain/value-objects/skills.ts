export class Skill {
    public id: number;
    public name: string;

    constructor(id: number, name: string) {
        if (name.length > 255) {
            throw new Error("Name cannot exceed 255 characters");
        }
        this.id = id;
        this.name = name;
    }
}
