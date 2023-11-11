customElements.define(
    'reel-layout',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
        }

        render() {
            // Lite Dom used for scrollbars
            if (!document.getElementById('reel-layout-style')) {
                const style = document.createElement('style')
                style.id = 'reel-layout-style'
                style.innerText = `
                    reel-layout::-webkit-scrollbar {
                        block-size: 1rem;
                    }
                    reel-layout::-webkit-scrollbar-track {
                        background-color: black
                    }
                    reel-layout::-webkit-scrollbar-thumb {
                        background-color: red;
                    }
                `
                document.head.appendChild(style)
            }

            // shadow Dom used for children and thd shadow host
            // prettier-ignore
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: flex;
                        overflow: auto;
                        height: ${this.height};
                    }

                    ::slotted(*) {
                        flex: 0 0 ${this.itemWidth};
                    }

                    ::slotted(img) {
                        height: 100%;
                        flex-basis: auto;
                        width: auto;
                    }

                    ::slotted(:not(:first-child)) {
                        margin-inline-start: ${this.space};
                        /* background-color: red; */
                    }
                </style>
                <slot></slot>
            `
            // console.log('stack:', this.shadowRoot.innerHTML)
        }

        toggleOverflowClass(elem) {
            elem.classList.toggle(
                'overflowing',
                this.scrollWidth > this.clientWidth
            )
        }
        connectedCallback() {
            this.render()
            if ('ResizeObserver' in window) {
                new ResizeObserver(entries => {
                    this.toggleOverflowClass(entries[0].target)
                }).observe(this)
            }
            if ('MutationObserver' in window) {
                new MutationObserver(entries => {
                    this.toggleOverflowClass(entries[0].target)
                }).observe(this, { childList: true })
            }
        }
        attributeChangedCallback() {
            this.render()
        }

        static get observedAttributes() {
            return ['itemWidth', 'height', 'space', 'noBar']
        }
        get itemWidth() {
            return this.getAttribute('itemWidth') || 'var(--item-width)' // 'auto'
            // flex: 0 0 var(--item-width);
        }
        set itemWidth(val) {
            return this.setAttribute('itemWidth', val)
        }
        get height() {
            return this.getAttribute('height') || 'auto'
        }
        set height(val) {
            return this.setAttribute('height', val)
        }
        get space() {
            return this.getAttribute('space') || 'var(--s0)'
        }
        set space(val) {
            return this.setAttribute('space', val)
        }
        get noBar() {
            return this.hasAttribute('noBar')
        }
        set noBar(val) {
            if (val) {
                this.setAttribute('noBar', '')
            } else {
                this.removeAttribute('noBar')
            }
        }
    }
)

// overflow-x: auto;
// overflow-y: scroll;

// ::slotted(:nth-child(n + 2) {

/*
                    reel-layout::-webkit-scrollbar {
                        block-size: 1rem;
                    }

                    reel-layout::-webkit-scrollbar-track {
                        background-color: black
                    }

                    reel-layout::-webkit-scrollbar-thumb {
                        background-color: red;
                    }



                    Not supported widely, pseudo elements instead
                    scrollbar-width: 1rem;
                    scrollbar-color: black red;

                    scrollbar-color: var(--color-light) var(--color-dark);

                    ::-webkit-scrollbar {
                        block-size: 1rem;
                    }

                    ::-webkit-scrollbar-track {
                        background-color: black
                    }

                    ::-webkit-scrollbar-thumb {
                        background-color: red;
                    }


                    :host::-webkit-scrollbar {
                        block-size: 1rem;
                    };
                    :host::-webkit-scrollbar-track {
                        background-color: red;
                    };
                    :host::-webkit-scrollbar-thumb {
                        background-color: var(--color-dark);
                        background-image: linear-gradient(var(--color-dark) 0,
                                var(--color-dark) 0.25rem,
                                var(--color-light) 0.25rem,
                                var(--color-light) 0.75rem,
                                var(--color-dark) 0.75rem);
                    };
*/

/*

                        ::-webkit-scrollbar {
                            block-size: 1rem;
                        };
                        ::-webkit-scrollbar-track {
                            background-color: red;
                        };
                        ::-webkit-scrollbar-thumb {
                            background-color: var(--color-dark);
                            background-image: linear-gradient(var(--color-dark) 0,
                                    var(--color-dark) 0.25rem,
                                    var(--color-light) 0.25rem,
                                    var(--color-light) 0.75rem,
                                    var(--color-dark) 0.75rem);
                        };


                        :host(::-webkit-scrollboar) {
                            block-size: 1rem;
                        };
                        :host(::-webkit-scrollbar-track) {
                            background-color: red;
                        };
                        :host(::-webkit-scrollbar-thumb) {
                            background-color: var(--color-dark);
                            background-image: linear-gradient(var(--color-dark) 0,
                                    var(--color-dark) 0.25rem,
                                    var(--color-light) 0.25rem,
                                    var(--color-light) 0.75rem,
                                    var(--color-dark) 0.75rem);
                        };





        reel-layout::-webkit-scrollbar {
            block-size: 1rem;
        }

        reel-layout::-webkit-scrollbar-track {
            background-color: var(--color-dark);
        }

        reel-layout::-webkit-scrollbar-thumb {
            background-color: var(--color-dark);
            background-image: linear-gradient(var(--color-dark) 0,
                    var(--color-dark) 0.25rem,
                    var(--color-light) 0.25rem,
                    var(--color-light) 0.75rem,
                    var(--color-dark) 0.75rem);
        }
*/

/*

reel-l {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-color: var(--color-light) var(--color-dark);
}
reel-l > * {
    flex: 0 0 var(--item-width);
}
reel-l > img {
    block-size: 100%;
    flex-basis: auto;
    inline-size: auto;
}
reel-l::-webkit-scrollbar {
    block-size: 1rem;
}
reel-l::-webkit-scrollbar-track {
    background-color: var(--color-dark);
}
reel-l::-webkit-scrollbar-thumb {
    background-color: var(--color-dark);
    background-image: linear-gradient(
        var(--color-dark) 0,
        var(--color-dark) 0.25rem,
        var(--color-light) 0.25rem,
        var(--color-light) 0.75rem,
        var(--color-dark) 0.75rem
    );
}

                        ::-webkit-scrollbar {
                            block-size: 1rem;
                        };
                        ::-webkit-scrollbar-track {
                            background-color: var(--color-dark);
                        };
                        ::-webkit-scrollbar-thumb {
                            background-color: var(--color-dark);
                            background-image: linear-gradient(var(--color-dark) 0,
                                    var(--color-dark) 0.25rem,
                                    var(--color-light) 0.25rem,
                                    var(--color-light) 0.75rem,
                                    var(--color-dark) 0.75rem);
                        };




                    ::slotted(::-webkit-scrollbar) {
                        block-size: 1rem;
                    }
                    ::slotted(::-webkit-scrollbar-track) {
                        background-color: var(--color-dark);
                    }
                    ::slotted::-webkit-scrollbar-thumb {
                        background-color: var(--color-dark);
                        background-image: linear-gradient(
                            var(--color-dark) 0,
                            var(--color-dark) 0.25rem,
                            var(--color-light) 0.25rem,
                            var(--color-light) 0.75rem,
                            var(--color-dark) 0.75rem
                        );
                    }



                    ::slotted(:last-child) {
                        margin-bottom: 0;
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

*/
