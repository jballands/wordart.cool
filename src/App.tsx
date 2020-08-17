import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import Wordart from './Wordart';

const AppContainer = styled.div`
	display: flex;
	flex-flow: column;
	height: 100vh;
`;

const CoolControls = styled.div`
	flex: 1 0 0;
	margin: 25px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: column;
`;

const CoolText = styled.div`
	margin: 15px 0;
	color: white;
	font-style: italic;
	font-weight: 800;
	text-align: center;

	@media (max-width: 768px) {
		font-size: 28px;
	}
	@media (min-width: 769px) {
		font-size: 42px;
	}
`;

const CoolInput = styled.input`
	background: white;
	border: 2px solid hotpink;
	outline: none;
	color: navy;
	border-radius: 65px;
	font-weight: 700;
	text-align: center;
	box-shadow: 0 7px 15px 0px rgba(0, 0, 0, 0.3);

	@media (max-width: 768px) {
		padding: 15px;
		font-size: 24px;
		width: 80%;
	}
	@media (min-width: 769px) {
		padding: 20px;
		font-size: 36px;
		width: 550px;
	}
`;

const CoolButtonContainer = styled.div`
	position: absolute;
	bottom: 25px;
	display: flex;
	justify-content: center;
	width: 100%;
`;

const CoolButton = styled.button`
	background: hotpink;
	border: 2px solid white;
	outline: none;
	color: navy;
	border-radius: 65px;
	font-weight: 700;
	text-align: center;
	box-shadow: 0 7px 15px 0px rgba(0, 0, 0, 0.3);

	padding: 15px;
	font-size: 18px;
`;

const WordartContainer = styled.div`
	flex: 3 0 0;
	margin-bottom: 25px;
`;

function App() {
	const [viewMode, setViewMode] = useState(false);
	const [text, setText] = useState('wordart.cool');

	useEffect(() => {
		const query = qs.parse(window.location.search);

		// If there's a value, go into view mode
		if (query.text) {
			setViewMode(true);
			setText(query.text as string);
		}
	}, []);

	const textChanged = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;

		window.history.replaceState(
			val,
			'wordart.cool',
			`?${qs.stringify({ text: val })}`,
		);

		setText(val);
	};

	return (
		<AppContainer>
			{!viewMode && (
				<CoolControls>
					<CoolText>Type something sick.</CoolText>
					<CoolInput type="text" value={text} onChange={textChanged} />
				</CoolControls>
			)}

			<WordartContainer>
				<Wordart text={text} />
			</WordartContainer>

			{viewMode && (
				<CoolButtonContainer>
					<CoolButton onClick={() => setViewMode(false)}>
						Make your own
					</CoolButton>
				</CoolButtonContainer>
			)}
		</AppContainer>
	);
}

export default App;
