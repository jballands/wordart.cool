import React, { useState } from 'react';
import Wordart from './Wordart';

function App() {
	const [text, setText] = useState('wordart.cool');

	return (
		<div className="App">
			<Wordart text={text} />
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</div>
	);
}

export default App;
