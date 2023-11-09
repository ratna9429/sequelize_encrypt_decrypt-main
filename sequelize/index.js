"use strict";
import Sequelize from "sequelize";
import newUserDetails from "./models/userDetails.js";
import userOrderDetails from "./models/userOrders.js";

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
let ENV;
let db;
let conn = {};

const { Op } = Sequelize;
const { Query } = Sequelize;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

db = new Sequelize("testDB", "root", "root", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  logging: false,
  dialectOptions: {
    insecureAuth: true,
  },
  define: {
    timestamps: false,
  },
  pool: {
    max: 30,
    min: 0,
    idle: 20000,
    acquire: 60000,
    evict: 20000,
  },
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const models = {
  userOrders: userOrderDetails(db, Sequelize.DataTypes),
  newUserData: newUserDetails(db, Sequelize.DataTypes),
};

models.userOrders.belongsTo(models.newUserData, {
  foreignKey: "userId",
  targetKey: "id",
});

models.newUserData.hasMany(models.userOrders, {
  foreignKey: "userId", // foreign key in user_orders that links to userName in user_details
  as: "orders", // alias for the association
});

try {
  await db.sync();
  // console.log("db Synced Successfully!");
} catch (error) {
  console.error("Unable to Sync db", error);
}

conn.sequelize = db;
conn.Sequelize = Sequelize;

// We define all models according to their files.
const userOrders = db.models.user_orders;
const newUserData = db.models.user_details;

// We export the sequelize connection instance to be used around our app.
export { db, conn, Op, Query, userOrders, newUserData };
