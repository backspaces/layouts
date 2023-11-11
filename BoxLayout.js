customElements.define(
    'box-layout',
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
                        display: block;
                        padding: ${this.padding};
                        border: ${this.borderWidth} solid;
                        color: var(--color-dark);
                        background-color: var(--color-light);
                    }

                    ::slotted(*) {
                        background-color: inherit;
                    }
                </style>
                <slot></slot>
            `
            // console.log('box:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['padding', 'borderWidth']
        }
        get padding() {
            return this.getAttribute('padding') || 'var(--s1)'
        }
        set padding(val) {
            return this.setAttribute('padding', val)
        }
        get borderWidth() {
            return this.getAttribute('borderWidth') || 'var(--border-thin)'
        }
        set borderWidth(val) {
            return this.setAttribute('borderWidth', val)
        }
    }
)
