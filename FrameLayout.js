customElements.define(
    'frame-layout',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }

        render() {
            if (this.children.length !== 1) {
                console.warn('<frame-layout> can have just one child element')
            }

            let ratio = this.ratio.split(':')
            // prettier-ignore
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        aspect-ratio: ${ratio[0]} / ${ratio[1]};
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                    }
                    ::slotted(img),
                    ::slotted(video){
                        inline-size: 100%;
                        block-size: 100%;
                        object-fit: cover;
                    }

                </style>
                <slot></slot>
            `
            // console.log('frame:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['ratio']
        }
        get ratio() {
            return this.getAttribute('ratio') || '16:9'
        }
        set ratio(val) {
            return this.setAttribute('ratio', val)
        }
    }
)
