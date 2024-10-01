import { PersonController } from "../../application/controller/person.js";

const p = new PersonController();
console.log(p.speak('rodrigo'));
p.speak()

console.log(process.env)