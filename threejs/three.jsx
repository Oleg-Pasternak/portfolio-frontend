import * as THREE from 'three';


let speed = 0;
let position = 0;
let rounded = 0;
let isBrowser = typeof window !== "undefined"

//SCROLL
function raf() {
  let boiler = document.getElementById('boiler')
  let elems = [...document.querySelectorAll('.projects')]
  let objs = Array(3).fill({dist: 0})
  
  position += speed
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
  position = Math.max(0, Math.min(3, position))

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
  const renderer = new THREE.WebGLRenderer();
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
  // Use images as texture for planes in the scene, using shaderMaterial
  images.forEach((img, i) => {
    const texture = new THREE.TextureLoader().load(img.src)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uAlpha: { value: 1 }
      },
      // vertex shader with wave effect
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAlpha;

        void main() {
          vUv = uv;
          vPosition = position;
          vec3 pos = position;
          // wave
          // pos.z += sin(position.x * 15.0 + uTime) * 0.04 * (1.0 - uProgress);
          pos.y += sin(position.z * 10.0 + uTime) * 0.1 * (1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAlpha;
        varying vec2 vUv;
        void main() {
          vec2 newUV = vUv;
          vec4 color = texture2D(uTexture, newUV);
          gl_FragColor = vec4(color.rgb, color.a * uAlpha);
        }
      `,
      transparent: true
    })
    const geometry = new THREE.PlaneGeometry(2,1,20,20)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = 1.8
    mesh.position.y = i * 1.2
    mesh.position.z = 0
    scene.add(mesh)
    meshes.push(mesh)
  })

  // Group all meshes in a group
  const group = new THREE.Group()
  meshes.forEach(mesh => {
    group.add(mesh)
  })
  scene.add(group)

  // rotate group
  group.rotation.x = -0.3
  group.rotation.y = -0.7
  group.rotation.z = -0.2

  const origin_position_x = group.position.x
  const origin_position_y = group.position.y
  const origin_position_z = group.position.z
  
  // Animate
  function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    // Update time
    meshes.forEach((mesh, i) => {
      mesh.material.uniforms.uTime.value = performance.now() * 0.001
      mesh.material.uniforms.uProgress.value = Math.min(Math.abs(position - i),1)
      mesh.material.uniforms.uProgress.value = 1 - mesh.material.uniforms.uProgress.value**2
      //mesh.material.uniforms.uAlpha.value = Math.min(Math.abs(position - i),1)
      //mesh.material.uniforms.uAlpha.value = 1 - mesh.material.uniforms.uAlpha.value**2
      // scale
      mesh.scale.x = 1 + 0.2*mesh.material.uniforms.uProgress.value
      mesh.scale.y = 1 + 0.2*mesh.material.uniforms.uProgress.value
      mesh.scale.z = 1 + 0.2*mesh.material.uniforms.uProgress.value 
    })
    // get forwar vector of group based on its rotation
    const forward = new THREE.Vector3(0.07,1,0)
    // move group towards forward vector
    group.position.x = origin_position_x + forward.x * -position * 1.2
    group.position.y = origin_position_y + forward.y * -position * 1.2
    group.position.z = origin_position_z + forward.z * -position * 1.2








    
  }
  animate();

  



    // let imagesToGL = Array.from(document.getElementsByClassName("img"));
  // let geometry = new THREE.PlaneBufferGeometry(1.5, 1, 20, 20);

  // const vertexShader = () => {
  //   return `
  //       varying vec2 vUv; 

  //       void main() {
  //           vUv = uv; 

  //           vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  //           gl_Position = projectionMatrix * modelViewPosition; 
  //       }
  //   `;
  // }

  // const fragmentShader = () => {
  //   return `
  //       uniform sampler2D texture1; 
  //       uniform sampler2D texture2; 
  //       varying vec2 vUv;

  //       void main() {
  //           vec4 color1 = texture2D(texture1, vUv);
  //           vec4 color2 = texture2D(texture2, vUv);
  //           //vec4 fColor = mix(color1, color2, vUv.y);
  //           //fColor.a = 1.0;
  //           gl_FragColor = color1;
  //       }
  //   `;
  // }
  
  // function htmlToWebgl() {

  //   imagesToGL.forEach((image) => {
  //     let texture = new THREE.Texture(image);
  //     texture.needsUpdate = true;
  
  //     let material = new THREE.ShaderMaterial({
  //       uniforms: {
  //         uTime: { type: "f", value: 0 },
  //         uDirection: { type: "f", value: 0 },
  //         uProgress: { type: "f", value: 0 },
  //         uMouseSpeed: { type: "f", value: 0 },
  //         uMouse: { type: "v2", value: new THREE.Vector2(0, 0) },
  //         uTexture: new THREE.Uniform(texture),
  //         uResolution: { type: "v4", value: new THREE.Vector4() },
  //       },
  
  //       vertexShader: vertexShader(),
  //       fragmentShader: fragmentShader(),
  
  //     });
  
  //     let mesh = new THREE.Mesh(geometry, material);
  //     mesh.userData.image = image;
  //     mesh.userData.material = material;
  //     mesh.position.set(0,0,0)

  //     scene.add(mesh);
  
  //   });
  // }
  // htmlToWebgl();

  // function animate() {
  //   requestAnimationFrame( animate );
  //   renderer.render( scene, camera );
  // }
  // animate();
}