import { ElemConstruct } from '../elemConstruct';

export class LoginForm {
    valueInputs: string[];
    amountBtn: number;

    constructor(valueInputs: string[], amountBtn = 1) {
        this.valueInputs = valueInputs;
        this.amountBtn = amountBtn;
    }

    private buildForm(): HTMLElement {
        const formElem = ElemConstruct('form', 'login__form', undefined, undefined, [{ action: '' }]);

        ElemConstruct('h2', 'login__title', 'Login', formElem);
        return formElem;
    }

    private buildInputs(): HTMLElement {
        const loginBody = ElemConstruct('div', 'login__body');
        const fragment = document.createDocumentFragment();

        this.valueInputs.forEach((input, i) => {
            const wrapper = ElemConstruct('div', 'login__body_wrap');
            const regex = i === 0 ? '^[A-Z][a-z\\-]{2,}' : '^[A-Z][a-z\\-]{3,}'; //eslint-disable-line

            ElemConstruct('input', 'login__body_input', undefined, wrapper, [
                { type: input },
                { placeholder: i === 0 ? 'First Name' : 'Surname' },
                { pattern: `${regex}` },
                { title: `The first letter must be capitalized. Use Latin letters and (-). Min length: ${i ? 4 : 3}` },
                { required: '' },
            ]);

            fragment.append(wrapper);
        });

        loginBody.appendChild(fragment);
        return loginBody;
    }

    private buildButton(): DocumentFragment {
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= this.amountBtn; i += 1) {
            const btn = ElemConstruct('button', 'login__button', 'Login', undefined, [{ type: 'submit' }]);
            fragment.appendChild(btn);
        }
        return fragment;
    }

    public render(parent: HTMLElement | Element): void {
        const form = this.buildForm();
        const loginBody = this.buildInputs();
        const fragmentBtns = this.buildButton();

        form.append(loginBody);
        form.append(fragmentBtns);
        parent.append(form);
    }
}
