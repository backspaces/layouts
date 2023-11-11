customElements.define(
    'imposter-layout',
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
                        ${ this.fixed ? `position: fixed;` : 'position: absolute;' }

                        inset-block-start: 50%;
                        inset-inline-start: 50%;
                        transform: translate(-50%, -50%);

                        ${ !this.breakout ? `
                        max-inline-size: calc(100% - (${this.margin} * 2));
                        max-block-size: calc(100% - (${this.margin} * 2));
                        overflow: auto;` : ''
                        }
                    }
                </style>
                <slot></slot>
            `
            console.log('imposter:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['breakout', 'margin', 'fixed']
        }
        get breakout() {
            return this.hasAttribute('breakout')
        }
        set breakout(val) {
            if (val) {
                return this.setAttribute('breakout', '')
            } else {
                return this.removeAttribute('breakout')
            }
        }
        get fixed() {
            return this.hasAttribute('fixed')
        }
        set fixed(val) {
            if (val) {
                return this.setAttribute('fixed', '')
            } else {
                return this.removeAttribute('fixed')
            }
        }
        get margin() {
            return this.getAttribute('margin') || '0px'
        }
        set margin(val) {
            return this.setAttribute('margin', val)
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
