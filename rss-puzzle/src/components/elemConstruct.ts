type Attribute = Record<string, string>;

export const ElemConstruct = (
    elem: string,
    classElem: string,
    text: string | undefined = undefined,
    parent: HTMLElement | undefined = undefined,
    addAttributes: Attribute[] | undefined = undefined
): HTMLElement => {
    const createElem = document.createElement(`${elem}`);
    createElem.classList.add(`${classElem}`);

    if (text) createElem.innerText = text;
    if (addAttributes) {
        addAttributes.forEach((obj) => {
            Object.keys(obj).forEach((attr) => {
                createElem.setAttribute(attr, obj[attr]);
            });
        });
    }
    if (parent) parent.append(createElem);

    return createElem;
};
