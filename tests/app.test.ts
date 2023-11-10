import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';


jest.mock('../src/presentation/server');


describe('should call server with arguments and start', () => {
  
  test('Should work App', async() => {

    await import('../src/app');

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      routes: expect.any(Function),
    });

    expect(Server.prototype.start).toHaveBeenCalledWith()
    
  });

});
