const getHeader = (innerElem = undefined) => {
    const header = document.createElement('header');
    header.classList.add('header');

    const hElem = document.createElement('h1');
    hElem.innerText = 'Nonograms';

    header.append(hElem)
    if(innerElem) header.append(innerElem);

    return header
}

export default getHeader;