import path from 'path';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import { Uuid } from '../../config';
import { CustomError } from '../../domain';

export class FileUploadService {

  constructor(
    private readonly uuid = Uuid.v4
  ){}

  private checkFolder( folderPath: string ){

    if ( !fs.existsSync(folderPath) ) {
      fs.mkdirSync(folderPath);
    }    
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ){
    try {
    
      const fileExtensions  = file.mimetype.split('/').at(1) ?? '';
      if ( !validExtensions?.includes(fileExtensions)) {
        throw CustomError.badRequest(`Invalid extensions ${fileExtensions}, valid ones [${validExtensions}]`)
      }

      const fileDestinition = path.resolve( __dirname, '../../../', folder );
      this.checkFolder(fileDestinition);

      const fileName = `${this.uuid()}.${fileExtensions}`;

      file.mv(`${fileDestinition}/${fileName}`);

      return {fileName};

    } catch (error) {
      throw error;
            
    }
  }


  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ){

    const filesNames = await Promise.all(
      files.map( file => this.uploadSingle (file,folder,validExtensions))
    );

    return filesNames;
  }

}