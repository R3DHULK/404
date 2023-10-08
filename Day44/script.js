$(".patch").each((i) => {
  let b = i + 1
  let rX = Math.floor(Math.random() * 50)
  let rY = Math.floor(Math.random() * 100)
  let rH = Math.floor(Math.random() * 10) + 15
  $(".patch:nth-child("+b+")").css({
    left: i-1+"vw",
    height: rH+"vh",
    "-webkit-clip-path": "polygon("+rX+"% "+rX+"%, 0% 100%, 100% 100%)",
    "clip-path": "polygon("+rX+"% "+rX+"%, 0% 100%, 100% 100%)"
  })
})

$(".cross").each((i) => {
  let b = i + 1
  let rR = Math.floor(Math.random() * 15) * Math.cos(Math.PI * Math.round(Math.random()))
  $(".cross:nth-child("+b+")").css({
    "transform": "rotateZ("+rR+"deg)"
  })
})

$(".star").each((i) => {
  $(".star:nth-child("+i+")").css({
    top: Math.random() * $(document).height() - $(document).height()/4,
    left: Math.random() * $(document).width()
  })
})

init = () => {
  $(".crypt").css({
    "transform": "translateX(-50%) rotateZ("+Math.floor(Math.random() * 5) * Math.cos(Math.PI * Math.round(Math.random()))+"deg)"
  })
  $(".title").animate({
    top: "45%"
  }, 5000, () => {
    $(".title").addClass("life")
    $(".msg").fadeIn(1000)
  })
} 
init()