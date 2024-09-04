import React, { useState, useRef } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop, convertToPixelCrop } from 'react-image-crop';
import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import Rotate90DegreesCwIcon from '@mui/icons-material/Rotate90DegreesCw';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import SaveIcon from '@mui/icons-material/Save';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Grid from '@mui/material/Grid';
import Compress from 'browser-image-compression';

import 'react-image-crop/dist/ReactCrop.css';
import { current } from '@reduxjs/toolkit';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

export default function App({
	imgSrc,
	crop,
	setCrop,
	data,
	filelist,
	clear,
	handleClose,
	setfilelist,
}) {
	// const [imgSrc, setImgSrc] = useState('');
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const hiddenAnchorRef = useRef(null);
	const blobUrlRef = useRef('');

	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState(9 / 16);

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			if (height > 700) {
				setScale(0.5);
			}
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	async function onDownloadCropClick() {
		const image = imgRef.current;
		const previewCanvas = previewCanvasRef.current;
		if (!image || !previewCanvas || !completedCrop) {
			throw new Error('Crop canvas does not exist');
		}

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const offscreen = new OffscreenCanvas(
			completedCrop.width * scaleX,
			completedCrop.height * scaleY
		);
		const ctx = offscreen.getContext('2d');
		if (!ctx) {
			throw new Error('No 2d context');
		}

		ctx.drawImage(
			previewCanvas,
			0,
			0,
			previewCanvas.width,
			previewCanvas.height,
			0,
			0,
			offscreen.width,
			offscreen.height
		);
		// You might want { type: "image/jpeg", quality: <0 to 1> } to
		// reduce image size
		const blob = await offscreen.convertToBlob({
			type: 'image/png',
		});

		if (blobUrlRef.current) {
			URL.revokeObjectURL(blobUrlRef.current);
		}
		blobUrlRef.current = URL.createObjectURL(blob);

		// setprofilePic(blobUrlRef.current);

		fetch(blobUrlRef.current)
			.then((response) => response.blob())
			.then((blob) => {
				// Create a File object from the blob
				const file = new File([blob], 'filename.jpeg', { type: blob.type });

				const options = {
					// As the key specify the maximum size
					// Leave blank for infinity
					maxSizeMB: 1,
					// Use webworker for faster compression with
					// the help of threads
					useWebWorker: true,
				};

				Compress(file, options)
					.then((compressedBlob) => {
						// Compressed file is of Blob type
						// You can drop off here if you want to work with a Blob file
						console.log(compressedBlob);

						// If you want to work with the File
						// Let's convert it here, by adding a couple of attributes
						compressedBlob.lastModifiedDate = new Date();

						// Conver the blob to file
						const convertedBlobFile = new File([compressedBlob], file.name, {
							type: file.type,
							lastModified: Date.now(),
						});

						const updatedList = filelist.map((item) => {
							if (item.id == data?.id) {
								return {
									...item,
									file: convertedBlobFile,
								};
							}
							return item;
						});
						setfilelist(updatedList);
						handleClose();

						// Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
					})
					.catch((e) => {
						// Show the user a toast message or notification that something went wrong while compressing file
					});

				// Now you have a File object created from the blob
				// You can use this File object as needed
			})
			.catch((error) => {
				// Handle any errors that occur during the process
				console.error('Error fetching blob data:', error);
			});
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined);
		} else {
			setAspect(16 / 9);

			if (imgRef.current) {
				const { width, height } = imgRef.current;
				const newCrop = centerAspectCrop(width, height, 16 / 9);
				setCrop(newCrop);
				// Updates the preview
				setCompletedCrop(convertToPixelCrop(newCrop, width, height));
			}
		}
	}

	return (
		<div className='App'>
			<div className='Crop-Controls'>
				{/* <input type='file' accept='image/*' onChange={onSelectFile} /> */}
				{/* <Box>
					<label htmlFor='scale-input'>Scale: </label>
					<input
						id='scale-input'
						type='number'
						step='0.1'
						value={scale}
						disabled={!imgSrc}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
				</div> */}
				{/* <Box>
					<label htmlFor='rotate-input'>Rotate: </label>
					<input
						id='rotate-input'
						type='number'
						value={rotate}
						disabled={!imgSrc}
						onChange={(e) =>
							setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
						}
					/>
				</div> */}
				{/* <Box>
					<button onClick={handleToggleAspectClick}>
						Toggle aspect {aspect ? 'off' : 'on'}
					</button>
				</div> */}
			</div>
			{!!imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					aspect={aspect}
					// minWidth={400}
					minHeight={100}
					// circularCrop
				>
					<img
						ref={imgRef}
						alt='Crop me'
						src={imgSrc}
						style={{
							transform: `scale(${scale}) rotate(${rotate}deg)`,
						}}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
			{!!completedCrop && (
				<>
					<div style={{ visibility: 'hidden', display: 'none' }}>
						<canvas
							ref={previewCanvasRef}
							style={{
								border: '1px solid black',
								objectFit: 'contain',
								width: completedCrop.width,
								height: completedCrop.height,
							}}
						/>
					</div>
					{/* <Box>
						<button onClick={onDownloadCropClick}>Download Crop</button>
						<div style={{ fontSize: 12, color: '#666' }}>
							If you get a security error when downloading try opening the Preview in
							a new tab (icon near top right).
						</div>
						<a
							href='#hidden'
							ref={hiddenAnchorRef}
							download
							style={{
								position: 'absolute',
								top: '-200vh',
								visibility: 'hidden',
							}}
						>
							Hidden download
						</a>
					</div> */}
				</>
			)}
			<div style={{ justifyContent: 'center', display: 'flex' }}>
				<button
					onClick={() => {
						// setRotate(Math.min(180, Math.max(-180, rotate + 45)));
						setRotate(rotate - 45);
					}}
					style={{ marginRight: '15px' }}
				>
					<RotateLeftIcon fontSize='small' />
				</button>
				<button
					onClick={() => {
						// setRotate(Math.min(180, Math.max(-180, rotate + 45)));
						setRotate(rotate + 45);
					}}
					style={{ marginRight: '15px' }}
				>
					<RotateRightIcon fontSize='small' />
				</button>
				<button
					onClick={() => {
						// setRotate(Math.min(180, Math.max(-180, rotate + 45)));
						// setRotate(180);
						setRotate(rotate + 180);

						// if (rotate == 180) {
						// 	setRotate(360);
						// } else {
						// 	setRotate(180);
						// }
					}}
					style={{ marginRight: '15px' }}
				>
					<Rotate90DegreesCwIcon fontSize='small' />
				</button>

				<button
					onClick={() => {
						// setRotate(Math.min(180, Math.max(-180, rotate + 45)));
						// setRotate(180);
						setScale(scale + 0.5);

						// if (rotate == 180) {
						// 	setRotate(360);
						// } else {
						// 	setRotate(180);
						// }
					}}
					style={{ marginRight: '15px' }}
				>
					<ZoomInIcon fontSize='small' />
				</button>

				<button
					onClick={() => {
						// setRotate(Math.min(180, Math.max(-180, rotate + 45)));
						// setRotate(180);
						setScale(scale - 0.5);

						// if (rotate == 180) {
						// 	setRotate(360);
						// } else {
						// 	setRotate(180);
						// }
					}}
					style={{ marginRight: '15px' }}
				>
					<ZoomOutIcon fontSize='small' />
				</button>
			</div>
			<div style={{ padding: 4, justifyContent: 'center', display: 'flex' }}>
				<button
					onClick={() => {
						onDownloadCropClick();
					}}
					style={{ marginRight: '20px', backgroundColor: '#09C8A5' }}
				>
					{/* <SaveIcon fontSize="small" /> */}
					Save
				</button>
				<button
					onClick={() => {
						clear(data);
					}}
					style={{ marginRight: '8px', backgroundColor: '#DA6868' }}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}