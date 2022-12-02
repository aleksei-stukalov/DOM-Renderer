const d = document

// Lets fill up our Dev Console and have its State stored.
const devToolElement = d.querySelector('#dev-console')
devToolElement.classList.add('hidden')
// Cursor position part of the Dev Console.
const devToolCursor = d.createElement('div')
devToolCursor.id = 'dev-console_cursor'
//devToolCursor.className = 'hidden'
// Both X and Y position is displayed with H4 tag that holds the wording and span tag for the value
const devToolCursorX = d.createElement('h4')
const devToolCursorY = d.createElement('h4')
devToolCursorX.innerHTML = `horisontal:<span>Initiated</span>`
devToolCursorY.innerHTML = `vertical:<span>Initiated</span>` // so as this one
// And so we can reference span elements in the future
const devToolCursorValueX = devToolCursorX.querySelector('span')
const devToolCursorValueY = devToolCursorY.querySelector('span')
// Adding position representative elements to the parent
devToolCursor.append(devToolCursorX, devToolCursorY)


// Mouse click detection
const detToolClick = d.createElement('div')
detToolClick.id = 'dev-console_click'
//
const detToolClickState = d.createElement('h4')
detToolClickState.innerHTML = `mouse state: <span>Idle</span>`
//
const detToolClickStateValue = detToolClickState.querySelector('span')
// Adding to Click detector
detToolClick.append(detToolClickState)


// Click target detection
const detToolClickTarget = d.createElement('div')
detToolClickTarget.id = 'dev-console_target'
//
const detToolClickTargetState = d.createElement('h4')
detToolClickTargetState.innerHTML = `click target: <span>Empty</span>`
//
const detToolClickTargetValue = detToolClickTargetState.querySelector('span')
// Adding to Click detector
detToolClick.append(detToolClickTargetState)


// Toggle button
const devToolToggle = d.createElement('button')
devToolToggle.id = 'dev-console_toggle'
devToolToggle.innerText = 'Toggle Console'
devToolToggle.addEventListener('click', () => devToolElement.classList.toggle('hidden'))

// Adding everything to the console. This should be the very last line of dev console logic
devToolElement.append(devToolToggle, devToolCursor)

// Functions to update dev console values
// Done in a Class style but with a simple object
export const devTool = {
    reset: () => {
        detToolClickTargetValue.innerText = 'Empty'
        detToolClickStateValue.innerText = 'Idle'
    },
    cursorPosition: (x, y) => {
        // Only updating the inner text of span elements
        devToolCursorValueX.innerText = x
        devToolCursorValueY.innerText = y
    },
    cursorState: (state) => detToolClickStateValue.innerText = state,
    targetName: (state) => detToolClickTargetValue.innerText = state ? state : null
}

// Adding cursor position logic here
d.addEventListener('mousemove', (event) => {
    // On each call of the listener we capturing the position of the cursor
    const cursorX = event.clientX
    const cursorY = event.clientY

    devTool.cursorPosition(cursorX, cursorY)
})

// TODO
// [ ] Making logic for mouse state
