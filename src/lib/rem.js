const baseSize = 75
function setRem () {
  const scale = document.documentElement.clientWidth / 375
  console.log(scale)
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  console.log('document.documentElement.style.fontSize')
  console.log(document.documentElement.style.fontSize)
}
setRem()
window.onresize = function () {
  setRem()
}
