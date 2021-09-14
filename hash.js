const bcrypt = require('bcrypt');

async function saltfun(){
const getSalt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash("1234", getSalt)
console.log(getSalt);
console.log(hashed);
const num = Math.round(Math.random()*10)
console.log(num);
}

saltfun();