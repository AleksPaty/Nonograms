const getButton = (className, btnText = undefined, callback = undefined) => {
    const btnElem = document.createElement('button');
    btnElem.setAttribute('type', 'button');
    btnElem.classList.add(`${className}`);

    if (btnText) btnElem.innerText = btnText;
    if (callback) btnElem.addEventListener('click', (e) => callback(e))
    return btnElem
}

export default getButton