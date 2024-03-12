import { ElemConstruct } from '../components/elemConstruct';
import { LoginForm } from '../components/form/loginForms';
import bgImage from '../assets/img/bgImage.png';
import { StorageService } from '../components/local-storage.service';
import { UserStorage } from '../types/usedInterface';

export class StartPage {
    startElem: HTMLElement;
    storageService: StorageService;
    loginForm: LoginForm;
    descriptionWrap: HTMLElement;

    constructor() {
        this.startElem = ElemConstruct('div', 'start-page');
        this.storageService = new StorageService();
        this.loginForm = new LoginForm(['text', 'text'], 1);
        this.descriptionWrap = ElemConstruct('div', 'description__wrapper');
    }

    private buildStartImg(): void {
        if (!bgImage) return;
        ElemConstruct('img', 'start-page__img', undefined, this.startElem, [
            { src: './assets/bgImage.png' },
            { alt: 'image' },
        ]);
    }

    private buildWelcomeElem(): HTMLElement {
        const welcomeElem = ElemConstruct('div', 'welcome');
        ElemConstruct('h1', 'welcome__header', 'ENGLISH PUZZLE', welcomeElem);
        ElemConstruct('p', 'welcome__p1', 'Click on words, collect phrases.', welcomeElem);
        ElemConstruct('p', 'welcome__p2', 'Words can be drag and drop. Select tooltips in the menu', welcomeElem);
        ElemConstruct('button', 'welcome__btn', 'Start', welcomeElem, [{ type: 'button' }]);

        return welcomeElem;
    }

    public removeWelcomeElem(): void {
        this.startElem.replaceChildren();
        this.startElem.classList.add('empty');
    }

    private chooseRenderElem(): void {
        if (!this.storageService.getData()) {
            this.loginForm.render(this.startElem, this.redirectToWelcomePage.bind(this));
        } else {
            this.startElem.append(this.buildWelcomeElem());
        }
    }

    public redirectToWelcomePage(data: UserStorage): void {
        this.storageService.saveData(this.storageService.storageKey, data);
        this.chooseRenderElem();
    }

    public render(): HTMLElement {
        this.buildStartImg();
        this.chooseRenderElem();

        return this.startElem;
    }
}
