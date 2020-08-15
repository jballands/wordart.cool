import React, { useState } from 'react';
import Wordart from './Wordart';

function App() {
	const [text, setText] = useState('wordart.cool');
	const [cameraZ, setCameraZ] = useState(500);

	return (
		<div className="App">
			<Wordart text={text} cameraZ={cameraZ} />
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<input
				type="range"
				value={cameraZ}
				onChange={(e) => setCameraZ(Number.parseInt(e.target.value))}
				min="100"
				max="1000"
			/>
		</div>
	);
}

export default App;
