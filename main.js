import {cascade} from '/node_modules/@gerardest/cascader/cascader.js'
import {pairs} from '/pairs.js'
import {dragger, add} from '/modules/dragger.js'

// Arreglar cascader, si no hi ha gap falla
cascade('#projectlist', {
    minWidth: 300
})

// LA API de drag drop es una merda. Dragger és millor
dragger([...document.querySelectorAll('[dragger]')])

let elements_colliding = []

dragger.onCollide = ev => {
    console.log('Colliding elements: ', ev.collided, ev.collider)
    
    elements_colliding.push(ev.collider)
    elements_colliding.push(ev.collided)
}

dragger.endCollide = ev => {
    console.log('End colliding elements: ', ev.collided, ev.collider)
    ev.collided.classList.remove('collided')
    
    elements_colliding = []
}

// Duplicar amb shift
dragger.startDrag = ev => {
    if(ev.shift){
        createElement(ev.element.getAttribute('label'), {x:ev.x, y:ev.y})
    }
    console.log("Started dragging", ev)
}

/*dragger.stopDrag = ev => {
    console.log("Stopped dragging", ev)
}
dragger.drag = ev => {
    console.log("Dragging", ev)
}*/

dragger.stopDrag = ev => {
    if(elements_colliding.length > 0) checkPair(elements_colliding[0], elements_colliding[1], {x: ev.x, y: ev.y})
}

function checkPair(collider, collided, mousePos){

    const label_collider = collider.getAttribute('label')
    const label_collided = collided.getAttribute('label')

    collided.classList.add('collided')

    const pair = pairs.find( pair => {
        return pair.parents[0] === label_collider && pair.parents[1] === label_collided
    })

    if(pair) {
        console.log('Will create child ', pair.child)

        destroyElement(collider)
        destroyElement(collided)
        createElement(pair.child, mousePos)
        checkBadge()
        givePoints()
    }
}

function checkBadge(){

}

function givePoints(){
    console.log("10 Knowledge points")
}

function createElement(element, pos){
    const tag = document.createElement('alchemy-tag')
    tag.setAttribute('dragger', '')
    tag.setAttribute('label', element)
    
    tag.style.top = pos.y+'px'
    tag.style.left = pos.x+'px'

    document.querySelector('header').appendChild(tag)
    
    add(tag)
}

function destroyElement(el){
    el.remove()
}