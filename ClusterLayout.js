customElements.define(
    'cluster-layout',
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
                        display: flex;
                        flex-wrap: wrap;

                        justify-content: ${this.justify};
                        align-items: ${this.align};
                        gap: ${this.space};
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
            return ['justify', 'align', 'space']
        }
        get justify() {
            return this.getAttribute('justify') || 'flex-start'
        }
        set justify(val) {
            return this.setAttribute('justify', val)
        }
        get align() {
            return this.getAttribute('align') || 'flex-start'
        }
        set align(val) {
            return this.setAttribute('align', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
    }
)
