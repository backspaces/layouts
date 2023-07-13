customElements.define(
    'box-layout',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }

        render() {
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
                        color: inherit;
                    }
                </style>
                <slot></slot>
            `
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
            return this.getAttribute('padding') || '1rem'
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
