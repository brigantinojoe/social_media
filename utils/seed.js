const connection = require('../config/connection');
const { User } = require('../models');
const { generateUsernameArray, generateEmailDomain } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});

    const users = [];
    const usernameArray = generateUsernameArray();

    for (let i = 0; i < usernameArray.length; i++) {
        const username = usernameArray[i];
        const email = `${username}@${generateEmailDomain()}`;
        const thoughts = [];
        const friends = [];
        users.push({
            username,
            email,
            thoughts,
            friends,
        });
    }

    await User.collection.insertMany(users);

    // loop through the saved applications, for each application we need to generate a application response and insert the application responses
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
