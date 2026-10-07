export class CreateTodoDto {
    private constructor(
        public readonly title: string
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { title } = props;
        console.log('props', props)
        if (!title) return ['Title property is required'];
        if (typeof title !== 'string') return ['Title property must be a string'];

        return [undefined, new CreateTodoDto(props.title)];
    }
}