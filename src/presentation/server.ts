import express from 'express';

interface Options {
  port: number;
}


export class Server {

  private app = express();

  private readonly port: number;


  constructor( options: Options ){
    const { port } = options;
    this.port = port;
  }
  async start() {

    // Middlewares


    // Public folder
    this.app.use( express.static('public') );


    // Routes
    this.app.get('/api/todos', (req, res) => {
      res.json([
        { id: 1, text: 'milk', createdAt: new Date() },
        { id: 2, text: 'rice', createdAt: new Date() },
        { id: 3, text: 'pasta', createdAt: new Date() },
      ])
    })

    this.app.listen( 3000, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

}