import { PersonController } from '@/application/controller/person';

describe('should return a greeting message', () => {
    it('should return a greeting message', () => {
        const personController = new PersonController();
        expect(personController.speak('rodrigo')).toBe('Hello, RODRIGO! Você tem sem idade anos.');
    })
}) 