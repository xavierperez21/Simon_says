const btnBegin = document.getElementById('btnBegin')
const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const LAST_LEVEL = 10


class Game {
    constructor () {
        this.begin()
        this.generateSequence()
        setTimeout(() => this.nextLevel(), 600)
    }


    begin() {
        //We do this because we don't want to lose the context of "this". go to the method choseColor() to know more. 
        this.choseColor = this.choseColor.bind(this)
        btnBegin.classList.add('hide')
        this.level = 1
        //JavaScript entiende que si asignamos a una propiedad una variable
        //con el mismo nombre, no es necesario colocar los dos puntos :
        this.colors = {
            blue,
            violet,
            orange,
            green
        }
    }


    generateSequence() {
        //Creamos un array para la secuencia que sera de 10 numeros (10 niveles)
        //Luego llenamos el array con purso ceros con la función 'fill', para
        //que la función map() pueda trabajar, ya que si no hay elementos, no 
        //puede ejecutar nada.
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
        for (var i = 0; i < this.level; i++){
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
        //When we don't want to lose the context of "this" when we call other 
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
                this.eliminateClickEvents()
                if (this.level === (LAST_LEVEL + 1)) {
                    // Win!
                }
                else {
                    setTimeout(() => this.nextLevel(), 1200)
                }
            }
        }
        else {
            // Lose
        }
    }

}


function beginGame () {
    window.game = new Game()
}