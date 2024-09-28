class Person {
    speak(name?: string) {
        return `Hello, ${name?.toUpperCase() ?? 'Fulano'}!`;
    }
}

const p = new Person();
p.speak('rodrigo');
p.speak()