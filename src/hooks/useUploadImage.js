import { useState, useEffect } from 'react';
import { db, storage } from '../firebase/firebase';
import { useAuth } from '../contexts/ContextComp'

const useUploadImage = (images, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!images) {
			setUploadProgress(null);
			setError(null);
			setIsSuccess(false);

			return;
		}

		setError(null);
		setIsSuccess(false);


		if (albumId) {
			images.forEach(image => {

				const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);
				
				const uploadTask = fileRef.put(image);
				
				uploadTask.on('state_changed', taskSnapshot => {
					setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
				});
				
				uploadTask.then(async snapshot => {
		
					const imageUrl = await snapshot.ref.getDownloadURL();
		
					const img = {
						path: snapshot.ref.fullPath,
						name: image.name,
						owner: currentUser.uid,
						type: image.type,
						size: image.size,
						imageUrl,
					};

					let collectedImages

					await db.collection('albums').doc(albumId).get().then(doc => {
						const data = doc.data();
						collectedImages = data.images
					})

					
					await db.collection('albums').doc(albumId).update({
						images: [...collectedImages, img],
					});

					setError(false);
					setIsSuccess(true);
					setUploadProgress(null);
				}).catch(error => {
					setError({
						type: "warning",
						msg: error.code
					});
				});
			});
		}
			
	}, [images, currentUser, albumId]);

	return { uploadProgress, error, isSuccess };
}

export default useUploadImage;
