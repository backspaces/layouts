customElements.define(
    'stack-layout',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }

        render() {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                    }

                    ::slotted(*) {
                        margin-block-start: 0;
                    }

                    ::slotted(:not(:first-child)) {
                        margin-block-start: ${this.space};
                    }

                    ::slotted(:nth-child(${this.splitAfter})) {
                        margin-block-end: auto;
                        /* fix last child to have no bottom margin */
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
            return ['space', 'recursive', 'splitAfter']
        }
        get space() {
            return this.getAttribute('space') || '1rem'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get recursive() {
            return this.hasAttribute('recursive')
        }
        set recursive(val) {
            return this.setAttribute(val ? 'recursive' : '')
        }
        get splitAfter() {
            return this.getAttribute('splitAfter') || 1000
        }
        set splitAfter(val) {
            return this.setAttribute('splitAfter', val)
        }
    }
)
