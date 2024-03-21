const names = [
  'Emma','Liam','Olivia','Noah','Ava','Elijah','Sophia','Oliver','Isabella','Lucas','Mia','Mason','Harper','Ethan','Charlotte','Logan','Amelia','Aiden','Evelyn','James','Abigail','Benjamin','Emily','Elijah','Elizabeth','Michael','Sofia','Alexander','Avery','William','Ella','Jacob','Scarlett','Jack','Grace','Jackson','Chloe','Sebastian','Penelope','Daniel','Layla','Joseph','Victoria','Henry','Riley','Wyatt','Aria','David','Zoey','Samuel','Aubrey','Carter','Lily','Owen','Lillian','John','Addison','Luke','Natalie','Grayson','Hannah','Matthew','Zoey','Leo','Brooklyn','Isaac','Savannah','Julian','Bella','Gabriel','Nora','Anthony',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)}`;

module.exports = { getRandomName };
