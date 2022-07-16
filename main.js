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
    console.log(ev.collider.id + ' collided with '+ ev.collided.id)
    //checkPair(ev.collider, ev.collided)
    
    elements_colliding.push(ev.collider)
    elements_colliding.push(ev.collided)
}

dragger.endCollide = ev => {
    console.log(ev.collider.id + ' stopped colliding with '+ ev.collided.id)
    ev.collided.classList.remove('collided')
    
    elements_colliding = []
}

/*dragger.stopDrag = ev => {
    console.log("Stopped dragging", ev)
}
dragger.startDrag = ev => {
    console.log("Started dragging", ev)
}
dragger.drag = ev => {
    console.log("Dragging", ev)
}*/

dragger.stopDrag = ev => {
    if(elements_colliding.length > 0) checkPair(elements_colliding[0], elements_colliding[1], {x: ev.x, y: ev.y})
}

function checkPair(collider, collided, mousePos){

    collided.classList.add('collided')
    const pair = pairs.find( pair => {
        if(pair.parents.indexOf(collider.id) >= 0 && pair.parents.indexOf(collided.id) >= 0){
            return pair.child
        }
    })
    if(pair) {
        console.log('Will create child ', pair.child)

        destroyElement(collider)
        destroyElement(collided)
        createElement(pair.child, mousePos)
    }
}

function createElement(element, pos){
    const tag = document.createElement('div')
    tag.id = element
    tag.className = 'tag'
    tag.setAttribute('dragger','')
    tag.textContent = element
    
    document.querySelector('header').appendChild(tag)
    
    add(tag)
}

function destroyElement(el){
    el.remove()
}