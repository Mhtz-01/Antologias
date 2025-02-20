export class Cause {
    public id: number
    public name: string

    constructor(id: number, name: string) {
        if (name.length > 255) {
            throw new Error("Name cannot exceed 255 characters");
        }
        this.name = name
        this.id = id
    }
}
