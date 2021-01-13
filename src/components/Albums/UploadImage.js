import React, { useState, useEffect, useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/esm/ProgressBar';
import { useDropzone } from 'react-dropzone';
import useUploadImage from '../../hooks/useUploadImage';

const UploadImage = ({ albumId }) => {

	// States
	const [uploadImage, setUploadImage] = useState(null);
	const [message, setMessage] = useState(null);

	// Hooks
	const { uploadProgress, error, isSuccess } = useUploadImage(uploadImage, albumId);

	// Effects
	useEffect(() => {
		if (error) {
			setMessage({
				error: true,
				text: error,
			});
		} else if (isSuccess) {
			setMessage({
				success: true,
				text: 'Image was correctly uploaded',
			});
			
			setUploadImage(null);
		} else {
			setMessage(null);
		}
	}, [error, isSuccess]);

	const onDrop = useCallback(acceptedFiles => {
		setMessage(null);

		if (acceptedFiles.length === 0) {
			return;
		}

		setUploadImage(acceptedFiles);
	}, []);

	const { getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
		accept: 'image/jpeg, image/png',
		onDrop
	});

	return (
		<div {...getRootProps()} id="upload-image-dropzone-wrapper" className={`text-center px-4 py-3 my-3 ${isDragAccept ? `drag-accept`: ``} ${isDragReject ? `drag-reject`: ``}`}>
			<input {...getInputProps()} />
			{
				isDragActive
					? isDragAccept ? <p>Drop it</p> : <p>The file that you've choosen is not available here.</p>
					: <p>Click here to upload a picture or drag and drop the picture here.</p>
			}

			{uploadProgress !== null && (<ProgressBar variant="success" animated now={uploadProgress} />)}

			{message && (<Alert variant={message.error ? 'warning' : 'success'}>{message.text}</Alert>)}
		</div>
	)
}

export default UploadImage
