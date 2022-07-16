import {cascade} from '/node_modules/@gerardest/cascader/cascader.js'
import {pairs} from '/pairs.js'
import {dragger} from '/modules/dragger.js'

// Arreglar cascader, si no hi ha gap falla
cascade('#projectlist', {
    minWidth: 300
})

// LA API de drag drop es una merda. Dragger és millor
dragger([...document.querySelectorAll('[dragger]')])

dragger.onCollide = ev => {
    console.log(ev.collider.id + ' collided with '+ ev.collided.id)
    checkPair(ev.collider, ev.collided)
}

dragger.endCollide = ev => {
    console.log(ev.collider.id + ' stopped colliding with '+ ev.collided.id)
    ev.collided.classList.remove('collided')
}

dragger.stopDrag = ev => {
    console.log("Stopped dragging", ev)
}
dragger.startDrag = ev => {
    console.log("Started dragging", ev)
}
dragger.drag = ev => {
    console.log("Dragging", ev)
}


function checkPair(collider, collided){

    collided.classList.add('collided')
    const child = pairs.find( pair => {
        if(pair.parents.indexOf(collider.id) >= 0 && pair.parents.indexOf(collided.id) >= 0){
            return pair.child
        }
    })
    if(child) {
        console.log('Will create child ', child.child)
    }
}
