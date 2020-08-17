import React, { useState } from 'react';
import styled from 'styled-components';
import Wordart from './Wordart';

const AppContainer = styled.div`
	display: flex;
	flex-flow: column;
	height: 100vh;
`;

const CoolControls = styled.div`
	flex: 1 0 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
`;

const CoolText = styled.div`
	margin: 15px 0;
	color: hotpink;
	font-style: italic;
	font-weight: 800;
	text-align: center;

	@media (max-width: 768px) {
		font-size: 24px;
	}
	@media (min-width: 769px) {
		font-size: 36px;
	}
`;

const CoolInput = styled.input`
	background: white;
	border: 2px solid hotpink;
	outline: none;
	color: hotpink;
	border-radius: 65px;
	font-weight: 700;
	text-align: center;

	@media (max-width: 768px) {
		padding: 15px;
		font-size: 24px;
		width: 87.5%;
	}
	@media (min-width: 769px) {
		padding: 20px;
		font-size: 36px;
		width: 550px;
	}
`;

const WordartContainer = styled.div`
	flex: 3 0 0;
`;

function App() {
	const [text, setText] = useState('wordart.cool');

	return (
		<AppContainer>
			<CoolControls>
				<CoolText>Write something sick.</CoolText>
				<CoolInput
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
			</CoolControls>

			<WordartContainer>
				<Wordart text={text} />
			</WordartContainer>
		</AppContainer>
	);
}

export default App;
