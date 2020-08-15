import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useUpdate } from 'react-three-fiber';
import Gizmo from '../utils/Gizmo';

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
		// // Now we can rotate the group
		group.rotateY(Math.PI / 2);
	}, []);

	useEffect(() => {
		if (!groupRef.current) {
			return;
		}

		const group = groupRef.current;

		//  We set up a rotation matrix based on the group so that we can apply it the
		// bounding box later...
		const rotationMatrix = new THREE.Matrix4();
		group.updateMatrix();
		rotationMatrix.extractRotation(group.matrix);

		// Apply the transform to the Box3
		const boundingBox = new THREE.Box3()
			.setFromObject(group)
			.applyMatrix4(rotationMatrix);

		// Now that our Box3 is correctly transformed, create our size vector
		const size = new THREE.Vector3();
		boundingBox.getSize(size);

		console.dir(size);

		// Objects/groups always rotate about their origin
		// So we translate the meshes so that they are halfway left of their parent's origin
		group.children.map((mesh) => {
			mesh.translateX(-size.x / 2);
			mesh.translateY(-size.y / 2);
			mesh.translateZ(-size.z / 2);
		});

		return () => {
			group.children.map((mesh) => {
				mesh.translateX(size.x / 2);
				mesh.translateY(size.y / 2);
				mesh.translateZ(size.z / 2);
			});
		};
	}, [groupRef, text]);

	// This code spins the text in 3D space
	useFrame(() => {
		if (!groupRef.current) {
			return null;
		}
		const group = groupRef.current;
		if (group.rotation.y > -Math.PI / 2) {
			group.rotation.y -= 0.02;
		} else {
			group.rotation.y = Math.PI / 2;
		}
	});

	return (
		<>
			<mesh position={[0, 100, 0]}>
				<sphereBufferGeometry attach="geometry" args={[32, 32, 32]} />
				<meshPhongMaterial attach="material" color="cyan" />
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
				<Gizmo />
			</group>
		</>
	);
}

export default WordartText;
