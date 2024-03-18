import { Route } from '../components/route/route';

class App {
    private route: Route;

    constructor() {
        this.route = new Route();
    }

    private render(): void {
        this.route.render();
    }

    start(): void {
        this.render();
    }
}

export default App;
