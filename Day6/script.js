// Register MorphSVGPlugin
gsap.registerPlugin(MorphSVGPlugin);
// Convert all SVG Shapes to Path for MorphSVGPlugin
MorphSVGPlugin.convertToPath("circle, rect, ellipse, line, polygon, polyline");

const select = function (el) {
  return document.querySelector(el);
},
ghostShy = select('#ghost-all'),
ghostShyEyes = select('#ghost--eyes'),
ghostFriendly = select('#ghost-friendly-all'),
ghostFriendlyEyes = select('.eyes--happy');

gsap.set('svg', {
  visibility: 'visible' });


gsap.set('.mouth--frown, .mouth--sad', {
  transformOrigin: "50% 50%",
  opacity: 0 });


// Animations Full Movie
function ghostEyeBlink() {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 4 });

  tl.from('#ghost--eyes', {
    transformOrigin: "center",
    scaleY: 0,
    duration: 0.2,
    yoyo: true });

  return tl;
}

function ghostFriendlyEyeBlink() {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 5 });

  tl.from(ghostFriendlyEyes, {
    transformOrigin: "center",
    scaleY: 0,
    duration: 0.2,
    yoyo: true });

  return tl;
}

// Sign Movement	
function ghostSign() {
  const tl = gsap.timeline();
  tl.from('#sign', {
    transformOrigin: 'center',
    y: 0.5,
    rotation: -1,
    yoyo: true,
    repeat: -1,
    duration: 1.5 });

  return tl;
}

// Ghosts Hover Movement
const randomX = gsap.utils.random(-5, 5, true);
const randomY = gsap.utils.random(-6, 5, true);
const randomTime = gsap.utils.random(3, 2, true);

gsap.set('#ghost-friendly-all, #ghost-all', {
  x: randomX,
  y: randomY });


function ghostMovement() {
  const tl = gsap.timeline({
    repeat: -1,
    repeatRefresh: true });

  tl.to('#ghost-friendly-all, #ghost-all', {
    duration: randomTime,
    x: randomX,
    y: randomY });

  return tl;
}

// Shy Ghost
gsap.set('.ghost-shadow', {
  transformOrigin: "50% 50%",
  scale: "60%" });


gsap.set('.blush', {
  opacity: 0,
  x: 10,
  y: 10 });


// Shy Ghost Expressions
function ghostShyExpressions() {
  const tl = gsap.timeline();
  tl.to('#ghost--eyes, .mouth--straight', { x: -7, y: -10, duration: 2 }).
  to('.mouth--straight', { morphSVG: { shape: '.mouth--sad', duration: .5, origin: "center center" } }, '-=.5').
  to('#ghost--eyes, .mouth--straight', { x: 0, y: 0, duration: 2 }).
  to('#ghost--eyes, .mouth--straight', { x: 10, y: -10, duration: 2, delay: 1 }).
  to('#ghost--eyes, .mouth--straight', { y: 10, duration: 2.5 }).
  to('.blush', { opacity: .5, duration: 1.5 }).
  to('#ghost--eyes, .mouth--straight, .blush', { x: 0, duration: 1.5 }, '+=2').
  to('.blush', { opacity: 0, duration: 1.5 }, '+=2').
  to('#ghost--eyes, .mouth--straight', { x: 0, y: 0, duration: 2 }, '-=1');
  return tl;
}

// Friendly Ghost
// Set Friendly Ghost Opacity Items
gsap.set('.mouth--curious, .mouth--surprised, .mouth--smile, .mouth--smile-tongue', {
  opacity: 0 });


gsap.set('#ghost-friendly-all', {
  scale: .5,
  opacity: 0,
  transformOrigin: '70% 0%' });


// Ghost Friendly Enter
function ghostFriendlyEnter() {
  const tl = gsap.timeline();
  tl.to('#ghost-friendly-all', {
    opacity: 1,
    duration: 4,
    scale: 1 });

  return tl;
}

gsap.set('.eyes--happy', {
  scale: .7,
  opacity: 1,
  x: 0,
  transformOrigin: '50% 50%' });


function ghostFriendlyExpressions() {
  const tl = gsap.timeline();
  tl.to('.eyes--happy, .mouth--smile-small', { keyframes: [
    { x: -6, duration: 1.5, delay: 3 },
    { x: 6, duration: 1.5 },
    { x: 0, duration: 1 }] }).

  to('.mouth--smile-small', { keyframes: [
    { morphSVG: { shape: '.mouth--curious', duration: .1, origin: "center center" } },

    { morphSVG: { shape: '.mouth--surprised', duration: .2, origin: "top right" } }] }).


  to('.eyes--happy, .mouth--smile-small', { keyframes: [
    { x: -6, duration: 1.5 },
    { x: 0, duration: 1 },
    { x: -6, duration: 1.5 },
    { x: 0, duration: 1 }] },
  '-=1').

  to('.mouth--smile-small', { duration: .5, keyframes: [
    { morphSVG: { shape: '.mouth--smile', origin: "center center" } }] });

  return tl;
}

// Ghost Wave
function ghostFriendlyArm() {
  const tl = gsap.timeline();
  tl.to('.arm--right-lower', { x: 5, y: 10, transformOrigin: "top left", rotation: "-70", duration: .75 }).
  to('.mouth--smile-tongue', { opacity: 1, duration: .75 }, "-=1").
  to('.arm--right-lower', { repeat: 6, keyframes: [
    { rotation: "-60", duration: .25 },
    { rotation: "-70", duration: .25 }] }).

  to('.arm--right-lower', { x: 0, y: 0, transformOrigin: "top left", rotation: "0", duration: .75 });
  return tl;
}

// Master Timeline
const master = gsap.timeline();
master.addLabel("start");
master.add(ghostEyeBlink(), "start");
master.add(ghostFriendlyEyeBlink(), "start");
master.add(ghostSign(), "start");
master.add(ghostMovement(), "start");
master.add(ghostShyExpressions(), "start");
master.addLabel("friendly", 2);
master.add(ghostFriendlyEnter(), "friendly");
master.add(ghostFriendlyExpressions(), "-=5");
master.add(ghostFriendlyArm(), "+=1");

//GSDevTools.create();