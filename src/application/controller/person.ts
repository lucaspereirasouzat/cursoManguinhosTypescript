class PersonController {
    speak(name?: string) {
        return `Hello, ${name?.toUpperCase() ?? 'Fulano'}!`;
    }
}

const p = new PersonController();
p.speak('rodrigo');
p.speak()