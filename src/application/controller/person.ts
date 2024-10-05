export interface Speaker {
    speak(name?: string): string;
}

// test

export class PersonController implements Speaker {
    age?: number
    speak(name?: string) {
        return `Hello, ${name?.toUpperCase() ?? 'Fulano'}! Você tem ${this.age?.toString() ?? "sem idade"} anos.`;
    }
}

