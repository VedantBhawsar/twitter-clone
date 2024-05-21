// import {  } from '@cloudinary/react';

import { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';

export const useUploadImage = () => {
  const [image, setImage] = useState<string>('');

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      toast.loading('Uploading image', { id: '1F' });

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'iug38uvw');

      fetch('https://api.cloudinary.com/v1_1/dydrdxj16/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          setImage(data.secure_url);
          toast.success('Image uploaded', { id: '1F' });
        })
        .catch((error) => {
          toast.error('Error uploading image:', { id: '1F' });
        });
    }
  };

  return { image, uploadImage, setImage };
};
