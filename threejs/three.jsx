let speed = 0;
let position = 0;
let rounded = 0;
const isBrowser = typeof window !== "undefined"

function raf() {
  const block = document.getElementById('block')
  position += speed
  speed *= 0.8;

  rounded = Math.round(position)

  let diff = (rounded - position);

  position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015;
  console.log(position)

  block.style.transform = `translate(0,${position*100}px)`
  window.requestAnimationFrame(raf)
}

export default function Three() {
  // scroll value
  if (isBrowser) {
    window.addEventListener('wheel', (e) => {
      speed += e.deltaY * 0.0003
    })
    raf()
  }
}