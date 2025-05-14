// inventory.model.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Book from "./book.model.js";

const Inventory = sequelize.define(
  "Inventory",
  {
    // we'll derive `id` from bookId + copyNumber
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Book, key: "id" },
    },
    copyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisher: { type: DataTypes.STRING, allowNull: false },
    yearOfPublishing: { type: DataTypes.DATEONLY, allowNull: false },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  {
    // composite PK if you like, or a separate numeric PK
    indexes: [{ unique: true, fields: ["bookId", "copyNumber"] }],
  }
);

// derive a “virtual” id string for your APIs (e.g. “1-01”)
Inventory.prototype.getIdString = function () {
  return `${this.bookId}-${String(this.copyNumber).padStart(2, "0")}`;
};

// hook to auto-assign copyNumber
Inventory.beforeCreate(async (instance) => {
  const max = await Inventory.max("copyNumber", {
    where: { bookId: instance.bookId },
  });
  instance.copyNumber = (max || 0) + 1;
});

Book.hasMany(Inventory, { foreignKey: "bookId", as: "copies" });
Inventory.belongsTo(Book, { foreignKey: "bookId", as: "book" });

export default Inventory;
