import { useEffect } from 'react';
import { db, storage } from '../firebase/firebase';

const useDeleteImage = image => {
	useEffect(() => {
		if (!image) {
			return;
		}

		(async () => {
			await db.collection('images').doc(image.id).delete();
			await storage.ref(image.path).delete();
		})();
	}, [image]);

	return {}
}

export default useDeleteImage
