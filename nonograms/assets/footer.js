const getFooter = (innerElem = undefined) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    if(innerElem && !Array.isArray(innerElem)) footer.append(innerElem);
    if(innerElem && Array.isArray(innerElem)) innerElem.forEach(el => footer.append(el));

    return footer
}

export default getFooter;