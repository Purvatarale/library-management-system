import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db.js";
import jwt from "jsonwebtoken";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("admin", "student"),
      allowNull: false,
      defaultValue: "student",
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

User.prototype.generateAuthToken = function () {
  return jwt.sign(
    { id: this.id, role: this.role, name: this.name, email: this.email },
    process.env.JWTSECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default User;
