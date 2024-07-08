// // import { Sequelize } from "sequelize";

// const databaseUri = process.env.DATABASE_URI;

// // export const sequelize = new Sequelize(databaseUri!, {
//     dialectOptions: {
//         dateStrings: true,
//     },
//     logging: console.log,
// });

// export default async function () {
//     try {
//         await sequelize.authenticate();
//         console.log("Connected to db")
//         // Sync models with database
//         await sequelize.sync({ alter: true });

//         return sequelize;
//     } catch (error: any) {
//         console.log("Error while connecting to db", error.message)
//     }
// }