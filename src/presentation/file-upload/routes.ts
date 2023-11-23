

import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController();

    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultpleFiles );

    return router;
    
  }

}