const prompt = require("prompt");
const Database = require("./db");
const bcrypt = require('bcryptjs');

async function main() {
  const schema = {
    properties: {
      email: {
        description: "Enter your email account",
        format: "email",
        message: "Enter a valid email!",
        required: true,
        type: "string",
      },
      password: {
        description: "Enter your password",
        message: "Password must be 8 characters or more",
        hidden: true,
        required: true,
        replace: "*",
        type: "string",
        minLength: 8,
      },
    },
  };


  async function createAdmin (err, result) {
    if (err) {
      return onErr(err);
    }

    const { email, password } = result;
    const db = await Database;

    
    try {
      const hash_password =  await bcrypt.hash(password, 10);
      await db.run(`
        INSERT INTO users (
          email,
          password
        ) values (
          "${email}",
          "${hash_password}"
        );
      `);
      console.log("Administrator has been created!");
    } catch (err) {
      console.log(err);
    }


  };


  //
  // Start the prompt
  //
  prompt.start();

  
  prompt.get(schema, createAdmin);

  function onErr(err) {
    console.log(err);
    return 1;
  }
}

main();