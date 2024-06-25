import Puzzle from "./Puzzle.js";
import {getEasyPuzzle, getEasyPuzzleList} from "./puzzles/smoll.js";
import {getNormalPuzzle, getNormalPuzzleList} from "./puzzles/normal.js";
import {getHardPuzzle, getHardPuzzleList} from "./puzzles/hard.js";
import getHeader from "./header.js";
import getFooter from "./footer.js" ;
import getMenu from "./menu.js";
import getModalWindow from "./modalW.js";
import getButton from "./button.js";
import getTimer from "./timer.js";
import {saveGame, getSaveData} from "./saveLoad.js";

class Game {
    constructor() {
        this.easyPuzzleList = getEasyPuzzleList();
        this.normalPuzzleList = getNormalPuzzleList();
        this.hardPuzzleList = getHardPuzzleList();
        this.puzzle = new Puzzle(getEasyPuzzle(0, this.easyPuzzleList.length - 1));
        this.solveCeil = null;

        this.mainTemplate = '<main class="main"></main>';
        this.infoPuzzleElem = '<div class="puzzle-info"></div>';
        this.puzzleElem = '<div class="list-wrapper"><ul class="list"></ul></div>';
    }

    createTemplate() {
        let menu = getMenu(
            'menu',
            ['Random', ['New 5x5', ...this.easyPuzzleList], ['New 10x10', ...this.normalPuzzleList], ['New 15x15', ...this.hardPuzzleList]],
            'menu-item',
        )
        document.body.append(getHeader(menu))
        document.body.insertAdjacentHTML('beforeend', this.mainTemplate)
        document.body.append(getFooter([
            getButton('save-btn', 'Save game', () => saveGame(this.solveCeil)),
            getButton('reset-btn', 'Reset game', () => this.restartHandle()),
            getButton('load-btn', 'Load game', () => this.loadPuzzle())
        ]))
        document.querySelector('.random').addEventListener('click', () => this.randomHandle())
        
        this.openGreatModal = getModalWindow(
            'greatModal',
            'Congratulations!',
            'Great! You have solved the nonogram in ## seconds!',
            getButton('greatBtn', 'Okey', (e) => e.target.offsetParent.classList.remove('open')),
            'body'
        )
    }

    randomHandle() {
        let hardLevel = Math.floor(1 + Math.random() * (3 + 1 - 1));

        if (hardLevel === 1) this.puzzle = new Puzzle(getEasyPuzzle(0, this.easyPuzzleList.length - 1));
        if (hardLevel === 2) this.puzzle = new Puzzle(getNormalPuzzle(0, this.normalPuzzleList.length - 1));
        if (hardLevel === 3) this.puzzle = new Puzzle(getHardPuzzle(0, this.hardPuzzleList.length - 1));

        document.querySelector('.main').replaceChildren();
        this.puzzleRender()
    }

    restartHandle() {
        const ceilArr = document.querySelectorAll('.ceil');
        ceilArr.forEach((v) => {
          if (v.classList.contains('fill')) v.classList.remove('fill');
        })

        this.solveCeil = 0;
        this.timerManage('restart')
    }

    ceilClickHandle(e) {
        if (!e.target.classList.contains('ceil')) return;

        let puzzleInds = e.target.id;
        let targetArr = this.puzzle.puzzle[+puzzleInds[0]];
        let targetCeil = targetArr[+puzzleInds[1]];

        switch (e.type) {
            case 'click':
                e.target.classList.remove('cross')
                e.target.classList.toggle('fill')

                if (targetCeil && e.target.classList.contains('fill')) this.solveCeil++;
                if (targetCeil && !e.target.classList.contains('fill')) this.solveCeil--;
                if (!targetCeil && e.target.classList.contains('fill')) this.solveCeil--;
                if (!targetCeil && !e.target.classList.contains('fill')) this.solveCeil++;
                break;
            case 'contextmenu':
                e.preventDefault();
                if (targetCeil && e.target.classList.contains('fill')) {
                    e.target.classList.remove('fill')
                    e.target.classList.add('cross')
                    this.solveCeil--;
                } else {
                    e.target.classList.toggle('cross')
                }
                
                break;
            default:
                break;
        }
        
        if(this.solveCeil === this.puzzle.trueCeil) {
            this.timerManage('stop')
            let timeValue = this.timerManage('getValue')
            let seconds = timeValue.split(':').reduce((min, sec) => +min * 60 + +sec)

            this.openGreatModal(`Great! You have solved the nonogram in ${seconds} seconds!`);
        }
        console.log(this.solveCeil)
    }

    createClueElems(clueArr, classClue) {
        let parElem = document.querySelector('.list-wrapper')

        let ulElem = document.createElement('ul')
        ulElem.classList.add(`clue-list${clueArr.length}`,`${classClue}`)
        clueArr.forEach((c) => {
            let elem = document.createElement('li')
            elem.classList.add('clue')

            c.forEach((el) => elem.insertAdjacentHTML('beforeend', `<span>${el}</span>`))
            ulElem.append(elem) 
        })
        parElem.append(ulElem)
    }

    timerManage(command) {
        let timer = document.querySelector('.timer')
        switch (command) {
            case 'add':
                document.querySelector('.list').addEventListener('click', () => {
                    getTimer(
                        timer,
                        this.solveCeil === this.puzzle.trueCeil
                    )
                }, {'once': true})
                break;
            case 'stop':
                let timerId = timer.dataset.timeId;
                clearTimeout(Number(timerId))
                break;
            case 'restart':
                this.timerManage('stop')
                timer.innerHTML = '00:00';
                this.timerManage('add')
                break;
            case 'getValue':
                return timer.innerText;
            default:
                console.log('wrong command!')
                break;
        }
    
    }

    showPuzzleInfo() {
        document.querySelector('.main').insertAdjacentHTML('beforeend', this.infoPuzzleElem)
        const puzzleNameEl = document.createElement('p')
        puzzleNameEl.classList.add('name-puzzle')
        puzzleNameEl.innerText = this.puzzle.puzzleName;
        
        const timerElem = document.createElement('span')
        timerElem.classList.add('timer')
        timerElem.innerText = '00:00';

        document.querySelector('.puzzle-info').append(puzzleNameEl)
        document.querySelector('.puzzle-info').append(timerElem)
    }

    loadPuzzle() {
        const data = getSaveData();
        let puzzleId;

        if (data.level === 5) {
            puzzleId = this.easyPuzzleList.includes(data.name);
            this.puzzle = new Puzzle(getEasyPuzzle(puzzleId, puzzleId))
        }
        if (data.level === 10) {
            puzzleId = this.normalPuzzleList.includes(data.name);
            this.puzzle = new Puzzle(getNormalPuzzle(puzzleId, puzzleId))
        }
        if (data.level === 15) {
            puzzleId = this.hardPuzzleList.includes(data.name);
            this.puzzle = new Puzzle(getHardPuzzle(puzzleId, puzzleId))
        }

        document.querySelector('.main').replaceChildren();
        this.puzzleRender()

        if (data.fillCeilsId.length > 0) {
            data.fillCeilsId.forEach((id) => document.getElementById(id).classList.add('fill'))
        }
        if (data.crossCeilsId.length > 0) {
            data.crossCeilsId.forEach((id) => document.getElementById(id).classList.add('cross'))
        }

        this.solveCeil = data.solveCeil;
    }

    puzzleRender() {
        this.solveCeil = 0;
        this.puzzle.getLineClue()
        this.puzzle.getColumnClue()
        this.showPuzzleInfo()

        document.querySelector('.main').insertAdjacentHTML('beforeend', this.puzzleElem)

        this.createClueElems(this.puzzle.lineClue, 'lineClue')
        this.createClueElems(this.puzzle.columClue, 'columnClue')

        let ulElem = document.querySelector('.list');
        game.puzzle.puzzle.forEach((c, i) => {
            for (let n = 0; n < c.length; n++) {
                let elem = document.createElement('li');
                elem.classList.add('ceil');
                if (c.length === 10 && n === 5) elem.classList.add('divid-l')
                if (c.length === 10 && i === 5) elem.classList.add('divid-u')
                if (c.length === 15 && n === 5 || n === 10) elem.classList.add('divid-l')
                if (c.length === 15 && i === 5 || i === 10) elem.classList.add('divid-u')
                elem.id = `${i}${n}`;

                ulElem.append(elem)
                ulElem.classList.add(`l${c.length}`)
            }
        })

        document.querySelector('.list').addEventListener('click', (e) => this.ceilClickHandle(e))
        document.querySelector('.list').addEventListener('contextmenu', (e) => this.ceilClickHandle(e))
        this.timerManage('add')
    }

    render() {
        this.createTemplate()
        this.puzzleRender()

        const dropMenu = document.querySelectorAll('.dropItems')
        dropMenu.forEach((menu, i) => {
            menu.addEventListener('click', (e) => {
                if (
                    !this.easyPuzzleList.includes(e.target.innerText) &&
                    !this.normalPuzzleList.includes(e.target.innerText)
                ) {
                    if (e.target === menu) return;
                    if (i === 0) this.puzzle = new Puzzle(getEasyPuzzle(0, this.easyPuzzleList.length - 1));
                    if (i === 1) this.puzzle = new Puzzle(getNormalPuzzle(0, this.normalPuzzleList.length - 1));
                    if (i === 2) this.puzzle = new Puzzle(getHardPuzzle(0, this.hardPuzzleList.length - 1));

                    document.querySelector('.main').replaceChildren();
                    this.puzzleRender()
                    return;
                }

                if (this.easyPuzzleList.includes(e.target.innerText)) {
                    let puzzleName = e.target.innerText;
                    let puzzleIndex = this.easyPuzzleList.indexOf(puzzleName);
                    this.puzzle = new Puzzle(getEasyPuzzle(puzzleIndex, puzzleIndex));
                }
                if (this.normalPuzzleList.includes(e.target.innerText)) {
                    let puzzleName = e.target.innerText;
                    let puzzleIndex = this.normalPuzzleList.indexOf(puzzleName);
                    this.puzzle = new Puzzle(getNormalPuzzle(puzzleIndex, puzzleIndex));
                }
                
                document.querySelector('.main').replaceChildren();
                this.puzzleRender() 
            })
        })
        
    }
}

let game = new Game();
game.render()
localStorage.removeItem("saveGame")
console.log(game.puzzle)