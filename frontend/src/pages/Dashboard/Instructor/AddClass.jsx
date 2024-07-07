import React, { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';

const KEY = import.meta.env.VITE_IMG_TOKEN

const AddClass = () => {
   const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
   const axiosSecure = useAxiosSecure();
   const {currentUser, isLoading} = useUser();
   const [image, setImage] = useState(null);
   const handleFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      // console.log(formData);
      const newData = Object.fromEntries(formData);
      formData.append('file', image);
      // console.log(newData)

      fetch(API_URL, {
         method: "POST",
         body: formData
      }).then(res => res.json()).then(data => {
         console.log(data)
         if (data.success === true) {
            console.log(data.data.display_url)
            newData.image = data.data.display_url;
            newData.instructorName = currentUser?.name;
            newData.instructorEmail = currentUser?.email;
            newData.status = 'pending';
            newData.submitted = new Date();
            newData.totalEnrolled = 0;
            axiosSecure.post(`/new-class`, newData).then(res => {
               alert("Class added successfully!");
               console.log(res.data);
            })
         }
      })
   }

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   };

   if(isLoading) {
      return <div>Loading...</div>
   }
   
  return (
    <div>
      <div className='my-10'>
         <h1 className='text-center text-3xl font-bold'>Add Your Class</h1>
      </div>

      <form onSubmit={handleFormSubmit} className='mx-auto p-6 bg-white rounded shadow'>
         <div className='grid grid-cols-2 w-full gap-3 items-center'>
            <div className='mb-6'>
               <label className='block text-gray-700 font-bold mb-2' htmlFor="name">Class name</label>
               <input type="text" required placeholder='Your Class Name' name='name' id='name' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
               <label className='block text-gray-700 font-bold mb-2' htmlFor="image">Class Thumbnail Photo</label>
               <input type="file" required name='image' onChange={handleImageChange} className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4' />
            </div>
         </div>
         <div>
            <h1 className='text-[12px] my-2 mt-2 text-secondary'>You cannot change your name or email</h1>
            <div className='grid gap-3 grid-cols-2'>
               <div className='mb-6'>
                  <label className='block text-gray-700 font-bold mb-2'  htmlFor="instructorName">Instructor Name</label>
                  <input type="text" value={currentUser?.name} readOnly disabled placeholder='Instructor Name' name='instructorName' id='instructorName' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
               </div>
               <div className='mb-6'>
                  <label className='block text-gray-700 font-bold mb-2'  htmlFor="instructorEmail">Instructor Email</label>
                  <input type="email" value={currentUser?.email} readOnly disabled placeholder='Instructor Email' name='instructorEmail' id='instructoEmail' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
               </div>
            </div>
         </div>
         <div className='grid gap-3 grid-cols-2'>
            <div className='mb-6'>
               <label className='block text-gray-700 font-bold mb-2'  htmlFor="availableSeats">Available Seats</label>
               <input type="number" required placeholder='How many seats are available?' name='availableSeats' id='availableSeats' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
               <label className='block text-gray-700 font-bold mb-2'  htmlFor="price">Price</label>
               <div className='relative'>
                  <span className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500'>$</span>
                  <input type="number" required placeholder='How much does it cost?' name='price' id='price' className='w-full px-4 py-2 pl-8 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
               </div>
            </div>
         </div>

         <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor="videoLink">Youtube link <span className='text-[12px] text-gray-600'>(Optional)</span></label>
            <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are supported</p>
            <input type="text" placeholder='Your course intro video link' name='videoLink' className='w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500' />
         </div>

         <div className='mb-6'>
            <label className='block text-gray-700 font-bold mb-2' htmlFor="decription">Description</label>
            <textarea placeholder='Description about your course' name='decription' className='resize-none border w-full border-secondary p-2 rounded-lg' rows="4"/>
         </div>

         <div className='text-center w-full'>
            <button type='submit' className='bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded'>Add New Class</button>
         </div>
      </form>
    </div>
  )
}

export default AddClass