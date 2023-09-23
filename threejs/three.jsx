import * as THREE from 'three';
import { Gradient } from 'src/components/Gradient'

let speed = 0;
let position = 0;
let rounded = 1;
let isBrowser = typeof window !== "undefined"
const gradient = new Gradient()
let isMouseOver = false

let hoveredImageIndex = -1;

//SCROLL
function raf() {
  let boiler = document.getElementById('boiler')
  let elems = [...document.querySelectorAll('.projects')]
  let objs = Array(3).fill({dist: 0})
  
  position -= speed
  speed *= 0.8;

  objs.forEach((o,i) => {
    o.dist = Math.min(Math.abs(position - i),1);
    o.dist = 1 - o.dist**2;
    elems[i].style.transform = `scale(${1 + 0.4*o.dist})`;
  })

  rounded = Math.round(position)
  let diff = (rounded - position);
  position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.015;

  // limit position
  position = Math.max(-0.7, Math.min(2.5, position))

  var gradientId = document.getElementById('gradient-canvas')
  // check if slide in dataset has changed or dataset.slide does not exist
  if (!gradientId.dataset.slide || gradientId.dataset.slide.toString() != rounded.toString()) {
    gradientId.dataset.slide = rounded
  //container.dataset.slide = Math.round(position+1)
    gradient.initGradient('#gradient-canvas')
  }

  if (boiler) {
    boiler.style.transform = `translate(0,${-position*100 + 50}px)`
    window.requestAnimationFrame(raf)
  }
}

export default function Three() {
  // === SCROLL FUNCTIONALITY ===
  if (isBrowser) {
    window.addEventListener('wheel', (e) => {
      speed += e.deltaY * 0.0003
    })
    raf()
  }

  // === THREE.JS CODE START ===
  const scene = new THREE.Scene();

  //Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // Camera - Group
  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  // Base camera
  const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
  camera.position.z = 6
  cameraGroup.add(camera)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( sizes.width, sizes.height );
  renderer.setClearColor( 0x000000, 0 );
  document.getElementById('container').appendChild( renderer.domElement );

  // On resize page
  function onWindowResize( event ) {
    renderer.setSize( sizes.width, sizes.height );
    renderer.render( scene, camera );
  }

  // Get images
  let images = [... document.querySelectorAll('.img')]
  let meshes = []
  let geometries = []
  // Use images as texture for planes in the scene, using shaderMaterial
  images.forEach((img, i) => {
    const texture = new THREE.TextureLoader().load(img.src)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        distanceFromCenter: {type: 'f', value: 0},
        uTime: { type: 'f', value: 0 },
        uProgress: { value: 0 },
        uAlpha: { value: 1 },
        uRot: { value: 0.07 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAlpha;
        uniform float uRot;
        float PI = 3.14159265358979323846264338;

        void main() {
          vUv = (uv - vec2(0.5))*0.8 + vec2(0.5);
          vPosition = position;
          vec3 pos = position;
          pos.y += sin(PI*vUv.x)*uRot;
          pos.z += sin(PI*vUv.x)*uRot;
          pos.y += sin(uTime*0.3) * uRot;
          vUv.y += sin(uTime*0.3) * uRot;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float distanceFromCenter;
        uniform float uProgress;
        uniform float uAlpha;
        varying vec2 vUv;

        void main() {
          vec2 newUV = vUv;
          vec4 color = texture2D(uTexture, newUV);
          gl_FragColor = color;
          vec3 adjustedColor = color.rgb * uAlpha;
          gl_FragColor = vec4(adjustedColor, clamp(distanceFromCenter, 0.2, 1.));
        }
      `,
      transparent: true
    })
    const geometry = new THREE.PlaneBufferGeometry(2,1,40,20)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 1.8
    mesh.position.y = i * 1.2
    mesh.position.z = 0
    scene.add(mesh)
    meshes.push(mesh)
    geometries.push(geometry)
  })

  // Group all meshes in a group
  const group = new THREE.Group()
  meshes.forEach(mesh => {
    group.add(mesh)
  })
  scene.add(group)

  // rotate group
  group.rotation.x = -0.3
  group.rotation.y = -0.9
  group.rotation.z = -0.3

  const origin_position_x = group.position.x
  const origin_position_y = group.position.y
  const origin_position_z = group.position.z

  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  function onDocumentMouseDown( event )
    {
        event.preventDefault();
        var mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( meshes );
        var matched_marker = null;
        if(intersects.length > 0)
        {
            //$('html,body').css('cursor','pointer');//mouse cursor change
            for ( var i = 0;  intersects.length > 0 && i < intersects.length; i++)
            {
                window.open(intersects[0].object.userData.URL);
            }
        }
        else {
              //$('html,body').css('cursor','cursor');
        }
    }
  function onDocumentMouseMove(event) {
      var mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(meshes);
      var container = document.getElementById('main-container');
      if (intersects.length > 0) {
        if (container) {
          container.style.cursor = "pointer";
          hoveredImageIndex = meshes.indexOf(intersects[0].object);
          isMouseOver = true
        }
      } else {
        if (container) {
          container.style.cursor = "default";
          hoveredImageIndex = -1;
          isMouseOver = false
        }
      }
  }

  
  // Animate
  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    // Update time
    meshes.forEach((mesh, i) => {
      let dist = Math.min(Math.abs(position - i),1);
      dist = 1 - dist**2;
      mesh.material.uniforms.uTime.value = performance.now() * 0.001
      mesh.material.uniforms.uProgress.value = dist / 2
      // scale
      let scaleValue = 1 + 0.2*mesh.material.uniforms.uProgress.value 
      mesh.scale.set(scaleValue, scaleValue, scaleValue)
      
      mesh.material.uniforms.distanceFromCenter.value = dist

      if (isMouseOver) {
        if (i == hoveredImageIndex) {
          if ( mesh.material.uniforms.uRot.value > 0.06) {
            mesh.material.uniforms.uRot.value -= 0.001
          }
          if (mesh.material.uniforms.uAlpha.value < 1.2) {
            mesh.material.uniforms.uAlpha.value += 0.01
          }
        }
      } else {
        if (mesh.material.uniforms.uRot.value < 0.07) {
          mesh.material.uniforms.uRot.value += 0.001
        }
        if (mesh.material.uniforms.uAlpha.value > 1) {
          mesh.material.uniforms.uAlpha.value -= 0.02
        }
        mesh.rotation.x = 0
        mesh.rotation.y = 0
        mesh.rotation.z = 0
      }


    })
    

    // get forwar vector of group based on its rotation
    const forward = new THREE.Vector3(0.1,1,0)
    // move group towards forward vector
    group.position.x = origin_position_x + forward.x * -position * 1.3
    group.position.y = origin_position_y + forward.y * -position * 1.3
    group.position.z = origin_position_z + forward.z * -position * 1.3
  }
  animate();
}