import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Book from "./Book.js";

const BorrowedBook = sequelize.define("BorrowedBook", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  issueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  returnDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fineAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

// one user can borrow many books
User.hasMany(BorrowedBook, { foreignKey: "userId" });
BorrowedBook.belongsTo(User, { foreignKey: "userId" });

// one book can be borrowed by many users
Book.hasMany(BorrowedBook, { foreignKey: "bookId" });
BorrowedBook.belongsTo(Book, { foreignKey: "bookId" });

export default BorrowedBook;
