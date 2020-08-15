import { useThree, useFrame } from 'react-three-fiber';

interface WordartCameraProps {
	cameraZ: number;
}

function WordartCamera({ cameraZ }: WordartCameraProps) {
	const { camera } = useThree();

	useFrame(() => {
		camera.position.setZ(cameraZ);
	});

	return null;
}

export default WordartCamera;
