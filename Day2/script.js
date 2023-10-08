const visual = document.getElementById("backfont")
const events = ['resize', 'load']

events.forEach(function(e){
	window.addEventListener(e, function(){
		const width = window.innerWidth
		const height = window.innerHeight
		const ratio = 30 / (width / height)
		visual.style.transform = "translate(-50%, -50%) rotate(-" + ratio + "deg)"
	});
});