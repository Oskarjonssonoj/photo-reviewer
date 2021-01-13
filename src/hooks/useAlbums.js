import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { useAuth } from '../contexts/ContextComp'

const useAlbums = () => {

	// States
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)

	// Contexts
	const { currentUser } = useAuth()

	// Effects
	useEffect(() => {
		const unmount = db.collection('albums')
			.where('owner', '==', currentUser.uid).onSnapshot(snapshot => {
				setLoading(true)
				const renderSnapAlbums = []

				snapshot.forEach(doc => {
					renderSnapAlbums.push({
						id: doc.id,
						...doc.data()
					})
				})

			setAlbums(renderSnapAlbums)
			setLoading(false)
		})

		return unmount
	}, [])

	return { albums, loading }
}

export default useAlbums