import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor( options: Options ){
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {

    // Middlewares
    this.app.use( express.json() ); //raw
    this.app.use( express.urlencoded({ extended: true }) ); //urlenconded form
    
    // Public folder
    this.app.use( express.static('public') );
    
    this.app.use( this.routes );
  
    // this.app.get('*', (req, res) => {
    //   const indexPath = path.join(__dirname + '../../../public/index.html');
    //   res.sendFile(indexPath);
    // });
    // Routes

    this.app.listen( this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}