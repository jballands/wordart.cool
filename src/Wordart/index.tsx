import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import WordartText from './WordartText';
import WordartCamera from './WordartCamera';

interface WordartProps {
	text: string;
}

function Wordart({ text }: WordartProps) {
	const [cameraZ, setCameraZ] = useState(500);
	const widthChanged = useCallback((width) => setCameraZ(width / 2 + 200), []);

	return (
		<Canvas style={{ width: '100%', height: '100%' }} camera={{ far: 5000 }}>
			<ambientLight />
			<WordartCamera cameraZ={cameraZ} />
			<Suspense fallback={null}>
				<WordartText text={text} onWidthChange={widthChanged} />
			</Suspense>
		</Canvas>
	);
}

export default Wordart;
