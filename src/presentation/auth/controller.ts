import { Response, Request } from 'express';



export class AuthController {

  // DI
  constructor(){}

  registerUser = (req: Request, res: Response) => {

    res.json('registerUser');

  } 

  LoginUser = (req: Request, res: Response) => {

    res.json('Login');

  } 

  validateEmail = (req: Request, res: Response) => {

    res.json('ValidateEmail');

  } 

}