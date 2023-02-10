const adjectives = ['Radiant', 'Majestic', 'Glowing', 'Glittering', 'Shimmering', 'Dazzling', 'Sparkling', 'Glistening', 'Stunning', 'Glimmering', 'Lustrous', 'Glossy', 'Glamorous', 'Beautiful', 'Grand', 'Elegant', 'Graceful', 'Sophisticated', 'Chic', 'Stylish', 'Trendy', 'Fashionable', 'Adorable', 'Charming', 'Haunting', 'Innocent', 'Jovial'];
const nouns = ['Phoenix', 'Dragon', 'Unicorn', 'Pegasus', 'Chimera', 'Griffin', 'Harpy', 'Mermaid', 'Centaur', 'Satyr', 'Nymph', 'Siren', 'Cyclops', 'Minotaur', 'Sphinx', 'Roc', 'Kraken', 'Jabberwocky', 'Yeti', 'Bigfoot', 'Loch Ness Monster', 'Chupacabra', 'Mothman', 'Jersey Devil', 'El Chupacabra', 'Owl', 'Fox'];
const emails = ['yahoo.com', 'sbcglobal.net', 'gmail.com', 'hotmail.com', 'aol.com', 'outlook.com', 'icloud.com', 'zoho.com', 'protonmail.com', 'mail.com', 'fastmail.com'];

// Get a random item given an array
function generateUsername() {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}_${randomNoun}`;
}


const generateUsernameArray = function () {
    const usernameArray = [];
    for (let i = 0; i < 10; i++) {
        usernameArray.push(generateUsername());
    };
    return usernameArray;
};

function generateEmailDomain() {
    const emailDomain = emails[Math.floor(Math.random() * emails.length)];
    return emailDomain;
}

module.exports = { generateUsernameArray, generateEmailDomain };
