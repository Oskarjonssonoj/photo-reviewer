import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

const useAlbum = (albumId) => {

	// States
	const [album, setAlbum] = useState();
	const [loading, setLoading] = useState(true);

	// Effects
	useEffect(() => {
		setLoading(true)

		const unmount = db.collection('albums').doc(albumId).onSnapshot(doc => {
			setAlbum({
				id: doc.id,
				...doc.data()
			})
		})

		setLoading(false)

		return unmount

	}, [albumId])


	return { album, loading };
}

export default useAlbum;
