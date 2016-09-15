var byRecipe = require('./combos.js')

function combine(element1, element2) {
    var recipe = [element1, element2].sort().join(',');
    return byRecipe[recipe];
}

module.exports = combine;
