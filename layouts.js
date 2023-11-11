// Use "side effect" imports. They install custom elements in the registry
// import './root.js'
import './StackLayout.js'
import './BoxLayout.js'
import './CenterLayout.js'
import './ClusterLayout.js'
import './SidebarLayout.js'
import './SwitcherLayout.js'
import './CoverLayout.js'
import './GridLayout.js'
import './FrameLayout.js'
import './ReelLayout.js'
import './ImposterLayout.js'

// // Install root.css
// function addCssStyle(css) {
//     const style = document.createElement('style')
//     style.id = 'layout-root-styles'
//     style.innerHTML = css
//     document.head.appendChild(style)
// }
// function isLoaded() {
//     return document.getElementById('layout-root-styles') !== null
// }
// const css = await fetch('./root.css').then(resp => resp.text())
// if (!isLoaded()) {
//     console.log('loading ...')
//     addCssStyle(css)
//     console.log('lowded', isLoaded())
// }
