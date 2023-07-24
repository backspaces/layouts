customElements.define(
    'stack-layout',
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
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    ::slotted(*) {
                        margin-block: 0;
                    }

                    ::slotted(:not(:first-child)) {
                        margin-block-start: ${this.space};
                    }

                    ::slotted(:only-child) {
                        block-size: 100%;
                    }

                    ::slotted(:nth-child(${this.splitAfter})) {
                        margin-block-end: auto;
                    }
                </style>
                <slot></slot>
            `
            console.log('stack:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['space', 'splitAfter']
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1);'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get splitAfter() {
            return this.getAttribute('splitAfter') || 1000
        }
        set splitAfter(val) {
            return this.setAttribute('splitAfter', val)
        }
    }
)

/*

stack-l {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
stack-l > * + * {
    margin-block-start: var(--s1);
}

          [data-id="${id}"] ${this.recursive ? '' : ' > '} * + * {
            margin-block-start: ${this.space};
          }

          ${
              this.splitAfter
                  ? `
            [data-id="${id}"] :only-child {
              block-size: 100%;
            }

            [data-id="${id}"] > :nth-child(${this.splitAfter}) {
              margin-block-end: auto;
            }`
                  : ''
          }

*/
