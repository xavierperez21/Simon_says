const btnBegin = document.getElementById('btnBegin')
const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
let actual_level = document.getElementById('actual_level')
const LAST_LEVEL = 10
let countDownTime = 3


class Game {
    constructor () {
        this.countDown()
    }

    countDown() {
        btnBegin.textContent = countDownTime;

        if(countDownTime == 0){
            this.begin()
            this.generateSequence()
            setTimeout(() => this.nextLevel(), 500)
        }
        else{
            countDownTime -= 1;
            setTimeout(() => this.countDown(),1000);
        }
    }


    begin() {
        //We do this because we don't want to lose the context of "this". go to the method choseColor() to know more. 
        this.choseColor = this.choseColor.bind(this)
        
        this.toggleBtnBegin()

        this.level = 1
        this.showActualLevel(this.level)
        
        //JavaScript understands that if we assign a property to a variable
        //that has the same name, there's no need to put the two points :
        this.colors = {
            blue,
            violet,
            orange,
            green
        }
    }

    toggleBtnBegin () {
        if (btnBegin.classList.contains('hide')){
            btnBegin.classList.remove('hide')
            btnBegin.textContent = "Start Game!"
        }
        else {
            btnBegin.classList.add('hide')
        }
    }


    generateSequence() {
        //We creat an array for the sequence that's gonna be of 10 numbers (10 levels)
        //Then we fill the array with ceros using the method 'fill', so that the
        //method map() can work. This is becasue if we don't have elements in the array 
        //the methodd map() can't work.
        this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }


    nextLevel() {
        this.correctAnswers = 0
        this.illuminateSequence()
        this.addClickEvents()
    }


    transformNumberToColor(number) {
        switch(number) {
            case 0:
                return 'blue'
            case 1:
                return 'violet'
            case 2:
                return 'orange'
            case 3:
                return 'green'
        }
    }


    transformColorToNumber(color) {
        switch(color) {
            case 'blue':
                return 0
            case 'violet':
                return 1
            case 'orange':
                return 2
            case 'green':
                return 3
        }
    }


    illuminateSequence() {
        for (let i = 0; i < this.level; i++){
            const color = this.transformNumberToColor(this.sequence[i])
            setTimeout(() => this.illuminateColor(color), 1000 * i)
        }
    }


    illuminateColor(color) {
        this.colors[color].classList.add('light')
        setTimeout(() => this.turnOffColor(color), 350)
    }


    turnOffColor(color) {
        this.colors[color].classList.remove('light')
    }


    addClickEvents() {
        //If we don't want to lose the context of "this" when we call other 
        //method of the class inside other function, like when we use the addEventListener
        //We have to use the method "bind()" to keep the context of "this" to
        //still be our object "Game".

        //Sometimes, we create a new variable to make reference to who is "this"
        //  var _this = this    or  var self = this
        this.colors.blue.addEventListener('click', this.choseColor) 
        this.colors.violet.addEventListener('click', this.choseColor)
        this.colors.green.addEventListener('click', this.choseColor)
        this.colors.orange.addEventListener('click', this.choseColor)
    }


    eliminateClickEvents() {
        this.colors.blue.removeEventListener('click', this.choseColor) 
        this.colors.violet.removeEventListener('click', this.choseColor)
        this.colors.green.removeEventListener('click', this.choseColor)
        this.colors.orange.removeEventListener('click', this.choseColor)
    }


    choseColor(ev) {
        const colorName = ev.target.dataset.color
        const colorNumber = this.transformColorToNumber(colorName)
        
        this.illuminateColor(colorName)

        if (colorNumber === this.sequence[this.correctAnswers]) {
            this.correctAnswers++
            if (this.correctAnswers === this.level) {
                this.level++
                this.showActualLevel(this.level)
                this.eliminateClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    this.winGame()
                }
                else {
                    setTimeout(() => {
                        this.nextLevel()
                    }, 1200)
                }
            }
        }
        else {
            this.gameOver()
        }
    }

    showActualLevel (level) {
        if (level != (LAST_LEVEL + 1)){
            actual_level.textContent = `Level: ${level}`;
        }
    }

    winGame() {
        //Swal returns a Promise
        swal("Simon","Congratulations! you win the game!", "success")
            .then(() => this.begin())
    }

    gameOver() {
        //Swal returns a Promise
        swal("Simon","Sorry! you lose :(!", "error")
            .then(() => {
                this.eliminateClickEvents()
                this.begin()
            })
    }

}


function beginGame () {
    window.game = new Game()
}