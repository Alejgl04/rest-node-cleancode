

import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services';


export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(
      new FileUploadService()
    );

    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultpleFiles );

    return router;
    
  }

}