"use strict";
class Person {
    speak(name) {
        return `Hello, ${name?.toUpperCase() ?? 'Fulano'}!`;
    }
}
const p = new Person();
p.speak('rodrigo');
p.speak();
