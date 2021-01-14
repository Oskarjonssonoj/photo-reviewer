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
                    <p>Number of albums that you have on photo reviewer</p>
                </div>
                <div className="fun-fact">
                    <h1>{numberOfTotalImg}</h1>
                    <p>Number of photos that you have on photo reviewer</p>
                </div>
            </div>
        </>
    )
}

export default AlbumInfo

