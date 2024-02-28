import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLElement;

        sources.addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => {
                if (data) this.view.drawNews(data);
            })
        );
        this.controller.getSources((data) => {
            if (data) this.view.drawSources(data);
        });
    }
}

export default App;
