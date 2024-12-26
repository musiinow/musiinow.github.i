import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';

const githubData = {
    repoCount: 15,
    totalLines: 20000,
    images: [
        '/image/01.png',
        '/image/02.png',
        '/image/03.png',
        '/image/04.png',
        '/image/05.png',

    ],
};

// A rotating sphere with images and text
function RotatingSphere() {
    const sphereRef = useRef();

    // Rotate the sphere on every frame
    useFrame(() => {
        sphereRef.current.rotation.y += 0.002;
    });

    const radius = 5; // �y���b�|
    const innerRadius = radius - 1.5; // �Ϥ��M��r���b�|

    return (
        <group ref={sphereRef}>
            {/* Sphere geometry */}
            <mesh>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial color="#1e90ff" wireframe />
                {/* <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial map={new THREE.TextureLoader().load('/path/image/0.png')} side={THREE.DoubleSide} /> */}
            </mesh>
            {/* Render Text and Images */}
            {/*<TextElements radius={innerRadius} />*/}
            <ImageElements radius={innerRadius} />
        </group>
    );
}

function ImageElements({ radius }) {
    return (
        <>
            {githubData.images.map((image, index) => {
                const angle = (index / githubData.images.length) * Math.PI * 2;

                const position = [
                    Math.sin(angle) * radius,
                    0,
                    Math.cos(angle) * radius,
                ];

                return (
                    <Plane
                        key={`image-${index}`}
                        args={[3, 3]}
                        position={position}
                        rotation={[
                            0,
                            angle+3.14,
                            0,
                        ]}
                    >
                        <meshStandardMaterial>
                            <primitive attach="map" object={new THREE.TextureLoader().load(image)} />
                        </meshStandardMaterial>
                    </Plane>
                );
            })}
        </>
    );
}


function App() {
    return (
        <div style={{ height: '100vh', width: '100vw', background: '#000' }}>
            <Canvas>
                {/* Add light sources */}
                <ambientLight intensity={10} />
                <pointLight position={[0, 0, 0]} intensity={10} distance={10} />
                {/* Add the rotating sphere */}
                <RotatingSphere />
                {/* Add camera controls */}
                <OrbitControls
                    enableZoom={true}
                    enableRotate={true}
                    enablePan={false} 
                    target={[0, 0, 0]} 
                />
            </Canvas>
        </div>
    );
}

export default App;
