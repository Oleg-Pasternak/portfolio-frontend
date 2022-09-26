import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


export default function Three() {
  // === THREE.JS CODE START ===
  var scene = new THREE.Scene();

  //Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  window.addEventListener( 'resize', onWindowResize, false );

  // var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.getElementById('three-js').appendChild( renderer.domElement );

  // Camera - Group
  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  // Base camera
  const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 6
  cameraGroup.add(camera)

//   const controls = new OrbitControls( camera, renderer.domElement );
//   controls.update();

  // Get scroll position
  let scrollY = window.scrollY
  window.addEventListener('scroll', () =>
  {
      scrollY = window.scrollY
  })

  // Cursor
  const cursor = {}
  cursor.x = 0
  cursor.y = 0

  window.addEventListener('mousemove', (event) =>
  {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
  })

  function onWindowResize( event ) {
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.render( scene, camera );
  }

  // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  // const cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );

  const directionalLight = new THREE.DirectionalLight('#fff', 1)
  directionalLight.position.set(2, 2, 5)
  scene.add(directionalLight)

  // const loader = new GLTFLoader();

  // loader.load( '/models/scene.gltf', function ( gltf ) {
  //   console.log(gltf)
  //   const root = gltf.scene;
  //   root.scale.set(0.5,0.5,0.5)
  //   scene.add( root );
  // }, function ( xhr ) {
  //   console.log(xhr.loaded)
  //   console.log(xhr)
  //   console.log((xhr.loaded/xhr.total * 100) + '% loaded')
  // }, function ( error ) {
  //   console.error( error );
  // } );
  // instantiate a loader
const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'models/statue.obj',
	// called when resource is loaded
	function ( object ) {

    object.scale.set(0.6,0.6,0.6)
    object.position.set(-1,-4,0)
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

  var animate = function () {
      requestAnimationFrame( animate );
      // controls.update();
      renderer.render( scene, camera );
  };
  animate();
  // === THREE.JS CODE END ===
}
