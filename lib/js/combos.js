
var recipes = [["pressure", ["air", "air"]], ["energy", ["air", "fire"]], ["dust", ["air", "earth"]], ["lava", ["earth", "fire"]],
["rain", ["air", "water"]], ["mud", ["earth", "water"]], ["steam", ["fire", "water"]], ["sea", ["water", "water"]],
["wind", ["air", "energy"]], ["stone", ["air", "lava"]], ["atmosphere", ["air", "pressure"]], ["cloud", ["air", "steam"]],
["earthquake", ["earth", "energy"]], ["gunpowder", ["dust", "fire"]], ["salt", ["fire", "sea"]], ["volcano", ["earth", "lava"]],
["granite", ["lava", "pressure"]], ["obsidian", ["lava", "water"]], ["brick", ["fire", "mud"]], ["plant", ["earth", "rain"]],
["flood", ["rain", "rain"]], ["ocean", ["sea", "sea"]], ["geyser", ["steam", "earth"]], ["sky", ["air", "cloud"]],
["sand", ["air", "stone"]], ["wall", ["brick", "brick"]], ["fog", ["cloud", "earth"]], ["mountain", ["earth", "earthquake"]],
["storm", ["cloud", "energy"]], ["metal", ["fire", "stone"]], ["explosion", ["fire", "gunpowder"]], ["swamp", ["mud", "plant"]],
["tsunami", ["earthquake", "ocean"]], ["algae", ["ocean", "plant"]], ["isle", ["ocean", "volcano"]], ["wave", ["ocean", "wind"]],
["cotton", ["cloud", "plant"]], ["grass", ["earth", "plant"]], ["tobacco", ["fire", "plant"]], ["seaweed", ["ocean", "plant"]],
["garden", ["plant", "plant"]], ["moss", ["plant", "stone"]], ["coal", ["plant", "pressure"]], ["ash", ["energy", "volcano"]],
["cloud", ["air", "steam"]], ["eruption", ["energy", "volcano"]], ["hurricane", ["energy", "wind"]], ["rust", ["air", "metal"]],
["sound", ["air", "wave"]], ["atomic bomb", ["energy", "explosion"]], ["grenade", ["explosion", "metal"]], ["fireworks", ["explosion", "sky"]],
["glass", ["fire", "sand"]], ["sun", ["fire", "sky"]], ["dew", ["fog", "grass"]], ["bullet", ["gunpowder", "metal"]],
["archipelago", ["isle", "isle"]], ["steel", ["coal", "metal"]], ["electricity", ["energy", "metal"]], ["blade", ["metal", "stone"]],
["mountain range", ["mountain", "mountain"]], ["river", ["mountain", "water"]], ["beach", ["ocean", "sand"]],
["horizon", ["ocean", "sky"]], ["flower", ["garden", "plant"]], ["ivy", ["plant", "wall"]], ["diamond", ["coal", "pressure"]],
["sandstorm", ["energy", "sand"]], ["clay", ["mud", "sand"]], ["cactus", ["plant", "sand"]], ["desert", ["sand", "sand"]],
["quicksand", ["sand", "swamp"]], ["dune", ["sand", "wind"]], ["moon", ["sky", "stone"]], ["boiler", ["metal", "steam"]],
["sandstone", ["sand", "stone"]], ["life", ["energy", "swamp"]], ["house", ["wall", "wall"]], ["pond", ["garden", "water"]],
["bird", ["air", "life"]], ["scissors", ["blade", "blade"]], ["blender", ["blade", "electricity"]], ["scythe", ["blade", "grass"]],
["sword", ["blade", "metal"]], ["golem", ["clay", "life"]], ["pyramid", ["desert", "stone"]], ["oasis", ["desert", "water"]],
["ring", ["diamond", "metal"]], ["human", ["earth", "life"]], ["light bulb", ["electricity", "glass"]], ["wire", ["electricity", "metal"]],
["pottery", ["fire", "clay"]], ["water lily", ["flower", "pond"]], ["sunflower", ["flower", "sun"]], ["glasses", ["glass", "glass"]],
["mirror", ["glass", "metal"]], ["telescope", ["glass", "sky"]]];

var allRecipes = recipes.reduce((comb, [first, second]) => {
  if (!comb.hasOwnProperty(second)) comb[second] = [];
  comb[second].push(first);
  return comb;
}, {});

module.exports = allRecipes;
