import React, { Suspense } from 'react';
// import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
// import { OrbitControls } from 'drei';
import WordartText from './WordartText';

interface WordartProps {
	text: string;
}

function Wordart({ text }: WordartProps) {
	return (
		<Canvas style={{ height: '50vh' }} camera={{ position: [0, 0, 500] }}>
			<ambientLight />
			<Suspense fallback={null}>
				<WordartText text={text} />
			</Suspense>
		</Canvas>
	);
}

export default Wordart;
