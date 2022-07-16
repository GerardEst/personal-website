const template = document.createElement('template');
template.innerHTML = `
<style>
:host{
    display: block;
    font-family: 'Inconsolata';
    padding: 1rem;
    background-color: var(--sec-color);
    cursor: grab;
    border-radius: 0.5rem;
    box-sizing: border-box;
    border: 3px solid var(--sec-color);
}
:host([colliding]){
    border: 3px dashed var(--accent-color);
}
:host(:hover){
    border-color: var(--main-color)
}
p{
    margin: 0
}
</style>

<p class="text"></p>

`;

class AlchemyTag extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode:'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
   
    connectedCallback() {
        this.shadowRoot.querySelector('.text').textContent = this.getAttribute('label')
    }

}
customElements.define('alchemy-tag', AlchemyTag);
