export class PersonController {
    speak(name?: string) {
        return `Hello, ${name?.toUpperCase() ?? 'Fulano'}!`;
    }
}

