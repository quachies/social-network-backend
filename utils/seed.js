const connection = require('../config/connection');
const { User } = require('../models');
const { getRandomName } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {

  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];

  const getRandomEmail = () => {
    const email = `${Math.random().toString(36).substring(2, 10)}@example.com`;
    return email;
  };

  for (let i = 0; i < 3; i++) {
    const username = getRandomName();
    const email = getRandomEmail();
    
    users.push({
      username,
      email,
      thoughts: [], 
      friends: [], 
    });
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
