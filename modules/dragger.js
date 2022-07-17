let draggables = []

// El movimiento tendria que aplicarse a un transform, para que se mueva en referencia
// a su posición inicial, que puede ser tanto en px como en %.
// Posibilidad de tener un elemento que puede ser colisionado pero no se pueda mover
export function dragger(elements){

    draggables = elements

    for(let element of draggables){

        adjustElement(element)

        document.addEventListener('mousemove', ev => {
            // Detect ctrl or shift
            const draggedElement = document.querySelector('[dragging]')
            if(draggedElement) move(draggedElement, {
                x: ev.clientX,
                y: ev.clientY,
                shift: ev.shiftKey,
                ctrl: ev.ctrlKey
            })
        })

        document.addEventListener('mouseup', ev => {
            const draggedElement = document.querySelector('[dragging]')
            if(draggedElement) stopDragging(draggedElement, {
                x: ev.clientX,
                y: ev.clientY,
                shift: ev.shiftKey,
                ctrl: ev.ctrlKey
            })
        })
    }
    
}

export function add(element){
    draggables.push(element)
    adjustElement(element)
}

function adjustElement(element){
    element.style.userSelect = 'none'
    element.style.position = 'absolute'
    element.style.margin = 0

    // Prevent conflicts when dragging browser predefined draggable elements
    element.ondragstart = () => false;

    /* Touch events */

    element.addEventListener('touchstart', ev => {
        startDrag(ev.target, {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        })
    })
    element.addEventListener('touchmove', ev => {
        const draggedElement = ev.target
        if(draggedElement) move(draggedElement, {
            x: ev.touches[0].clientX,
            y: ev.touches[0].clientY
        })
    })
    document.addEventListener('touchend', ev => {
        stopDragging(ev.target)
    })


    /* Mouse events */

    element.addEventListener('mousedown', ev => {
        startDrag(element, {
            x: ev.clientX,
            y: ev.clientY,
            shift: ev.shiftKey,
            ctrl: ev.ctrlKey
        })
    })
}

function startDrag(element, {x,y,shift,ctrl}){
    element.setAttribute('dragging', '')
    element.style.zIndex = 1000
    element.setAttribute('shiftX', x - element.getBoundingClientRect().left)
    element.setAttribute('shiftY', y - element.getBoundingClientRect().top)

    if(dragger.startDrag) dragger.startDrag({element,x,y,shift,ctrl})
}

function move(moving, {x,y,shift,ctrl}){    
    moving.style.left = x - moving.getAttribute('shiftX') + 'px'
    moving.style.top = y - moving.getAttribute('shiftY') + 'px'

    const notYou = draggables.filter( drag => drag !== moving )

    if(dragger.drag) dragger.drag({element: moving,x,y,shift,ctrl})

    // Detectar si está sobre d'un altre element
    for(let el of notYou){
        
        // Si coincideix amb la posicio d'algun dels altres, està a sobre
        const el_x = el.getBoundingClientRect().left
        const el_y = el.getBoundingClientRect().top
        const el_width = el.getBoundingClientRect().width
        const el_height = el.getBoundingClientRect().height
        
        const movingEl_x = moving.getBoundingClientRect().left
        const movingEl_y = moving.getBoundingClientRect().top
        const movingEl_width = moving.getBoundingClientRect().width
        const movingEl_height = moving.getBoundingClientRect().height
        
        if(movingEl_x + movingEl_width >= el_x && movingEl_x <= el_x + el_width && movingEl_y + movingEl_height >= el_y && movingEl_y <= el_y + el_height){
            if(!el.hasAttribute('colliding')){ 
                el.setAttribute('colliding','')
                if(dragger.onCollide) dragger.onCollide({ // No sé perquè això funciona
                        collider: moving, 
                        collided: el
                    })
            }else{ 
                // May do whileColliding event. Unsure if would be useful
            }
        }else{
            if(el.hasAttribute('colliding')){
                el.removeAttribute('colliding')
                if(dragger.endCollide) dragger.endCollide({
                    collider: moving, 
                    collided: el
                })
            }
        }   
    }
}

function stopDragging(element, {x,y,shift,ctrl}){
    element.style.zIndex = 'unset'
    element.removeAttribute('dragging')
    
    if(dragger.stopDrag) dragger.stopDrag({element,x,y,shift,ctrl})
}