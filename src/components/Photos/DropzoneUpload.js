import React, {useState, useEffect, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Box } from '@chakra-ui/react'

const DropzoneUpload = () => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log('got me some files', acceptedFiles)
      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Box {...getRootProps()}  w="100%" p={4} color="white" border="1px" borderColor="gray.200" borderStyle="dashed" m="10px" borderRadius="10px" p="40px">
            <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
        </Box>
    )
}

export default DropzoneUpload
