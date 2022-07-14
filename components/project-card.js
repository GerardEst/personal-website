const template = document.createElement('template');
template.innerHTML = `
<style>
:host {
    display: flex;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background-color: #F6FFA4;
    padding: 1rem;
    box-shadow: var(--shadow-elevation-medium)
}
::slotted(a){
    background-color: var(--accent-color-2);
    padding: 0.2rem 0.5rem;
}
</style>

<div>
    <slot name="title"></slot>
    <slot name="description"></slot>
    <slot name="link"></slot>
</div>
`;

class ProjectCard extends HTMLElement {
   constructor() {
     super();
     this._shadowRoot = this.attachShadow({ mode:'open' });
     this._shadowRoot.appendChild(template.content.cloneNode(true));
   }
   
   connectedCallback() {
   }

}
customElements.define('project-card', ProjectCard);
