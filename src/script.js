import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// import { USDZLoader } from "three-usdz-loader";
// import { Color } from 'three'
// import 'await/await.js'


      


 

//import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Base
 */

// Debug
const gui = new dat.GUI()




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */


const gltfLoader = new GLTFLoader()



gltfLoader.load(
    'shoe1.glb',
    (gltf) =>
    {
        
        gltf.scene.scale.set(1, 1, 1)
        scene.add(gltf.scene)

        // Animation
        
    }
)
const axeshelper = new THREE.AxesHelper(2)
scene.add(axeshelper)

// const group = new THREE.Group()
// group.scale.x = 0.5
// scene.add(group)

// const usdzLoader = new GLTFLoader()
// usdzLoader.load(
//         'shoe1.glb',
//         (gltf) =>
//         {
//             gltf.group.scale.set(1, 1, 1)
//             group.add(gltf)
    
//             // Animation
            
//         }
//     )
 
// const loader = new USDZLoader();

// // Create a ThreeJs Group in which the loaded USDZ model will be placed
//  const group = new THREE.Group();

// // // Add the group to the scene
// scene.add(group);
// try {

//     loader.loadFile('https://puvanesh07.github.io/Interaktive_Files/shoeInteraktive.usdz',group)

//     throw console.log(group)
//   } catch (err) {
//     console.log(err);
    
//   }
// // Load your file. File is of type File
// // loader.loadFile('https://puvanesh07.github.io/Interaktive_Files/shoeInteraktive.usdz',group)









/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(- 5, 5, 0)
// scene.add(directionalLight)

 // ambient light setup
 const amibientLight = new THREE.AmbientLight(0x404040, 2);
 scene.add(amibientLight);

 // direction lights setup
 const spotLight1 = new THREE.SpotLight(0x1d27f0, 5);
 spotLight1.position.set(6, 11, 6);
 spotLight1.castShadow = true;
 const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 1, 0x00ff00);
 scene.add(spotLight1);

 // orenge light setup
 const spotLight2 = new THREE.SpotLight(0xf57d22, 2);
 spotLight2.position.set(-10, 0, 12);
 spotLight2.castShadow = true;
 const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 2, 0x00ff00);
 scene.add(spotLight2);

 // back light setup
 const spotLight3 = new THREE.SpotLight(0x1d27f0, 2);
 spotLight3.position.set(-10, 18, -17);
 spotLight3.castShadow = true;
 const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 2, 0xff0000);
 scene.add(spotLight3);



// gui
// .add(ambientLight.position, 'y')
// .min(- 3)
// .max(3)
// .step(0.01)
// .name('elevation')

// gui.add(ambientLight.rotation, 'y')
// .min(- 3)
// .max(3)
// .step(0.01)
// .name('elevation')


// blue light controls
const blueLight = gui.addFolder('BlueLight');

blueLight.add(spotLight1.position, "x", -30, 30, 1);
blueLight.add(spotLight1.position, "y", -30, 30, 1);
blueLight.add(spotLight1.position, "z", -30, 30, 1);

// orenge light controls

const orengeLight = gui.addFolder('OrengeLight');
orengeLight.add(spotLight2.position, "x", -40, 40, 1);
orengeLight.add(spotLight2.position, "y", -40, 40, 1);
orengeLight.add(spotLight2.position, "z", -40, 40, 1);

// back light controls

const backLight = gui.addFolder('BackLight');
backLight.add(spotLight3.position, "x", -40, 40, 1);
backLight.add(spotLight3.position, "y", -40, 40, 1);
backLight.add(spotLight3.position, "z", -40, 40, 1);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    

    // Model animation
   
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()