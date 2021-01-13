import { useEffect, useState } from 'react'
import { db } from '../firebase/firebase'

const useSelectedImages = (images, owner, title) => {

    const [selectedError, setSelectedError] = useState(false)
    const [selectedSuccess, setSelectedSuccess] = useState(false)

    useEffect(() => {
        if (!images) {
			setSelectedError(null);
			setSelectedSuccess(false);

			return;
        }
        
        (async () => {
			const submittetTitle = `${title} - ${Math.floor(Math.random() * 100)}` 

			try {
				
				await db.collection('albums').add({
					images: images,
					title: submittetTitle,
					owner,
				})
							
				setSelectedError(false)
				setSelectedSuccess(true)
			} catch (err) {
				setSelectedError(true)
				setSelectedSuccess(false)
			}
		})();		
    }, [images])
    
    return { selectedError, selectedSuccess }
}

export default useSelectedImages
