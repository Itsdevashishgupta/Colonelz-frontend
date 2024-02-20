import { StickyFooter } from '@/components/shared';
import { Button, FormItem, Input, Upload } from '@/components/ui';
import React, { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
  project_id: string | null;
  item: string;
  description: string;
  unit: string;
  quantity: string;
  rate: string;
  discount: string;
  offer_price: string;
  total_price: string;
  remark: string;
  client_notes: string;
  type: string;
  files: File[];
}

const MyForm: React.FC = () => {
  const location=useLocation()
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get('project_id');
  const [formData, setFormData] = useState<FormData>({
    project_id: projectId,
    item: '',
    description: '',
    unit: '',
    quantity: '',
    rate: '',
    discount: '',
    offer_price: '',
    total_price: '',
    remark: '',
    client_notes: '',
    type: '',
    files: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        files: Array.from(files),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append form data to FormData object
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'files') {
        // Handle files separately
        formData.files.forEach((file) =>
        formDataToSend.append('files', file),
    )
      } else {
        formDataToSend.append(key, value);
      }
    });

    // Make API call (replace with your actual API endpoint)
    try {
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/create/quotation', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
      } else {
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
const navigate=useNavigate()
return (
  <form onSubmit={handleSubmit} className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
    {/* Render input fields for each form field excluding project_id */}
    {Object.entries(formData).map(([key, value]) => {
      if (key === 'project_id') {
        return null; // Skip rendering for project_id
      }

      // Replace underscores with spaces in the label
      const formattedLabel = key.replace(/_/g, ' ');

      if (key === 'files') {
        return (
          <>
            <div className="">
              <Upload onChange={handleFileChange} >
                <Button variant="solid" icon={<HiOutlineCloudUpload/>}>
                  Upload your file
                </Button>
              </Upload>
            </div>
          </>
        );
      }

      return (
        <div key={key} className=''>
          <FormItem label={formattedLabel} className='capitalize'>
            <Input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
            />
          </FormItem>
        </div>
      );
    })}
    <StickyFooter
      className="-mx-8 px-8 flex items-center justify-between py-4"
      stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <div className="md:flex items-center">
        <Button
          size="sm"
          className="ltr:mr-3 rtl:ml-3"
          type="button"
          onClick={() => {
            navigate(-1)
          }}
        >
          Discard
        </Button>
        <Button size="sm" variant="solid" type="submit">
          Submit
        </Button>
      </div>
    </StickyFooter>
  </form>
);
};

export default MyForm;