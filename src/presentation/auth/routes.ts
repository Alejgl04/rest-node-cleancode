import { Router } from "express";
import { AuthController } from "./controller";


export class AuthRoutes {

  static get routes(): Router {

    const router = Router();

    const controller = new AuthController();

    router.post('/login', controller.LoginUser);
    router.post('/register', controller.registerUser);
    
    router.get('/validate-email/:token', controller.validateEmail);

    return router;
    
  }

}