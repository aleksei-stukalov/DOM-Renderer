import { MersenneTwister } from '../logical/MersenneTwister.js'

// Local method to shorten randomiser. Returns a value in a passed range or out of 100 by default
const _random = (range) => Math.floor(Math.random() * (range || 100))

/**
 * Creates Game Object DIV Element on the parentObject Element, places it at startPosition coordinates
 * and sets transform-translate animation to arrivePosition coordinates over duration time, if isInfinite
 * then after the animation is over randomely creates new Starting and Ariving coordinates and repeates
 * the animation.
 */
export class GameObject {
    constructor (parentObject, parentWidth, parentHeight) {
        // State
        this.parent = parentObject || document.querySelector('#game-view')
        this.parentWidth = parentWidth
        this.parentHeight = parentHeight
        // Each new Game Object has its duration time randomized at the initialasation and stays the same
        // We have one of 4 Game Object sprites to choose from, but it is going to be random
        this.duration = this.getRandomDuration()
        this.varient = _random(4)
        this.size = Math.round(this.parentWidth * 0.008) * 10 // Always closest rounded number to 8% of Game View width
        this.direction = null   // either 'top' or 'down'
        this.facing = null      // either 'default' or 'reversed'
        this.starting = null
        this.arriving = null

        // Lets create the Game Object
        this.object = document.createElement('div')
        this.object.className = 'object'
        this.object.style.width = this.size + 'px'
        this.object.style.height = this.size + 'px'
        this.object.style.backgroundImage = null
        this.setObject()
        // Changing CSS Variable here to make duration random
        this.object.style.setProperty('--duration', `${this.duration}`)
        // We want to repeat the animation after it has passed the iteration
        this.object.addEventListener('animationiteration', () => this.setObject())

        this.parent.append(this.object)
    }

    getRandomDuration = () => {
        const random = Math.floor(new MersenneTwister(_random(100)).random() * 10)
        return ['11.3s', '11.7s', '12.6s', '13.4s', '14.2s', '15s', '16.8s', '17.6s', '18.4s', '19.2s'][random]
    }

    getStartingCoordinates = () => {
        /**
         * Lets return coordinates on one of of the Game View edges (top, right, bottom or left).
         * We do it by randomizing x (horisontal) and y (vertical) coordinates and then making an
         * array of all possible variations [ [x, 0], [1, y], [x, 1], [0, y] ], since coordinates
         * can only be on the edge it means that one of the values (either x or y) have to be
         * either 0 or 1. After that we randomely select one of four of the variations and that is
         * our final coordinate.
         * If exeption index passed (because for arrival coordinates we want to exclude the edge
         * on which we have already created the Game Object) then we pop out that item from the array
         * and picking random index out of three.
         * Instead of 0 we want a negative value of the size of the Game Object, so when it is created
         * on either top or right edge - it is created outside of it on the same amount of length as
         * it's own size
         */
        const x = _random(this.parentWidth)
        const y = _random(this.parentHeight)
        const variations = [
            [x, -this.size],            // top
            [this.parentWidth, y],      // right
            [x, this.parentHeight],     // bottom
            [-this.size, y]             // left
        ]

        const varient = _random() % 4 // Randomely picking one of the variation of coordinates

        return variations[varient]
    }

    getDiagonalCoordinates = (startedCoordinates, directionUp) => {
        // For the ease of use and clearety of the code we want to hold those cool values in short names
        const x = startedCoordinates[0]
        const y = startedCoordinates[1]
        const width = this.parentWidth
        const height = this.parentHeight

        // Following equasion is from trigiometry and is hard to explain, but  will try.
        // Starting point can be only on one of the edges of the Game View, we find on which of them
        // it is by checking one of the values being equal to either 0 or the length of the edge.
        if (y === -this.size) {
            // On each of the conditional we want to know if the direction of the arriving coordinate
            // going one or other way, which we did by flipping a coin. And after that we want to know
            // if we dealing with landscape or portrait resolution.
            if (directionUp) return x + height <= width ? [x + height, height] : [width, width - x]
            else return x > height ? [x - height, height] : [-this.size, x]
        }
        else if (y === height) {
            if (directionUp) return x + height <= width ? [x + height, -this.size] : [width, x - (width - height)]
            else return x > height ? [x - height, -this.size] : [-this.size, height - x]
        }
        else if (x === -this.size) {
            if (directionUp) return y <= width ? [y, -this.size] : [width, y - width]
            else return (height - y) <= width ? [height - y, height] : [width, width + y]
        }
        else if (x === width) {
            if (directionUp) return y <= width ? [width - y, -this.size] : [-this.size, y - width]
            else return height - y <= width ? [width - (height - y), height] : [-this.size, width + y]
        }
        // Math is fun
    }

    setObject = () => {
        //this.objectDirection = varient === 0 ? 'down' : 'up'

        // Direction is either one ot the other way, so lets have a boolean for the simplicity
        this.direction = _random(2) === 0
        this.starting = this.getStartingCoordinates()
        this.arriving = this.getDiagonalCoordinates(this.starting, this.direction)

        // We can figure out the direction of where the Game Object is arriving by doing a simple equation.
        // For example if arriving Y cooridinate is bigger than starting - that means the Game Object is moving down.
        this.vertical = this.starting[1] > this.arriving[1] ? 'up' : 'down'
        this.horisontal = this.starting[0] > this.arriving[0] ? -1 : 1
        // We can pass those properties in to the styles and have a variations of our Game Objects.
        this.object.style.backgroundImage = `url('static/img/car[${this.varient}]direction[${this.vertical}].png')`
        this.object.style.setProperty('--flip', `scaleX(${this.horisontal})`)

        this.object.style.setProperty('--starting', `translate(${this.starting[0]}px, ${this.starting[1]}px)`)
        this.object.style.setProperty('--arriving', `translate(${this.arriving[0]}px, ${this.arriving[1]}px)`)
    }

    updateParentSize = (width, height) => {
        this.parentWidth = width
        this.parentHeight = height
    }

    destroy = () => {
        console.log('destroying')
        this.object.remove()
    }
}