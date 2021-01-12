import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'
import { useAuth } from '../contexts/ContextComp'

const useAlbums = () => {
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)

	const { currentUser } = useAuth()

	useEffect(() => {
		const unsubscribe = db.collection('albums')
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

		return unsubscribe
	}, [])

	return { albums, loading }
}

export default useAlbums