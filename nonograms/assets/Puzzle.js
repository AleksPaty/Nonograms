class Puzzle {
    constructor(puzzArr) {
        [this.puzzleName, this.puzzle] = puzzArr;
        this.lineClue = [];
        this.columClue = [];
        this.trueCeil = 0;
    }

    addTrueCeils() {
        this.trueCeil++
    }

    getLineClue() {
        this.puzzle.forEach(line => {
            let arr = [];
            let clue = 0;
            for (let i = 0; i < line.length; i++) {
                if (line[i]) {
                    this.addTrueCeils()
                    clue++;
                    if(i === line.length - 1) arr.push(clue);
                }
                if (!line[i] && i !== 0 && clue > 0) {
                    arr.push(clue);
                    clue = 0;
                }
            }
            
            this.lineClue.push(arr)
        });
    }

    getColumnClue() {
        const puzzle = this.puzzle;
        for (let i = 0; i < puzzle.length; i++) {
            let arr = [];
            let clue = 0;
            for (let n = 0; n < puzzle.length; n++) {
                if(puzzle[n][i]) {
                    clue++;
                    if(n === puzzle.length - 1) arr.push(clue)
                }
                if(!puzzle[n][i] && n !== 0 && clue > 0) {
                    arr.push(clue);
                    clue = 0;
                }
            }
            this.columClue.push(arr)
        }
    }
}

export default Puzzle;