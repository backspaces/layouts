customElements.define(
    'center-layout',
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
                        ${this.intrinsic ? `
                        display: flex;
                        flex-direction: column;
                        align-items: center;` : `display: block;`
                        }

                        box-sizing: content-box;
                        margin-inline: auto;
                        /* max-inline-size: var(--measure); */

                        max-width: ${this.max};

                        ${ this.gutters ? `
                        padding-inline-start: ${this.gutters};
                        padding-inline-end: ${this.gutters};`  : ''
                        }

                        ${this.andText ? `text-align: center;` : ''}
                    }


                </style>
                <slot></slot>
            `
            // console.log('center', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['max', 'andText', 'gutters', 'intrinsic']
        }
        get max() {
            return this.getAttribute('max') || 'var(--measure)'
        }
        set max(val) {
            return this.setAttribute('max', val)
        }
        get andText() {
            return this.hasAttribute('andText')
        }
        set andText(val) {
            if (val) {
                return this.setAttribute('andText', '')
            } else {
                return this.removeAttribute('andText')
            }
        }
        get gutters() {
            return this.getAttribute('gutters') || null
        }
        set gutters(val) {
            return this.setAttribute('gutters', val)
        }
        get intrinsic() {
            return this.hasAttribute('intrinsic')
        }
        set intrinsic(val) {
            if (val) {
                return this.setAttribute('intrinsic', '')
            } else {
                return this.removeAttribute('intrinsic')
            }
        }
    }
)

/*

                    ::slotted(*) {
                        max-width: ${this.max};
                        ${
                            this.gutters
                                ? `
                        padding-inline-start: ${this.gutters};
                        padding-inline-end: ${this.gutters};`
                                : ''
                        }
                        ${this.andText ? `text-align: center;` : ''}
                        ${
                            this.intrinsic
                                ? `
                        display: flex;
                        flex-direction: column;
                        align-items: center;`
                                : ''
                        }

*/
