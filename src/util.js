const fs = require('fs');

const updateTokens = (tokens) =>
{
  fs.writeFile(
    './src/tokens.json', 
    JSON.stringify(tokens, null, 2), 
    function writeJSON(err) {if (err) return console.log(err)}
  )
}

const updateCreatedIDs = (createdIDs) =>
{
  fs.writeFile(
    './src/createdIDs.json', 
    JSON.stringify(createdIDs, null, 2), 
    function writeJSON(err) {if (err) return console.log(err)}
  )
}

exports.updateTokens = updateTokens;
exports.updateCreatedIDs = updateCreatedIDs;