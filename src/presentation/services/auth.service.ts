import { bcriptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';


export class AuthService {

  constructor(){}

  public async registerUser( registerUserDto: RegisterUserDto ) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if( existUser ) throw CustomError.badRequest('Email already exist');

    try {
      
      const user = new UserModel(registerUserDto);
      
      user.password = bcriptAdapter.hash(registerUserDto.password);
          
      await user.save();
    
      const {password, ...restData} = UserEntity.fromObject(user);
      return {
        user: restData,
        token: 'ABC'
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
    
  }

  public async loginUser( loginUserDto: LoginUserDto ) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if( !user ) throw CustomError.badRequest('Email does not exist');

    const isMatchPassword = bcriptAdapter.compare(loginUserDto.password, user.password!);
    if ( isMatchPassword ) throw CustomError.badRequest('Password is not valid');

    const { password, ...userObject} = UserEntity.fromObject(user);
    
    return {
      user: userObject,
      token: 'asdasd'
    }
  }
}