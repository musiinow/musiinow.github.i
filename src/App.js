import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';

const githubData = {
    repoCount: 15,
    totalLines: 20000,
    languages: ['JavaScript', 'Python', 'HTML', 'CSS'],
    images: [
        '/path/image/01.png', // �ϥά۹�� public �����|
        '/path/image/02.png',
        '/path/image/03.png',
        '/path/image/04.png',
        '/path/image/05.png',

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
                {/*<sphereGeometry args={[radius, 64, 64]} />*/}
                {/*<meshStandardMaterial color="#1e90ff" wireframe />*/}
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial map={new THREE.TextureLoader().load('/path/image/0.png')} side={THREE.DoubleSide} />
            </mesh>
            {/* Render Text and Images */}
            {/*<TextElements radius={innerRadius} />*/}
            <ImageElements radius={innerRadius} />
        </group>
    );
}

// Component to render text elements
//function TextElements({ radius }) {
//    return (
//        <>
//            {githubData.languages.map((language, index) => {
//                const angle = (index / githubData.languages.length) * Math.PI * 2;

//                const position = [
//                    Math.sin(angle) * radius,
//                    0, // �O����r�����׻P�y�߬ۦP
//                    Math.cos(angle) * radius,
//                ];

//                return (
//                    <Text
//                        key={`text-${language}`}
//                        position={position}
//                        fontSize={0.5}
//                        color="white"
//                        anchorX="center"
//                        anchorY="middle"
//                        rotation={[
//                            0,
//                            -angle, // �T�O��r���²y��
//                            0,
//                        ]}
//                    >
//                        {language}
//                    </Text>
//                );
//            })}
//        </>
//    );
//}

// Component to render image elements
function ImageElements({ radius }) {
    return (
        <>
            {githubData.images.map((image, index) => {
                const angle = (index / githubData.images.length) * Math.PI * 2;

                const position = [
                    Math.sin(angle) * radius,
                    0, // �O���Ϥ������׻P�y�߬ۦP
                    Math.cos(angle) * radius,
                ];

                return (
                    <Plane
                        key={`image-${index}`}
                        args={[3, 3]} // �Ϥ��������e�M��
                        position={position}
                        rotation={[
                            0, // �T�O�Ϥ���������y��
                            angle+3.14,       // �Ϥ����²y��
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
                <ambientLight intensity={0.4} />
                <pointLight position={[0, 3, 0]} intensity={10} distance={10} />
                {/* Add the rotating sphere */}
                <RotatingSphere />
                {/* Add camera controls */}
                <OrbitControls
                    enableZoom={true} // �O�_���\�Y��
                    enableRotate={true} // �O�_���\����
                    enablePan={false} // �O�_���\����
                    target={[0, 0, 0]} // ��v�����ؼЦ�m
                />
            </Canvas>
        </div>
    );
}

export default App;
