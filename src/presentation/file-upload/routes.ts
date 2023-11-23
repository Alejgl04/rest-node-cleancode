

import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeFolderMiddleware } from '../middlewares/type.middleware';


export class FileUploadRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new FileUploadController(
      new FileUploadService()
    );

    // Middlewares
    router.use( FileUploadMiddleware.containFiles );
    router.use( TypeFolderMiddleware.validTypes(['users', 'products', 'categories']) );

    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultpleFiles );

    return router;
    
  }

}