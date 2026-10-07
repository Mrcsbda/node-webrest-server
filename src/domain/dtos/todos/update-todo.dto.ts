export class UpdateTodoDto {
    private constructor(
        private readonly id?: number,
        public readonly title?: string,
        public readonly completedAt?: Date | null
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {}
        if (this.title) returnObj.title = this.title
        if (this.completedAt) returnObj.completedAt = this.completedAt
        return returnObj
    }

    static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
        const { id, title, completedAt } = props;
        let newCompletedAt = completedAt

        if (!id || isNaN(id)) return ['ID must be a valid number'];

        if (completedAt) {
            newCompletedAt = new Date(completedAt);
            if (newCompletedAt.toString() === 'Invalid Date') return ['completedAt property must be a valid date'];
        }

        return [undefined, new UpdateTodoDto(id, title, newCompletedAt)];
    }
}