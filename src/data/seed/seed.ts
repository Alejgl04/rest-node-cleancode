import { envs } from '../../config';
import { CategoryModel, MongoDatabase, UserModel } from '../mongoDB';
import { ProductModel } from '../mongoDB/models/product.model';
import { seedData } from './data';



(async() => {
  MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  })
  
  await main();


  await MongoDatabase.disconnect();

})();


const randomBetweenFrom0toX = ( x: number ) => {
  return Math.floor( Math.random() * x );
}


async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    ProductModel.deleteMany(),
    CategoryModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany( seedData.users );

  const categories = await CategoryModel.insertMany(
    seedData.categories.map( category => {

      return {
        ...category,
        user: users[0]._id
      }

    })
  );

  await ProductModel.insertMany(
    seedData.products.map( product => {
      
      return {
        ...product,
        user: users[ randomBetweenFrom0toX( seedData.users.length - 1)]._id,
        category: categories[randomBetweenFrom0toX( seedData.categories.length - 1) ]._id,
      }

    })
  )
}