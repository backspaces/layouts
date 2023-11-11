customElements.define(
    'grid-layout',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }

        render() {
            // prettier-ignore
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: grid;
                        align-content: start;

                        grid-gap: ${this.space};
                        grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
                    }
                </style>
                <slot></slot>
            `
            // console.log('grid:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['min', 'space']
        }
        get min() {
            return this.getAttribute('min') || '250px'
        }
        set min(val) {
            return this.setAttribute('min', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
    }
)

/*

grid-l {
    display: grid;
    grid-gap: var(--s1);
    align-content: start;
    grid-template-columns: 100%;
}


                        grid-template-columns: 100%;

                @supports (width: min(${this.min}, 100%)) {
                    :host {
                        grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
                    }
                }




*/
