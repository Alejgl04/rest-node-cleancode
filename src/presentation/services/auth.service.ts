import { JwtAdapter, bcriptAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';
import { EmailService } from './email.service';


export class AuthService {

  constructor(
    private readonly emailService: EmailService
  ){}

  public async registerUser( registerUserDto: RegisterUserDto ) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if( existUser ) throw CustomError.badRequest('Email already exist');

    try {
      
      const user = new UserModel(registerUserDto);
      
      user.password = bcriptAdapter.hash(registerUserDto.password);
          
      await user.save();

      await this.sendEmailValidationLink(user.email!);
    
      const {password, ...restData} = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({id: user.id, email: user.email});
      if ( !token ) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: restData,
        token
      };

    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
    
  }

  public async loginUser( loginUserDto: LoginUserDto ) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if( !user ) throw CustomError.badRequest('Email does not exist');

    const isMatchPassword = bcriptAdapter.compare(loginUserDto.password, user.password);
    if ( !isMatchPassword ) throw CustomError.badRequest('Password is not valid');

    const { password, ...userObject} = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({id: user.id, email: user.email});
    if ( !token ) throw CustomError.internalServer('Error while creating JWT');

    return {
      user: userObject,
      token
    }
  }

  public validateEmailRequest = async( token:string ) => {
    const payload = await JwtAdapter.validateToken(token);

    if ( !payload ) throw CustomError.unauthorized('Invalid Token');

    const { email } = payload as { email: string }; 

    if ( !email ) throw CustomError.internalServer('Email is not in token');

    const user = await UserModel.findOne({ email });

    if ( !user ) throw CustomError.badRequest('Email does not exist');

    user.emailValidated = true;
    user.status = true;

    await user.save();

    return true;

  }


  private sendEmailValidationLink = async( email: string ) => {

    const token = await JwtAdapter.generateToken({ email });

    if ( !token ) throw CustomError.internalServer('Error getting token');

    const returnLink = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;

    const html = `
      <h1>Validate your email</h1>
      <p>Click on the followin link to validate your email</p>
      <a href="${returnLink}">Validate your email: ${email}</a>
      `;
  
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }

    const isEmailSent = await this.emailService.sendEmail(options);
    if ( !isEmailSent ) throw CustomError.internalServer('Error sending email');

    return true;
  }

}