let testing = document.querySelector(".testing")
let monsterScroll = document.querySelectorAll(".places")
let nyc = document.querySelector(".nyc")
let northeast = document.querySelector(".northeast")
    let northeastInfo = document.querySelector(".northeast-info")

    function inViewPort(el) {
        let rect = el.getBoundingClientRect()
        return (
          (rect.top <= 0 && rect.bottom >= 0) ||
          (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
          (rect.top >= 0 && rect.bottom <= window.innerHeight)
        )
    }
    
    function moveHeader() {

        monsterScroll.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('appear')
        : item.classList.remove('appear')
      )
        window.requestAnimationFrame(moveHeader)
}
    
function moveHeaderTwo() {

  if (inViewPort(nyc) === true) {
    nyc.classList.add("slide")
  }

  if (inViewPort(northeast) === true) {
    northeast.classList.add("slide-down")
  }

  if (inViewPort(northeastInfo) === true) {
    northeastInfo.classList.add("appear")
  }

  window.requestAnimationFrame(moveHeaderTwo)
}
    
window.requestAnimationFrame(moveHeader)
window.requestAnimationFrame(moveHeaderTwo)


    
    