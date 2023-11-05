

export class UpdateTodoDto {

  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date,
  ){}

  get values() {
    const retrieveObj: {[key:string]: any} = {};

    if ( this.text ) retrieveObj.text = this.text;
    if ( this.completedAt ) retrieveObj.completedAt = this.completedAt;

    return retrieveObj;
  }

  static create( props: {[key:string]: any} ): [string?, UpdateTodoDto?]  {

    const { id, text, completedAt } = props;
    let newCompletedAt = completedAt;

    if ( !id || isNaN(Number(id) ) ) {
      return ['id must be a valid number'];
    }

    if ( completedAt ) {
      newCompletedAt = new Date(completedAt);
      if ( newCompletedAt.toString() === 'Invalid Date' ) {
        return ['completedAt must be a valid date'];
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }

}