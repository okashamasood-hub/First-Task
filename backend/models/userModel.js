const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    email: "okasha@gmail.com",
    password: bcrypt.hashSync("123123456", 10),
    name: "Okasha"
  }
];

module.exports = users;