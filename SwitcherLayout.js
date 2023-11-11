customElements.define(
    'switcher-layout',
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

                        gap: ${this.space};
                    }

                    ::slotted(*) {
                        flex-grow: 1;
                        flex-basis: calc(${this.threshold} - 100%) * 999);
                    }

                </style>
                <slot></slot>
            `
            // console.log('switcher:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        get switchToVertical() {
            const limit = parseInt(this.limit)
            const children = this.childElementCount
            const result = limit + 1 < children
            // console.log('switch, limit, children', result, limit, children)
            return result
        }

        static get observedAttributes() {
            return ['threshold', 'space', 'limit']
        }
        get threshold() {
            return this.getAttribute('threshold') || 'var(--measure)'
        }
        set threshold(val) {
            return this.setAttribute('threshold', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get limit() {
            return this.getAttribute('limit') || '4'
        }
        set limit(val) {
            return this.setAttribute('limit', val)
        }
    }
)

//   flex-basis: calc(( 30rem - 100%) * 999);
/*
                    ::slotted(:nth-last-child(n+ 5)) ,
                    :nth-last-child(n+ 5) ~ * {
                        flex-basis: 100%;
                    }


                    ${ this.switchToVertical ? `
                    ::slotted(*) {
                          flex-basis: 100%;
                    }` : ''
                    }

                    ${ this.switchToVertical ? `
                    ::slotted(:nth-child(n + 2) {
                          flex-basis: 100%;
                    }` : ''
                    }

*/
