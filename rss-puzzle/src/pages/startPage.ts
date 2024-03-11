import { ElemConstruct } from '../components/elemConstruct';
import { LoginForm } from '../components/form/loginForms';
import bgImage from '../assets/img/bgImage.png';

export class StartPage {
    loginForm: LoginForm;
    startElem: HTMLElement;
    descriptionWrap: HTMLElement;

    constructor() {
        this.loginForm = new LoginForm(['text', 'text'], 1);
        this.startElem = ElemConstruct('div', 'start-page');
        this.descriptionWrap = ElemConstruct('div', 'description__wrapper');
    }

    private buildStartImg(): void {
        if (!bgImage) return;
        ElemConstruct('img', 'start-page__img', undefined, this.startElem, [
            { src: './assets/bgImage.png' },
            { alt: 'image' },
        ]);
    }

    public render(): HTMLElement {
        if (this.loginForm) {
            this.buildStartImg();
            this.loginForm.render(this.startElem);
        }

        return this.startElem;
    }
}
