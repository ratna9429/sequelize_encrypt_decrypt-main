import bcrypt from "bcrypt";
import AesEncryption from "aes-encryption";
const aesEncrypt = new AesEncryption();
aesEncrypt.setSecretKey(
  "11122233344455566677788822244455555555555555555231231321313aaaff"
);

export default function (sequelize, DataTypes) {
  return sequelize.define(
    "user_details",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING(32),
      },
      email: {
        type: DataTypes.STRING(100),
      },
      contactNumber: {
        type: DataTypes.STRING(100),
      },
      loginId: {
        type: DataTypes.INTEGER,
      },
      clientLoginId: {
        type: DataTypes.INTEGER,
      },
      roleId: {
        type: DataTypes.INTEGER,
      },
      groupId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.STRING(255),
      },
      customerName: {
        type: DataTypes.STRING(100),
      },
      dob: {
        type: DataTypes.STRING(100),
      },
      bloodGroup: {
        type: DataTypes.STRING(100),
      },
      vehicleNumber: {
        type: DataTypes.STRING(100),
      },
      vehicleIdentificationNumber: {
        type: DataTypes.STRING(100),
      },
      vehicleColour: {
        type: DataTypes.STRING(100),
      },
      vehicleModel: {
        type: DataTypes.STRING(100),
      },
      macAddress: {
        type: DataTypes.STRING(255),
      },
    }
    // {
    //   hooks: {
    //     beforeCreate: (user, options) => {
    //       console.log("beforeCreate:-----", user);

    //       const fieldsToEncrypt = [
    //         "userName",
    //         "email",
    //         "contactNumber",
    //         "address",
    //         "customerName",
    //         "dob",
    //         "bloodGroup",
    //         // Add more fields to encrypt as needed
    //       ];

    //       fieldsToEncrypt.forEach((field) => {
    //         if (user[field] && user[field] !== "") {
    //           user[field] = aesEncrypt.encrypt(user[field]);
    //         }
    //       });
    //     },

    //     beforeFind: (user, options) => {
    //       console.log("beforeFind:-----", user);

    //       if (user && user.where) {
    //         for (const key in user.where) {
    //           if (user.where[key] && user.where[key] !== "") {
    //             switch (key) {
    //               case "userName":
    //               case "email":
    //               case "contactNumber":
    //               case "address":
    //               case "customerName":
    //               case "dob":
    //               case "bloodGroup":
    //                 user.where[key] = aesEncrypt.encrypt(user.where[key]);
    //                 break;
    //               // Add more cases for other fields as needed
    //             }
    //           }
    //         }
    //       }
    //     },

    //     afterFind: (user, options) => {
    //       console.log("afterFind:-----", user);

    //       if (user && user.dataValues) {
    //         for (const key in user.dataValues) {
    //           switch (key) {
    //             case "userName":
    //             case "email":
    //             case "contactNumber":
    //             case "address":
    //             case "customerName":
    //             case "dob":
    //             case "bloodGroup":
    //               if (user.dataValues[key]) {
    //                 user.dataValues[key] = aesEncrypt.decrypt(
    //                   user.dataValues[key]
    //                 );
    //               }
    //               break;
    //             // Add more cases for other fields as needed
    //           }
    //         }
    //       }
    //     },
    //   },
    // }
  );
}
