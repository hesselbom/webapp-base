export default () => {
  let dom = document.createElement('div')
  dom.className = 'app'
  document.body.appendChild(dom)

  return dom
}
