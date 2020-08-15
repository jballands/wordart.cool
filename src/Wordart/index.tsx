import React, { Suspense } from 'react';
// import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
// import { OrbitControls } from 'drei';
import WordartText from './WordartText';
import WordartCamera from './WordartCamera';

interface WordartProps {
	text: string;
	cameraZ: number;
}

function Wordart({ text, cameraZ }: WordartProps) {
	return (
		<Canvas style={{ height: '50vh' }}>
			<ambientLight />
			<WordartCamera cameraZ={cameraZ} />
			<Suspense fallback={null}>
				<WordartText text={text} />
			</Suspense>
		</Canvas>
	);
}

export default Wordart;
