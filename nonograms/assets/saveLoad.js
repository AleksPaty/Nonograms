const saveGame = (solveCeil) => {
    const saveGame = {
        'level': Math.sqrt(document.querySelectorAll('.ceil').length),
        'name': document.querySelector('.name-puzzle').innerText,
        'fillCeilsId': [],
        'crossCeilsId': [],
        solveCeil
    }

    let fillCeils = document.querySelectorAll('.ceil.fill');
    let crossCeils = document.querySelectorAll('.ceil.cross');

    fillCeils.forEach(el => saveGame.fillCeilsId.push(el.id))
    crossCeils.forEach(el => saveGame.crossCeilsId.push(el.id))

    localStorage.setItem('saveGame', JSON.stringify(saveGame))
}
const getSaveData = () => {
    return JSON.parse(localStorage.getItem('saveGame'));
}

export {saveGame, getSaveData}