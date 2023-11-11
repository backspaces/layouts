// function addCssLink(url) {
//     const link = document.createElement('link')
//     link.setAttribute('rel', 'stylesheet')
//     link.setAttribute('href', url)
//     document.head.appendChild(link)
// }
// async function fetchCssStyle(url) {
//     const response = await fetch(url)
//     if (!response.ok) throw Error(`fetchCssStyle: Not found: ${url}`)
//     const css = await response.text()
//     addCssStyle(css)
//     return css
// }
// if (document.getElementsByClassName('max-width:measure').length === 0) {
//     console.log('loading ./root.css')
//     await fetchCssStyle('./root.css')
// } else {
//     console.log('./root.css already loadedd')
// }

function addCssStyle(css) {
    const style = document.createElement('style')
    style.id = 'layout-root-styles'
    style.innerHTML = css
    document.head.appendChild(style)
}
function isLoaded() {
    return document.getElementById('layout-root-styles') !== null
}

const css = await fetch('./root.css').then(resp => resp.text())
if (!isLoaded()) {
    console.log('loading ...')
    addCssStyle(css)
    console.log('lowded', isLoaded())
}

// export default isLoaded
