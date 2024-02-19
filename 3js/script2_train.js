import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
      import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
      // import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200000000);
      camera.position.setScalar(200);
      // camera.position.set(63,109,27)
      camera.lookAt(scene.position);
      var renderer = new THREE.WebGLRenderer({
        antialias: true,
      });
      // renderer.setClearColor(0x404040);
      var canvas = renderer.domElement;
      document.getElementById("canvas_element").appendChild(canvas);
      
      var controls = new OrbitControls(camera, canvas);
      // scene.add(lod);
      // console.log(THREE.VertexColors)
      var light = new THREE.DirectionalLight(0xffffff, 0.5);
      light.position.setScalar(1);
      scene.add(light);
      // scene.add(new THREE.AmbientLight(0xffffff, 0.5));
      // scene.add(new THREE.PointLight())
      
      // Global variables
      const vertices = [];
      const platVertices = []
      const statVertices = []
      const statColors = []
      const trackColors = []
      const platColors = []
      let minDistance = Infinity;

      let cube;
      const query = location.search;
      const params = new URLSearchParams(query)
      fetchPly(params.get("id"))

      function initRendering(rows, vertices, colors, vertexColors){
        for(let i=0; i<rows.length-2; i++){
            let coords = rows[i].split(" ");
            vertices.push(1 * coords[0], 1 * coords[1], 1 * coords[2])
            if(vertexColors) {
                colors.push(1 * coords[3], 1 * coords[4], 1 * coords[5])
            }
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
        if(vertexColors) geometry.setAttribute("color", new THREE.BufferAttribute(new Uint8Array(colors), 3, true));
        const material = new THREE.PointsMaterial({ vertexColors, size: 0.3 });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
      }
      
      function fetchPly(id){
        if(!id){
            document.getElementById('error').style.display = 'block'
            return;
        }
        fetch("http://localhost:4000/?id="+id).then(resp=> resp.json())
        .then((d)=>{
          const track = d.track;
          const plat = d.plat;
          const stat = d.station;
          let rows = track.split('\n');
          let platRows = plat.split('\n');
          let statRows = stat.split('\n');
          initRendering(rows, vertices, trackColors, true);
          initRendering(platRows, platVertices, platColors, true);
          initRendering(statRows, statVertices, statColors, true);
          
          // setting the max value in range input 
          console.log(vertices.length);
          document.getElementById("range").setAttribute("max", vertices.length);
          document.getElementById('max').innerText = vertices.length
          createCuboid();
          initializeListeners();
          getDistance(vertices, 0);
        }).catch(err=>{
          console.log("error occured: ", err.message);
        })
      }

      function createCuboid(){
        const cubeGeometry = new THREE.BoxGeometry(1.7,3,1);
        // const cubeGeometry = new THREE.BoxGeometry(1,1.7,4);
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // const cubePosition = new THREE.Vector3();
        cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        // cube.rotation.set(0, 0, Math.PI/8.4);
        setCubePosition(vertices, 0);
        scene.add(cube);
        cube.position.set(vertices[0], vertices[1]-1, vertices[2]);
        getDistance(vertices, 0);
      }    
   


      function setCubePosition(vertices, idx) {
        cube.position.set(vertices[idx], vertices[idx+1]-0.9, vertices[idx+2]);
        const angle = Math.atan2(vertices[idx+(3)+1]-0.9 - vertices[idx+1]-0.9, vertices[idx+(3)] - vertices[idx]);
        cube.rotation.z = angle+0.25;
      }
    
      
   
      //? handling events
    //   let counter = 0
      function initializeListeners(){
          document.getElementById('forward').addEventListener('click', (e)=>{
          if(startRunning.getIndex() >= vertices.length) return
          startRunning.runsWith(1)
            setPointIndex()
            updateRange()
            setCubePosition(vertices, startRunning.getIndex())
            getDistance(vertices, startRunning.getIndex())
          })
          document.getElementById('backward').addEventListener('click', (e)=>{
            if(startRunning.getIndex() <= 0) return
            startRunning.runsWith(-1)
            setPointIndex()
            updateRange()
            setCubePosition(vertices, startRunning.getIndex())
            getDistance(vertices, startRunning.getIndex())
          })
          document.getElementById('range').addEventListener('input', (e)=>{
            const idx = parseInt(e.target.value)
            startRunning.setWith(idx)
            e.target.title = idx
            console.log(idx)
            setPointIndex()
            setCubePosition(vertices, startRunning.getIndex())
            getDistance(vertices, idx)
          })
          document.getElementById('run').addEventListener('click', ()=>{
            isRunning = isRunning? false:true;
            if(!isRunning){  
              getDistance(vertices, startRunning.getIndex())
              document.getElementById('run').innerText = 'Run'
            }else{
              document.getElementById('run').innerText = 'Stop'
            }
    
          })
          document.getElementById('reset').addEventListener('click', ()=>{
            scene.remove(cube);
            startRunning.setWith(0)
            isRunning = false;
            createCuboid();
            setCubePosition(vertices, startRunning.getIndex());
            setPointIndex();
            updateRange();
          })
      }


      function setPointIndex(){
        document.getElementById("pointindex").innerText = startRunning.getIndex()
      }
      function updateRange(){
        document.getElementById("range").value = startRunning.getIndex()
      }

      let settimeId = null;
      function getDistance(fittedPath, idx){
        if(settimeId){
          clearTimeout(settimeId);
          settimeId = null;
        }
        document.getElementById("current").innerText = 'loading...'
        settimeId = setTimeout(()=>{
          fetch('http://localhost:4000/nearest', {
            method:'POST',
            body:JSON.stringify({queryPoint:[fittedPath[idx], fittedPath[idx+1], fittedPath[idx+2]], pcd:platVertices}),
            headers:{
              'Content-Type':'application/json'
            }
          }).then(resp=> resp.json())
          .then(data=>{
            
            if(parseFloat(data.data) < minDistance){
              minDistance = data.data
            }
            document.getElementById("current").innerText = `${(data.data-1.7).toFixed(2)}m`
            document.getElementById("minimum").innerText = `${(minDistance-1.7).toFixed(2)}m`
          })
        }, 500)
      }

      // manages the running speed and position index
      const startRunning = (function (){
        let counter = 0;
        return {
            runsWith:function(multiplyer){counter+=3*multiplyer;},
            resetToZero:function(){counter=0},
            getIndex: function(){return counter},
            setWith: function(val){counter = val}
        }
      })();

      let isRunning = false

      renderer.setAnimationLoop(function () {
        if (resize(renderer)) {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
        renderer.render(scene, camera);
        // console.log(camera.position.clone())
        if(isRunning){
            if(startRunning.getIndex()>vertices.length-40){
              startRunning.resetToZero()
            }
            setCubePosition(vertices, startRunning.getIndex())
            startRunning.runsWith(3)
            
            document.getElementById('range').value = startRunning.getIndex()
            setPointIndex()
            // getDistance()
        }
      });

      function resize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }