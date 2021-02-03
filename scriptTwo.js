let testing = document.querySelector(".testing")
let monsterScroll = document.querySelectorAll(".places")
let nyc = document.querySelectorAll(".nyc")
let northeast = document.querySelectorAll(".northeast")
    let northeastInfo = document.querySelectorAll(".northeast-info")

    function inViewPort(el) {
        let rect = el.getBoundingClientRect()
        return (
          (rect.top <= 0 && rect.bottom >= 0) ||
          (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
          (rect.top >= 0 && rect.bottom <= window.innerHeight)
        )
    }
    
    function moveHeader() {

        

/*   if (inViewPort(nyc) === true) {
    nyc.classList.add("slide")
  }

  if (inViewPort(northeast) === true) {
    northeast.classList.add("slide-down")
  }

  if (inViewPort(northeastInfo) === true) {
    northeastInfo.classList.add("appear")
  } */

  nyc.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('slide')
        : null
  )
  northeast.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('slide-down')
        : null
  )
  northeastInfo.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('appear')
        : null
      )

  window.requestAnimationFrame(moveHeader)
}
    
window.requestAnimationFrame(moveHeader)
window.requestAnimationFrame(moveHeader)


    
    