import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("AdminUser", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: bcrypt.hashSync("AdminUser", 10),
    isAdmin: false,
  },
  {
    name: "Elise Conly",
    email: "elise@gmail.com",
    password: bcrypt.hashSync("AdminUser", 10),
    isAdmin: false,
  },
];

export default users;
