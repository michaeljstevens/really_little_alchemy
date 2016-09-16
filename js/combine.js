var allRecipes = require('./combos.js');

function combine(el1, el2) {
    let recipe = [el1, el2].sort().join(',');
    return allRecipes[recipe];
}

module.exports = combine;
