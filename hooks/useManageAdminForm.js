 // Hook para gerenciar o formulário
import { useState } from 'react';

const useManageFormData = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.URL_ADMIN}/administrator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          lastname: '',
          birthdate: '',
          email: '',
          password: '',
          phone: ''
        });
        console.log('Data sent successfully!');
      } else {
        console.error('Error in response:', response.status);
      }
    } catch (error) {
      console.error('Error in request:', error);
    }
  };

  return { formData, handleInputChange, handleSubmit };
};

export default useManageFormData;
