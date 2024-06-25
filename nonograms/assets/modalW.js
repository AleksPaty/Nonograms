const getModalWindow = (className, headerText, bodyText, button = undefined, btnPlace = undefined) => {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal-wrap', `${className}`);

    const header = document.createElement('div');
    header.classList.add('modal-header');
    const hElem = document.createElement('h2');
    hElem.innerText = `${headerText}`;
    header.append(hElem);

    const body = document.createElement('div');
    body.classList.add('modal-body');
    body.insertAdjacentHTML('afterbegin',`<p class="great-text">${bodyText}</p>`);

    if (button) {
        if (btnPlace === 'body') body.append(button);
        if (btnPlace === 'header') header.append(button)
    }

    overlay.append(modal);
    modal.append(header, body);

    document.body.append(overlay)

    function openModal (contentChange = undefined) {
        if (contentChange) {
            document.querySelector('.great-text').innerText = contentChange;
        }

        const modal = document.querySelector(`.${className}`);
        modal.parentElement.classList.add('open')
    }

    return openModal
}

export default getModalWindow