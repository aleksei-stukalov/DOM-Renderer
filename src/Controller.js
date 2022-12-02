import { devTool } from './View.js'
import { GameObject } from './functional/GameObject.js'

const d = document
const w = window

// References
const gameView = d.querySelector('#game-view')
// CONSTANTS
let gameObjectCount = 500
// Global Information
let gameViewWidth = gameView.offsetWidth
let gameViewHeight = gameView.offsetHeight
// State
let gameObjectsArray = []

// Creating Game Objects
for (let index = 0; index < gameObjectCount; index++) {
    setTimeout(() => {
        gameObjectsArray.push(new GameObject(gameView, gameViewWidth, gameViewHeight))
    }, `${index}0`)
}
// Lets listen if the window has changed the size, and if so lets update out Game Objects
w.addEventListener('resize', () => {
    gameObjectsArray.forEach(gameObject => gameObject.updateParentSize(gameView.offsetWidth, gameView.offsetHeight))
})

// very lazy implementation
// I am not going to provide any commentary for this one, this is a temprory implementation and is not here to stay
const buttonToSmall = d.querySelector('#change-small')
const buttonToBig = d.querySelector('#change-big')

buttonToBig.addEventListener('click', (event) => {
    let hasAmount = gameObjectsArray.length
    const changeTo = event.target.innerText

    if (changeTo != hasAmount) {
        const difference = changeTo - hasAmount

        for (let index = 0; index < difference; index++) {
            setTimeout(() => {
                gameObjectsArray.push(new GameObject(gameView, gameViewWidth, gameViewHeight))
            }, `${index}0`)
        }
    }
})

buttonToSmall.addEventListener('click', (event) => {
    let hasAmount = gameObjectsArray.length
    const changeTo = event.target.innerText

    if (changeTo != hasAmount) {
        const difference = hasAmount - changeTo

        for (let index = 0; index < difference; index++) {
            console.log(index)
            gameObjectsArray[index].destroy()
        }
        gameObjectsArray.length = 100
    }
})