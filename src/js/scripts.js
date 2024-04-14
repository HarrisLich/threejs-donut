import * as THREE from 'three'
import { AmbientLight } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const donutUrl = new URL('../assets/test_donut6.glb', import.meta.url)

//init renderer and append to body
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
//Init camera (fov, aspect ratio, 0.1, 1000)
const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
scene.background = new THREE.Color(0xE06FE7)

window.addEventListener('resize', (e)=>{
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.enableRotate = true
controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );
camera.position.z = 4
camera.position.y = 3
//controls.update()
camera.rotation.set(-0.6, 0, 0)

//Create & add axes Helper to scene
const axesHelper = new THREE.AxesHelper(3)
//scene.add(axesHelper)
//Set cameras position viewing the scene (x,y,z)

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, side: THREE.DoubleSide})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -0.5 * Math.PI
//scene.add(plane)

const gridHelper = new THREE.GridHelper()
//scene.add(gridHelper)

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

const directionalLightTop = new THREE.DirectionalLight(0xffffff, 3)
scene.add(directionalLightTop)
directionalLightTop.position.set(0, 100 , 100)

//const spotLight = new THREE.SpotLight( 0xffffff, 10, 100, 0.2, 0.5 );
//scene.add(spotLight)
//spotLight.position.set( 0, 10, 0 );

//const spotLightHelper = new THREE.SpotLightHelper(spotLight)
//scene.add(spotLightHelper)

const lightHelper = new THREE.DirectionalLightHelper(directionalLightTop)
//scene.add(lightHelper)

const assetLoader = new GLTFLoader()
assetLoader.load(donutUrl.href, function(gltf){
    const model = gltf.scene
    model.scale.set(2,2,2)
    model.position.set(0, 1, 0)
	model.rotation.set(0, 180, 0)
    scene.add(model)
}, undefined, function(err){
    console.log(err)
})
//Create a box and add to scene
//const boxGeometry = new THREE.BoxGeometry()
//const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
//const box = new THREE.Mesh(boxGeometry, boxMaterial)
//scene.add(box)

function animate(){
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
	controls.update()
}

animate()

