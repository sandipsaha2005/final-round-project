import {
	Box,
	Card,
	Container,
	Divider,
	TextField,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Paper,
} from '@mui/material';
import Webcam from 'react-webcam';
import React from 'react';

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

const videoConstraints = {
	facingMode: FACING_MODE_USER,
};

const Camera = ({ singleData, filelist, setfilelist, handleClose }) => {
	const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

	const handleClick = React.useCallback(() => {
		setFacingMode((prevState) =>
			prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
		);
	}, []);

	const webcamRef = React.useRef(null);
	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();

		// var image = new Image();
		// image.src = imageSrc;
		// document.body.appendChild(image);
		// console.log(image, "images");
		console.log(singleData);

		let file = null;

		fetch(imageSrc)
			.then((res) => res.blob())
			.then((blob) => {
				console.log(blob);
				const newUrl = window.URL.createObjectURL(blob);
				console.log(newUrl);
				// file = new File([blob], 'File name', { type: 'image/png' });

				fetch(newUrl)
					.then((response) => response.blob())
					.then((blob) => {
						// Create a File object from the blob
						file = new File([blob], `file${singleData?.id}.jpeg`, { type: blob.type });

						console.log(file, 'file');

						const updatedList = filelist.map((item) => {
							if (item.id == singleData?.id) {
								return {
									...item,
									file: file,
									fileUrl: newUrl,
									uploadFileName: `file${singleData?.id}.jpeg`,
								};
							}
							return item;
						});
						console.log(updatedList);
						setfilelist(updatedList);
						handleClose();
					})
					.catch((error) => {
						// Handle any errors that occur during the process
						console.error('Error fetching blob data:', error);
					});
			});
	}, [webcamRef]);

	const videoConstraints = {
		width: 1280,
		height: 720,
		// facingMode: 'environment',
	};
	return (
		<Box p={2}>
			<Webcam
				audio={false}
				height={'100%'}
				ref={webcamRef}
				screenshotFormat='image/jpeg'
				width={'100%'}
				videoConstraints={{ ...videoConstraints, facingMode: facingMode }}
				onUserMediaError={() => {
					alert('Camera is not supported');
				}}
			/>
			<button onClick={capture}>Capture photo</button>
			<button onClick={handleClick}>Switch camera</button>
		</Box>
	);
};

export default Camera;
