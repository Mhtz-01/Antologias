export default interface ICrudRepository<T> {
    save(edital: T): Promise<T>;
    findAll(): Promise<T[]>;
    findByID(id: number): Promise<T>;
    updateByID(id: number, updatedEdital: T): Promise<T>;
    delete(id: number): Promise<boolean>;
}
