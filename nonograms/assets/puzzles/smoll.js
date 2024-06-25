const easyPuzzles = {
    'Something 1': [
        [1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 0, 1, 1, 1],
        [1, 0, 1, 1, 1]
    ],
    'Something 2': [
        [0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1]
    ],
    'Something 3': [
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1]
    ],
    'Something 4': [
        [0, 0, 0, 1, 0],
        [1, 1, 0, 0, 1],
        [1, 1, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0]
    ],
    'Deer': [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 0],
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0]
    ],
    'Smile': [
        [1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0]
    ]
}

const getEasyPuzzleList = () => {
    return Object.keys(easyPuzzles)
}

const getEasyPuzzle = (min, max) => {
    let puzzleNumb = min + Math.random() * (max + 1 - min);
    let key = Object.keys(easyPuzzles)[Math.floor(puzzleNumb)];

    return [key, easyPuzzles[key]]
}

export {getEasyPuzzle, getEasyPuzzleList}