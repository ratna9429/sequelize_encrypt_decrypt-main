import bcrypt from "bcrypt";
import AesEncryption from "aes-encryption";
const aesEncrypt = new AesEncryption();
aesEncrypt.setSecretKey(
  "11122233344455566677788822244455555555555555555231231321313aaaff"
);

export default function (sequelize, DataTypes) {
  return sequelize.define("user_orders", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER(10),
    },
    userName: {
      type: DataTypes.STRING(32),
    },
    orders: {
      type: DataTypes.STRING(100),
    },
  });
}
