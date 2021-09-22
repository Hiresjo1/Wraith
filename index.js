import * as THREE from './three.js-dev/three.js-dev/build/three.module.js'
import { GLTFLoader } from './three.js-dev/three.js-dev/examples/jsm/loaders/GLTFLoader.js'
console.log(THREE)

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const loader = new GLTFLoader()
loader.load(' wraith.glb', function(glb) {
        console.log(glb)
        const root = glb.scene;
        root.scale.set(0.03, 0.03, 0.03)

        scene.add(root);
    },

    function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    function(error) {
        console.log('An error has occured')
    })


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2, 2, 5)
scene.add(light)

//const geometry = new THREE.BoxGeometry(1, 1, 1)
//const material = new THREE.MeshBasicMaterial({
//    color: 0x00ff00
//})

//const boxMesh = new THREE.Mesh(geometry, material)
//scene.add(boxMesh)

// Boiler Plate Coding Begin
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
camera.position.set(0, 1, 2)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene, camera)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

animate();