import React from 'react'
import './styles/albums.scss'


const AlbumInfo = (albums) => {
    let numberOfTotalImg = 0
    let numberOfAlbumImg = 0

    albums.albums.map(album =>{
        numberOfAlbumImg = album.images.length
        numberOfTotalImg += numberOfAlbumImg
        return numberOfTotalImg
    })
    console.log(numberOfTotalImg)

    return (
        <> 
            <div className="fun-fact-container">
                <div className="fun-fact">
                    <h1>{albums.albums.length}</h1>
                    <p>Number of total albums you have on your account</p>
                </div>
                <div className="fun-fact">
                    <h1>{numberOfTotalImg}</h1>
                    <p>Number of total photos you have on your account</p>
                </div>
            </div>
        </>
    )
}

export default AlbumInfo

