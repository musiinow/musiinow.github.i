import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Plane } from '@react-three/drei';
import * as THREE from 'three';

const githubData = {
    repoCount: 15,
    totalLines: 20000,
    languages: ['JavaScript', 'Python', 'HTML', 'CSS'],
    images: [
        '/path/image/01.png', // 使用相對於 public 的路徑
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

    const radius = 5; // 球的半徑
    const innerRadius = radius - 1.5; // 圖片和文字的半徑

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
//                    0, // 保持文字的高度與球心相同
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
//                            -angle, // 確保文字面朝球心
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
                    0, // 保持圖片的高度與球心相同
                    Math.cos(angle) * radius,
                ];

                return (
                    <Plane
                        key={`image-${index}`}
                        args={[3, 3]} // 圖片平面的寬和高
                        position={position}
                        rotation={[
                            0, // 確保圖片垂直對齊球體
                            angle+3.14,       // 圖片面朝球心
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
                    enableZoom={true} // 是否允許縮放
                    enableRotate={true} // 是否允許旋轉
                    enablePan={false} // 是否允許平移
                    target={[0, 0, 0]} // 攝影機的目標位置
                />
            </Canvas>
        </div>
    );
}

export default App;
