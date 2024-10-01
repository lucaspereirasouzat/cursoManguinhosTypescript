import { PersonController, Speaker } from "@/application/controller/person";

class Server {
    init(speaker:Speaker) {
        console.log(speaker.speak('rodrigo'));
        console.log(speaker.speak());
    }
}

const server = new Server();
server.init(new PersonController());
