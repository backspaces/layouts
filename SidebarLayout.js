customElements.define(
    'sidebar-layout',
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
                        ${this.noStretch ? 'align-items: flex-start;' : ''}
                    }

                    ::slotted(*) {
                        flex-grow: 1;
                        ${this.sideWidth ? `flex-basis: ${this.sideWidth};` : ''}
                    }

                    ::slotted(
                        ${this.side !== 'left' ? `*:first-child` : `*:last-child`}
                    ) {
                        flex-basis: 0;
                        flex-grow: 999;
                        min-inline-size: ${this.contentMin};
                    }
                </style>
                <slot></slot>
            `
            // console.log('stack:', this.shadowRoot.innerHTML)
        }

        connectedCallback() {
            this.render()
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['side', 'sideWidth', 'contentMin', 'space', 'noStretch']
        }
        get side() {
            return this.getAttribute('side') || 'left'
        }
        set side(val) {
            return this.setAttribute('side', val)
        }
        get sideWidth() {
            return this.getAttribute('sideWidth') || null
        }
        set sideWidth(val) {
            return this.setAttribute('sideWidth', val)
        }
        get contentMin() {
            return this.getAttribute('contentMin') || '50%'
        }
        set contentMin(val) {
            return this.setAttribute('contentMin', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s1)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get noStretch() {
            return this.hasAttribute('noStretch')
        }
    }
)
