import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, useResource, useUpdate } from 'react-three-fiber';

interface WordartTextProps {
	text: string;
	onWidthChange: (width: number) => any;
}

function WordartText({ text, onWidthChange }: WordartTextProps) {
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

	const [dummyTextRef, dummyText] = useResource<THREE.Object3D | undefined>();

	useEffect(() => {
		if (!groupRef.current || !dummyText) {
			return;
		}

		const group = groupRef.current;

		// Apply the transform to the Box3
		const boundingBox = new THREE.Box3().setFromObject(dummyText);

		// Now that our Box3 is correctly transformed, create our size vector
		const size = new THREE.Vector3();
		boundingBox.getSize(size);

		onWidthChange(size.x);

		// Objects/groups always rotate about their origin
		// So we translate the meshes so that they are halfway left of their parent's origin
		group.children.map((mesh) => {
			mesh.translateX(-size.x / 2);
			mesh.translateY(-size.y / 3);
			mesh.translateZ(-size.z / 2);
		});

		return () => {
			group.children.map((mesh) => {
				mesh.translateX(size.x / 2);
				mesh.translateY(size.y / 3);
				mesh.translateZ(size.z / 2);
			});
		};
	}, [groupRef, text, dummyText, onWidthChange]);

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

			{/* Since Box3 is always aligned to the world, this acts as our dummy to measure */}
			<mesh ref={dummyTextRef} position={[0, -20000, 0]}>
				<textBufferGeometry attach="geometry" args={[text, outerFontConfig]} />
			</mesh>
		</>
	);
}

export default WordartText;
