import * as THREE from './vendor/three/build/three.module.js';

import { GUI } from './vendor/three/examples/jsm/libs/dat.gui.module.js';

import { FBXLoader } from './vendor/three/examples/jsm/loaders/FBXLoader.js';
import { OutlineEffect } from './vendor/three/examples/jsm/effects/OutlineEffect.js';
import { Sky } from './vendor/three/examples/jsm/objects/Sky.js';

let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
let camera, scene, renderer, model, effect;
let sky, sun;

let scale = 0.1;
const api = { state: 'Idle' };
let actionNames = ['Idle', 'Walk', 'Eat', 'Jump'];


init();
animate();

export function playAction(action) {
    fadeToAction(action, 0.5);
}

export function changeSize(size) {
    let mapping = {
        'small': 0.08,
        'medium': 0.1,
        'large': 0.12
    }
    model.scale.x = mapping[size];
    model.scale.y = mapping[size];
    model.scale.z = mapping[size];

}

function init() {

    container = document.getElementById('interact-container');
    //document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(25, 2, 1, 1000);
    camera.position.set(- 5, 3, 10);
    camera.lookAt(new THREE.Vector3(0, 2, 0));

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xdcd2b7, 20, 100);

    clock = new THREE.Clock();

    // lights

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(0, 20, 10);
    scene.add(dirLight);




    // model

    const loader = new FBXLoader();
    loader.load('models/Dog.fbx', function (fbx) {
        model = fbx;
        //console.log(model)
        model.traverse(obj=> {
            if(obj instanceof THREE.Line) {
                obj.visible = false;
            }
        })
        model.scale.set( scale, scale, scale );
        setModelMaterial(model.children[1]);
        scene.add(model);
        loadAnimations().then(animations=>{
            //console.log(animations)
            createGUI(model, animations);
        });
    }, undefined, function (e) {

        //console.error(e);

    });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.insertBefore(renderer.domElement, container.firstChild)
    effect = new OutlineEffect( renderer, {defaultThickness: 0.006} );

    window.addEventListener('resize', resizeCanvasToDisplaySize, false);

    initSky();

    // ground

    const texture = new THREE.TextureLoader().load( "models/Grass.png" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(400,400)
    const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(4000, 4000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false, map: texture }));

    mesh.rotation.x = - Math.PI / 2;
    scene.add(mesh);
    // stats
    //stats = new Stats();
    //container.appendChild(stats.dom);
}

export function changeColor(color) {
    let mappings = {
        'yellow': 'Dog_A',
        'brown': 'Dog_chocolate',
        'silver': 'Dog_A_silver',
        'cherry': 'Dog_A_cherry'
    }
    const texture = new THREE.TextureLoader().load( `models/${mappings[color]}.png`);
    texture.encoding = THREE.sRGBEncoding;
    model.children[1].material.map = texture;
}

function setModelMaterial(mesh) {
    //console.log(mesh.material)   
    let colors = Uint8Array.from([1, 200, 255]);
    const gradientMap = new THREE.DataTexture( colors, colors.length, 1, THREE.LuminanceFormat );
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.generateMipmaps = false;
    const texture = new THREE.TextureLoader().load( 'models/Dog_A.png');
    texture.encoding = THREE.sRGBEncoding;
    let toonMaterial = new THREE.MeshToonMaterial ({
        color: new THREE.Color( 'white'),
        gradientMap: gradientMap,
        skinning: true,
        map: texture
        //map: mesh.material.map,
    });
    //console.log(mesh.material.map, texture)
    mesh.material =  toonMaterial;
    //console.log(mesh.material)   

}

function createGUI(model, animations) {
    const states = actionNames;
    //, 'Idle', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'
    //const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];

    // gui = new GUI({
    //     autoPlace : true
    // });

    // gui.domElement.id = "gui"
    mixer = new THREE.AnimationMixer(model);

    actions = {};

    for (let i = 0; i < animations.length; i++) {

        const clip = animations[i];
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;
    }

    // states

    //const statesFolder = gui.addFolder('Controls');

    // const clipCtrl = statesFolder.add(api, 'state').options(states);

    // clipCtrl.onChange(function () {

    //     fadeToAction(api.state, 0.5);

    // });

   // statesFolder.open();

    activeAction = actions['Idle'];
    activeAction.play();
}

function fadeToAction(name, duration) {
    previousAction = activeAction;
    activeAction = actions[name];

    if (previousAction !== activeAction) {

        previousAction.fadeOut(duration);

    }

    activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();

}

function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
    if (canvas.width !== width || canvas.height !== height) {
      // you must pass false here or three.js sadly fights the browser
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // update any render target sizes here
    }
  }


function animate() {
    resizeCanvasToDisplaySize();
    const dt = clock.getDelta();

    if (mixer) mixer.update(dt);

    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    // stats.update();
    effect.render( scene, camera );
}

function initSky() {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar( 450000 );
    scene.add( sky );

    sun = new THREE.Vector3();

    /// GUI

    const effectController = {
        turbidity: 2,
        rayleigh: 0.75,
        mieCoefficient: 0.005,
        mieDirectionalG: 0,
        inclination: 0.483, // elevation / inclination
        azimuth: 0.3396, 
        exposure: renderer.toneMappingExposure
    };

    function guiChanged() {

        const uniforms = sky.material.uniforms;
        uniforms[ "turbidity" ].value = effectController.turbidity;
        uniforms[ "rayleigh" ].value = effectController.rayleigh;
        uniforms[ "mieCoefficient" ].value = effectController.mieCoefficient;
        uniforms[ "mieDirectionalG" ].value = effectController.mieDirectionalG;

        const theta = Math.PI * ( effectController.inclination - 0.5 );
        const phi = 2 * Math.PI * ( effectController.azimuth - 0.5 );

        sun.x = Math.cos( phi );
        sun.y = Math.sin( phi ) * Math.sin( theta );
        sun.z = Math.sin( phi ) * Math.cos( theta );

        uniforms[ "sunPosition" ].value.copy( sun );

        renderer.toneMappingExposure = effectController.exposure;
    }



    guiChanged();

}

async function loadAnimations() {
    let animations = [];
    for (let i = 0; i < actionNames.length; i++) {
        let fbx = await loadFBX(`models/Animal_TypeA@${actionNames[i]}.fbx`);
        let anim = fbx.animations[0];
        anim.name = actionNames[i];
        let begin = anim.tracks[0].times[0];

        anim.tracks.forEach(track=> {
            for (let j = 0; j < track.times.length; j++) {
                track.times[j] -= begin;
            }
        })
        anim.duration -= begin;
        animations.push(anim);
    }
    return animations;
}

function  loadFBX(path) {
    return new Promise(resolve => {
        new FBXLoader().load(path, resolve);
    })
}