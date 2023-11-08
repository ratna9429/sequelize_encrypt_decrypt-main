import { db, conn, userOrders, newUserData } from "./sequelize/index.js";
const PORT = 8080;
import AesEncryption from "aes-encryption";
const aesEncrypt = new AesEncryption();
aesEncrypt.setSecretKey(
  "11122233344455566677788822244455555555555555555231231321313aaaff"
);

async function init() {
  console.log(`Starting Sequelize + Express example on port ${PORT}...`);

  const userDetailsFakeData = {
    userName: "JohnDoe2",
    email: "johndoe2@example.com",
    contactNumber: "3355778802",
    loginId: 1,
    clientLoginId: 2,
    roleId: 3,
    groupId: 4,
    createdAt: Date.now() / 1000,
    updatedAt: Date.now() / 1000,
    status: 5,
    address: "123 Main St, City, Country",
    customerName: "Jane Smith",
    dob: "1990-05-15",
    bloodGroup: "AB+",
    vehicleNumber: "ABC123",
    vehicleIdentificationNumber: "VIN123456",
    vehicleColour: "Blue",
    vehicleModel: "Sedan",
    macAddress: "00:1A:2B:3C:4D:5E",
  };

  const userOrdersFakeData = {
    userName: "JohnDoe2",
    orders: "apple,banana",
  };

  const t = await conn.sequelize.transaction();
  // let isValidInsert = await newUserData.create(userDetailsFakeData);

  // console.log("isValidInsert.....", isValidInsert);

  // let isValidInsertOrders = await userOrders.create(userOrdersFakeData);

  // console.log("isValidInsertOrders.....", isValidInsertOrders);

  if (true) {
    // Find user details and their associated orders
    const userDetailsResponse = await newUserData.findOne({
      where: { userName: "JohnDoe2" },
      include: [{ model: userOrders, as: "orders" }],
    });

    // Access associated orders
    const ordersData = userDetailsResponse.orders; // An array of associated orders

    console.log("ordersData=====", ordersData);

    if (ordersData && ordersData.length > 0) {
      ordersData.forEach((order) => {
        const ordersValue = order.orders; // Access the 'orders' property for each order
        console.log("Orders Value:", ordersValue);
      });
    } else {
      console.log("No orders found for this user.");
    }
    // let isValidInsert = await userData.findOne({
    //   where: { username: "helloworld" },
    // });
    // let isValidInsert = await newUserData.findAll();
    // let isValidInsert = await newUserData.findOne({
    //   //We can pass one or more than one keys inside where condition.
    //   where: {
    //     email: "johndoe4@example.com",
    //   },
    // });
    // console.log("isValidInsert.....", isValidInsert);
    // if (isValidInsert && isValidInsert.dataValues) {
    //   console.log("isValidInsert112...", isValidInsert.dataValues);
    // }
    //
    //
    //
    //email encrption area.....
    // async function encryptEmails() {
    //   const t = await conn.sequelize.transaction();
    //   try {
    //     const records = await newUserData.findAll();
    //     for (const record of records) {
    //       if (record.email) {
    //         record.email = aesEncrypt.encrypt(record.email);
    //         await record.save({ transaction: t });
    //       }
    //     }
    //     await t.commit();
    //     console.log("Emails encrypted successfully.");
    //   } catch (error) {
    //     await t.rollback();
    //     console.error("Error encrypting emails:", error);
    //   }
    // }
    // // Call the function to encrypt emails
    // encryptEmails();
  }

  await t.commit();
}

init();
