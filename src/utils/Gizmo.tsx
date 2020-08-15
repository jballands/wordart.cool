import React from 'react';
import { Line } from 'drei';

interface GizmoProps {
	origin?: [number, number, number];
	size?: [number, number, number];
}

function Gizmo({ origin = [0, 0, 0], size = [50, 50, 50] }: GizmoProps) {
	return (
		<group position={origin}>
			<Line
				points={[
					[0, 0, 0],
					[size[0], 0, 0],
				]}
				color="blue"
			/>
			<Line
				points={[
					[0, 0, 0],
					[0, size[1], 0],
				]}
				color="green"
			/>
			<Line
				points={[
					[0, 0, 0],
					[0, 0, size[2]],
				]}
				color="red"
			/>
		</group>
	);
}

export default Gizmo;
