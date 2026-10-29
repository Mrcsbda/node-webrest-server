export class TodoEntity {
    constructor(
        public id: number,
        public title: string,
        public completedAt?: Date | null,
    ) { }

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    public static fromObject(obj: { [key: string]: any }): TodoEntity {
        const { id, title, completedAt } = obj;
        if (!id) throw new Error("Missing required property 'id'");
        if (!title) throw new Error("Missing required property 'title'");

        let completedAtDate: Date | null = null;

        if (completedAt) {
            completedAtDate = new Date(completedAt);
            if (isNaN(completedAtDate.getTime())) {
                throw new Error("Invalid date format for 'completedAt'");
            }
        }

        return new TodoEntity(
            id,
            title,
            completedAt ? new Date(completedAt) : null
        );
    }
}