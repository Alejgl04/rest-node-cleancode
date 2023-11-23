

import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';


export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(
      new FileUploadService()
    );

    router.use( FileUploadMiddleware.containFiles );

    
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultpleFiles );

    return router;
    
  }

}