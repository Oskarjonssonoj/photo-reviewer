import { useState, useEffect } from 'react';
import { db, storage } from '../firebase/firebase';
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/ContextComp'

const useDeleteImage = image => {

	// States
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState(false)

	// Hooks
	const {albumId} = useParams()

	// Contexts
	const { currentUser } = useAuth()

	// Effects
	useEffect(() => {

		// Check if the image exist, if not just return and ignore
		if (!image) {
			return;
		}

		(async () => {
			try {
				// Getting and retrieveing existing album and its images
				let getImages = await db.collection('albums').doc(albumId).get()
				const currentImages = getImages.data().images

				// After delete click, render a new list
				currentImages.forEach((img, index) => {
					if (img.url === image.url) {
						currentImages.splice(index, 1) 	
					}
				})

				await db.collection('albums').doc(albumId).update({
					images: currentImages,
				});

			} catch (error) {
				setError(true)
				setIsSuccess(false)
			}
		})();
	}, [image]);

	return {error, isSuccess}
}

export default useDeleteImage


// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();
// // Create a storage reference from our storage service
// var storageRef = storage.ref();

// // Create a reference to the file to delete
// var desertRef = storageRef.child(image.path);

// // Delete the file
// desertRef.delete().then(function() {
// // File deleted successfully
// console.log("Sucess")
// }).catch(function(error) {
// // Uh-oh, an error occurred!
// console.log("No Sucess")
// });