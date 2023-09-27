export class UpdateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date | null,
  ) {}

  get values() {
    const returnObj: {[key: string]: any} = {};

    if ( this.text ) returnObj.text = this.text;
    if ( this.completedAt ) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create( props: {[ key: string ]: any} ): [string?, UpdateTodoDto?] {

    const { text, id } = props
    const completedAt = props.completedAt ? new Date( props.completedAt ) : null

    if ( !id || isNaN( Number(id)) ) {
      return ['id must be a valid number'];
    }

    if( completedAt?.toString() === 'Invalid Date') return ['CompletedAt must be a valid date', undefined]

    return [undefined, new UpdateTodoDto(id, text, completedAt)]  
  }

}