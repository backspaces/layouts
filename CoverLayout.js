customElements.define(
    'cover-layout',
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
                        min-block-size: ${this.minHeight};

                        min-height: ${this.minHeight};
                        padding: ${this.noPad ? '0' : this.space };
                    }

                    ::slotted(:firstChild) {
                        margin-block-start: 0;
                    }

                    ::slotted(:lastChild) {
                        margin-block-end: 0;
                    }

                    ::slotted(:nth-Child(2)) {
                        margin-block: auto;
                    }

                </style>
                <slot></slot>
            `
            console.log('cover:', this.shadowRoot.innerHTML)
            console.log('children:', this.childElementCount)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['centered', 'space', 'minHeight', 'noPad']
        }
        get centered() {
            return this.getAttribute('centered') || 'h1'
        }
        set centered(val) {
            return this.setAttribute('centered', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get minHeight() {
            return this.getAttribute('minHeight') || '100vh'
        }
        set minHeight(val) {
            return this.setAttribute('minHeight', val)
        }
        get noPad() {
            return this.hasAttribute('noPad')
        }
        set noPad(val) {
            if (val) {
                return this.setAttribute('noPad', '')
            } else {
                return this.removeAttribute('noPad')
            }
        }
    }
)

/*

                    ::slotted(*) {
                        margin-block: ${this.space};
                    }


cover-l {
    display: flex;
    flex-direction: column;
    min-block-size: 100vh;
    padding: var(--s1);
}

        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            min-height: ${this.minHeight};
            padding: ${!this.noPad ? this.space : '0'};
          }

          [data-i="${this.i}"] > * {
            margin-block: ${this.space};
          }

          [data-i="${this.i}"] > :first-child:not(${this.centered}) {
            margin-block-start: 0;
          }

          [data-i="${this.i}"] > :last-child:not(${this.centered}) {
            margin-block-end: 0;
          }

          [data-i="${this.i}"] > ${this.centered} {
            margin-block: auto;
          }
          `



                <style>
                    :host {
                        display: flex;
                        flex-direction: column;
                        min-block-size: 100vh;

                        min-height: ${this.minHeight};
                        padding: ${!this.noPad ? this.space : '0'};
                    }

                    ::slotted(*) {
                        margin-block: ${this.space};
                    }

                    ::slotted(:firstChild:not(${this.centered}) ) {
                        margin-block-start: 0;
                    }

                    ::slotted(:lastChild:not(${this.centered}) ) {
                        margin-block-end: 0;
                    }

                    ::slotted((${this.centered}) ) {
                        margin-block-end: auto;
                    }

                </style>
                <slot></slot>
            `



*/
