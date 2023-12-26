import React, { useState, useRef, useEffect, useCallback } from 'react';
import downloadIcon from "../../../assets/images/icons/download_icon.svg"
import { toast } from 'react-toastify';

const ImageUploader = ({ onUploadImage, defaultImage, isInvalid }) => {

    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(defaultImage)
    }, [defaultImage])


    const fileInputRef = useRef(null);

    const handleImageUpload = useCallback((files) => {
        const file = files[0];
        if (file && ["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
            onUploadImage(file)
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Please upload valid file type!")
        }
    }, [onUploadImage]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        handleImageUpload(e.dataTransfer.files);
    }, [handleImageUpload]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);



    const handleFileInputChange = useCallback((e) => {
        handleImageUpload(e.target.files);
    }, [handleImageUpload]);

    const handleOpenFileDialog = useCallback(() => {
        fileInputRef.current.click();
    }, [fileInputRef]);

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ border: '2px dashed', borderColor: `${isInvalid ? "red" : "#fff"}` }}
            className='drag-area'
            onClick={handleOpenFileDialog}
        >
            <input
                type="file"
                onChange={handleFileInputChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept={"image/png, image/jpeg, image/jpg"}
            />
            {image ? (
                <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
            ) : (
                <div
                    className='d-flex align-items-center justify-content-center cursor-pointer h-100 flex-column gap-3'
                >
                    <img
                        src={downloadIcon}
                        className='cursor-pointer'
                        alt="download" />
                    <p>Drop an image here</p>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
