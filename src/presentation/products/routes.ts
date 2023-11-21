

import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductController } from './controller';


export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new ProductController();

    router.get('/', controller.getProduct);
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createProduct);

    return router;
    
  }

}