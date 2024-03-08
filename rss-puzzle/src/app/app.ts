class App {
    private routing: string;

    constructor() {
        this.routing = 'new Route';
    }

    private render(): void {
        const headerElem: HTMLElement = document.createElement('div');
        headerElem.classList.add('header');

        const mainElem: HTMLElement = document.createElement('div');
        mainElem.classList.add('main');
        document.body.append(headerElem);
        document.body.append(mainElem);
    }

    start(): void {
        this.render();
        console.log(this.routing);
    }
}

export default App;
