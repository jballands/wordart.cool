import React from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useUpdate } from 'react-three-fiber';

interface WordartTextProps {
	text: string;
}

function WordartText({ text }: WordartTextProps) {
	const font = useLoader(THREE.FontLoader, '/Cooper_Black_Regular.json');

	const outerFontConfig = {
		font,
		size: 80,
		height: 45,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 5,
		bevelSize: 5,
		bevelOffset: 0,
		bevelSegments: 5,
	};

	const innerFontConfig = {
		font,
		size: 80,
		height: 50,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 5,
		bevelSize: 2,
		bevelOffset: 0,
		bevelSegments: 5,
	};

	// This code aligns the texts horizontally in space
	const groupRef = useUpdate<THREE.Group>((group) => {
		// We set up a Box3 to act as the bounding box and a Vector3 to hold the dimensions
		const boundingBox = new THREE.Box3().setFromObject(group);
		const size = new THREE.Vector3();

		// size will now be a vector with size dimensions
		boundingBox.getSize(size);

		// Objects/groups always rotate about their origin
		// So we translate the meshes so that they are halfway left of their parent's origin
		group.children.map((mesh) => {
			mesh.translateX(-size.x / 2);
			mesh.translateY(-size.y / 2);
		});

		// Now we can rotate the group
		group.rotation.y = Math.PI / 2;
	}, []);

	// This code spins the text in 3D space
	useFrame(() => {
		if (groupRef.current) {
			const group = groupRef.current;
			if (group.rotation.y > -Math.PI / 2) {
				group.rotation.y -= 0.015;
			} else {
				group.rotation.y = Math.PI / 2;
			}
		}
	});

	return (
		<>
			<mesh>
				<sphereBufferGeometry attach="geometry" args={[5, 32, 32]} />
				<meshPhongMaterial color="aqua" attach="material" />
			</mesh>

			<group ref={groupRef}>
				<mesh>
					<textBufferGeometry
						attach="geometry"
						args={[text, outerFontConfig]}
					/>
					<meshStandardMaterial attach="material" color="white" />
				</mesh>
				<mesh>
					<textBufferGeometry
						attach="geometry"
						args={[text, innerFontConfig]}
					/>
					<meshNormalMaterial attach="material" />
				</mesh>
			</group>
		</>
	);
}

export default WordartText;
