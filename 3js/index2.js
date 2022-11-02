import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
        import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
        import { PLYLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/PLYLoader";
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
        camera.position.setScalar(10);
        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setClearColor(0x404040);
        var canvas = renderer.domElement;
        document.body.appendChild(canvas);

        var controls = new OrbitControls(camera, canvas);

        var light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.setScalar(10);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        var loader = new PLYLoader();
        
        loader.load(
            "https://threejs.org/examples/models/ply/ascii/dolphins.ply",
            function (geometry) {
                //geometry.computeVertexNormals();

                var material = new THREE.MeshStandardMaterial({
                    color: 0x0055ff,
                    flatShading: true
                });
                var mesh = new THREE.Mesh(geometry, material);

                mesh.position.y = -0.1;
                mesh.position.z = 0.3;
                mesh.rotation.x = -Math.PI / 2;
                mesh.scale.multiplyScalar(0.01);

                scene.add(mesh);
            }
        );

        document.addEventListener("mousedown", onDocumentMouseDown, false);

        // var points = [
        //     new THREE.Vector3(),
        //     new THREE.Vector3()
        // ]
        var points = []
        var clicks = 0;

        // var markerB = markerA.clone();
        // var markers = [
        //     markerA, markerB
        // ];
        var markers = []
        var distance = 0
        // scene.add(markerA);
        // scene.add(markerB);

        // var lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]);
        // var lineMaterial = new THREE.LineBasicMaterial({
        //     color: 0xff5555
        // });
        // var line = new THREE.Line(lineGeometry, lineMaterial);
        // scene.add(line);
        let line;
        let pointsToSet = []

        function getIntersections(event) {
            var vector = new THREE.Vector2();

            vector.set(
                event.clientX / window.innerWidth * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            );

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(vector, camera);

            var intersects = raycaster.intersectObjects(scene.children);

            return intersects;
        }

        function setLine(i, vectorA, vectorB) {
            console.log(vectorA, vectorB)
            line.geometry.attributes.position.setXYZ(i, vectorA.x, vectorA.y, vectorA.z);
            line.geometry.attributes.position.setXYZ(i+1, vectorB.x, vectorB.y, vectorB.z);
            
            line.geometry.attributes.position.needsUpdate = true;
        }

        function onDocumentMouseDown(event) {
            pointsToSet.push(new THREE.Vector3())
            var lineGeometry = new THREE.BufferGeometry().setFromPoints(pointsToSet);
            var lineMaterial = new THREE.LineBasicMaterial({
                color: 0xff5555
            });
            line = new THREE.Line(lineGeometry, lineMaterial);
            scene.add(line);
            console.log(event)
            var intersects = getIntersections(event);
            console.log(intersects)
            if (intersects.length > 0) {
                for(let i=0; i<intersects.length; i++){
                    var point = new THREE.Vector3()
                    var marker = new THREE.Mesh(
                        new THREE.SphereGeometry(0.1, 10, 20),
                        new THREE.MeshBasicMaterial({
                            color: 0xff5555
                        })
                    );
                    point.copy(intersects[i].point)
                    marker.position.copy(intersects[i].point)
                    points.push(point)
                    markers.push(marker)
                }
                // console.log("markersss", points)
                console.log("points:", points)
                // points[clicks].copy(intersects[0].point);
                // markers[clicks].position.copy(intersects[0].point);
                scene.add(markers[0])
                setLine(0, intersects[0].point, intersects[0].point);
                clicks++;
                if (clicks > 1) {
                    for(let i = 0; i < points.length -1; i++){
                        distance += points[i].distanceTo(points[i+1]);
                        
                        distancePlace.innerHTML =distance;
                        scene.add(markers[i+1])
                        setLine(i, points[i], points[i+1]);
                        
                    }
                    // clicks = 0;
                    // console.log(clicks)
                }
            }
        }

        renderer.setAnimationLoop(function () {
            if (resize(renderer)) {
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
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