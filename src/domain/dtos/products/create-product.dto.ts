

export class CreateProductDto {

  private constructor(

    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: boolean,
    public readonly user: boolean,
    public readonly category: boolean,

  ){}

  static create(object: { [key:string]:any }): [string?, CreateProductDto?] {

    const { name, available, price, description, user, category } = object;
    
    if ( !name ) return ['Missing name'];
    if ( !user ) return ['Missing user'];
    if ( !category ) return ['Missing category'];
    if ( !category ) return ['Missing category'];

    return [undefined, new CreateProductDto(
      name,
      !!available,
      price,
      description,
      user, 
      category,
    )];
  } 

}