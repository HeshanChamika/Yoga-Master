import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';

import {BiTime} from "react-icons/bi";
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers } from "react-icons/fa";
import {MdBookOnline} from "react-icons/md";
import bannerImg1 from "../../assets/home/banner-1.jpg"

const SingleClass = () => {
   const course = useLoaderData();
   const {currentUser} = useUser();
   const role = currentUser?.role;
   const [enrolledClasses, setEnrolledClasses] = useState([]);
   const axiosFetch = useAxiosFetch();
   const axiosSecure = useAxiosSecure();
   
   const handleSelect = (id) => {
      axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
        .then(res => setEnrolledClasses(res.data))
        .catch((err) => console.log(err));
      if(!currentUser) {
        return alert("Please login first")
      }
      axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`)
      .then(res => {
  
        if(res.data.classId === id) {
  
          return alert("Already selected")
        } 
        else if( enrolledClasses.find(item => item.classes._id === id)) {
  
          return alert("Already enrolled")
        } 
        else {
          const data = {
            classId: id,
            userMail: currentUser?.email,
            date: new Date()
          }
  
          axiosSecure.post('/add-to-cart', data)
            .then(res => {
              alert("Successfully added to the cart");
              console.log(res.data)
            })
        }
      })
    }

  return (
    <>
      <div
      className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto'
      data-new-gr-c-s-check-loaded="14.1157.0"
      data-gr-ext-installed=""
    >
      {/* {breadcrumbs or header */}
      <div className="breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat">
         <div className='container text-center'>
            <h2>Course Details</h2>
         </div>
      </div>

      <div className='nav-tab-wrapper tabs section-padding mt-8'>
         <div className="container">
            <div className='grid grid-cols-12 md:gap-[30px]'>
               {/* left side */}
               <div className='lg:col-span-8 col-span-12'>
                  <div className='single-course-details'>
                     <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                        <img 
                           src={course?.image} 
                           alt=""
                           className='rounded-md object-fit w-full h-full block' 
                        />
                     </div>
                     <h2 className='text-2xl mb-2'>{course?.name}</h2>

                     <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                        <div className='flex space-x-4 items-center group'>
                           <div className='flex-none'>
                              <div className='h-12 w-12 rounded'>
                                 <img 
                                    src={"https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg" }
                                    alt="" 
                                    className='object-cover w-full h-full rounded'
                                 />
                              </div>
                           </div>
                           <div className='flex-1'>
                              <p className='text-secondary'>
                                 Trainer
                                 <a href="#" className='text-black'>
                                    : {course.instructorName}
                                 </a>
                              </p>
                           </div>
                        </div>   
                        <div>
                           <span className='text-secondary'>
                              Last Update:
                              <a href="#" className='text-black ml-1'>
                                 {new Date(course.submitted).toLocaleDateString()}
                              </a>
                           </span>
                        </div>
                     </div>   
                     
                     <div className='nav-tab-wrapper mt-12'>
                        <ul id="tabs-nav" className="course-tab mb-8">
                           <li className="active">
                              <a href="#tab1">Overview</a>
                           </li>
                           <li>
                              <a href="#tab2">Curriculm</a>
                           </li>
                           <li>
                              <a href="#tab3">Instructor</a>
                           </li>
                           <li>
                              <a href="#tab4">Reviews</a>
                           </li>
                        </ul>
                        <div id="tabs-content">
                           <div id="tab1" className="tab-content">
                              <div>
                                 <h3 className="text-2xl mt-8">Course Description</h3>
                                 <p className="mt-4">
                                    This tutorial will help you leran quickly and
                                    thoroughly. Lorem ipsum dolor, sit amet consectetur 
                                    adipisicing elit. Beatae dignissimos iusto sequi ex 
                                    quod nam numquam excepturi fugiat assumenda quibusdam, 
                                    quas, ullam quis dicta ipsam, nihil cumque ratione dolores porro!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    <br /><br />Quod porro laborum unde omnis alias repudiandae 
                                    dolorum reiciendis, eaque facilis dicta corrupti velit? 
                                    Omnis labore repellendus explicabo fugit id, ea fugiat.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Officia assumenda, ab necessitatibus fuga, voluptas 
                                    nostrum vero consequatur tenetur recusandae neque 
                                    laboriosam aspernatur possimus.
                                 </p>
                                 <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                    <h4 className='text-2xl'>What you will learn?</h4>
                                    <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                       <li className='flex space-x-3'>
                                          <div className='flex-none relative top-1'>
                                             <img src="/correct-mark.png" alt="" />
                                          </div>
                                          <div className='flex-1'>
                                             Learn how perspective works and how to
                                             incorporate your art
                                          </div>
                                       </li>

                                       <li className='flex space-x-3'>
                                          <div className='flex-none relative top-1'>
                                             <img src="/correct-mark.png" alt="" />
                                          </div>
                                          <div className='flex-1'>
                                             Learn how perspective works and how to
                                             incorporate your art
                                          </div>
                                       </li>

                                       <li className='flex space-x-3'>
                                          <div className='flex-none relative top-1'>
                                             <img src="/correct-mark.png" alt="" />
                                          </div>
                                          <div className='flex-1'>
                                             Learn how perspective works and how to
                                             incorporate your art
                                          </div>
                                       </li>

                                       <li className='flex space-x-3'>
                                          <div className='flex-none relative top-1'>
                                             <img src="/correct-mark.png" alt="" />
                                          </div>
                                          <div className='flex-1'>
                                             Learn how perspective works and how to
                                             incorporate your art
                                          </div>
                                       </li>
                                    </ul>
                                 </div>
                                 <div>
                                    <h4 className='text-2xl'>What you will learn?</h4>
                                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5'>
                                       <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                          <span className="flex-none">
                                             <img src="/logo.png" alt="" />
                                          </span>
                                          <span className='flex-1 text-black'>
                                             Computer/ Mobile
                                          </span>
                                       </div>
                                       <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                          <div className="flex-none">
                                             <img src="/logo.png" alt="" />
                                          </div>
                                          <span className='flex-1 text-black'>
                                             Paper &amp; Pencil
                                          </span>
                                       </div>
                                       <div className='bg-white rounded px-5 py-[18px] flex shadow-box2 space-x-[10px] items-center'>
                                          <div className="flex-none">
                                             <img src="/logo.png" alt="" />
                                          </div>
                                          <span className='flex-1 text-black'>
                                             Internet Connect
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div id="tab2" className="tab-content">
                              <div>
                                 <h3 className='text-2xl mt-8'>Lesson Plan</h3>
                                 <p className="mt-4">
                                    Lorem ipsum dolor, sit amet consectetur 
                                    adipisicing elit. A corrupti accusantium 
                                    id inventore vitae odit voluptatibus 
                                    commodi minima in fugiat voluptas, doloribus, 
                                    ullam laborum magni ea soluta provident officia. 
                                    Dolores. Lorem ipsum dolor sit amet consectetur 
                                    <br /><br />adipisicing elit. Consequuntur necessitatibus 
                                    pariatur illo laudantium officiis recusandae 
                                    est error debitis mollitia cupiditate officia 
                                    sed dicta, modi consectetur harum corrupti. 
                                    Laborum, doloribus quam. Lorem ipsum dolor 
                                    sit amet consectetur adipisicing elit. 
                                    Quasi, porro magni ipsa tenetur unde laborum.
                                 </p>
                                 <div className='bg-[#F8F8F8] dark:bg-indigo-500 space-y-6 p-8 rounded-md my-8'>
                                    <h4 className='text-2xl'>This Course is For Beginners</h4>
                                 </div>
                                 <div>
                                    <h4 className='text-2xl'>What you will learn?</h4>
                                    <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ipsam maiores consectetur qui, dicta tempore earum optio nihil dolore eum non asperiores praesentium nemo repellendus dolor distinctio animi mollitia magni?</p>
                                 </div>
                              </div>
                           </div>

                        </div>
                        
                     </div>

                  </div>
               </div>

               {/* right side */}
               <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
                  <div className='sidebarWrapper space-y-[30px]'>
                     <div className='widget custom-text space-y-5'>
                        <a className='h-[220px]' href="#">
                           <img 
                              src={course.image} 
                              alt=""
                              className='block w-full h-full object-cover rounded'   
                           />
                           <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                              <img src="/play.png" alt="" />
                           </div>
                        </a>
                        <h3>${course.price}</h3>
                        <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin can not be able to select' ? course.availableSeats < 1 : "No seat available" : "You can select this classes"} disabled={role==='admin' || role === 'instructor' || course.availableSeats < 1} className='btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white'>
                           Enroll Now
                        </button>
                        <ul className='list'>
                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <FaUser className='inline-flex'/>
                                 <div className='text-black font-semibold'>
                                    Instructor
                                 </div>
                              </div>
                              <div className='flex-none'>{course.instructorName}</div>
                           </li>

                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <MdBookOnline />
                                 <div className='text-black font-semibold'>
                                    Lectures
                                 </div>
                              </div>
                              <div className='flex-none'>23</div>
                           </li>

                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <BiTime />
                                 <div className='text-black font-semibold'>
                                    Duration
                                 </div>
                              </div>
                              <div className='flex-none'>2Hr 36Minutes</div>
                           </li>

                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <FaUsers/>
                                 <div className='text-black font-semibold'>
                                    Enrolled
                                 </div>
                              </div>
                              <div className='flex-none'>{course.totalEnrolled}</div>
                           </li>

                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <FaLevelUpAlt/>
                                 <div className='text-black font-semibold'>
                                    Course level
                                 </div>
                              </div>
                              <div className='flex-none'>Intermediate</div>
                           </li>

                           <li className='flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                              <div className='flex-1 space-x-3 flex items-center'>
                                 <FaLanguage/>
                                 <div className='text-black font-semibold'>
                                    Language
                                 </div>
                              </div>
                              <div className='flex-none'>English</div>
                           </li>
                        </ul>
                        <ul className='flex space-x-4 items-center pt-3'>
                           <li className='text-black font-semibold'>Share On:</li>
                           <li>
                              <a href="#" className='flex h-10 w-10'>
                                 <img src="/logo.png" alt="" />
                              </a>
                           </li>
                           <li>
                              <a href="#" className='flex h-10 w-10'>
                                 <img src="/logo.png" alt="" />
                              </a>
                           </li>
                           <li>
                              <a href="#" className='flex h-10 w-10'>
                                 <img src="/logo.png" alt="" />
                              </a>
                           </li>
                           <li>
                              <a href="#" className='flex h-10 w-10'>
                                 <img src="/logo.png" alt="" />
                              </a>
                           </li>
                        </ul>
                     </div>

                     <div className='widget'>
                        <h4 className='widget-title'>Related Courses</h4>
                        <ul className='list'>
                           <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                              <div className='flex-none'>
                                 <div className='h-20 w-20 rounded'>
                                    <img 
                                       src={bannerImg1} 
                                       alt=""
                                       className='w-full h-full object-cover rounded'   
                                    />
                                 </div>
                              </div>
                              <div className='flex-1'>
                                 <div className='flex space-x-3 mb-2'>
                                    <iconify-icon
                                       icon="heroicons:star-20-solid"
                                       className="text-tertiary"
                                    ></iconify-icon>
                                    <iconify-icon
                                       icon="heroicons:star-20-solid"
                                       className="text-tertiary"
                                    ></iconify-icon>
                                    <iconify-icon
                                       icon="heroicons:star-20-solid"
                                       className="text-tertiary"
                                    ></iconify-icon>
                                    <iconify-icon
                                       icon="heroicons:star-20-solid"
                                       className="text-tertiary"
                                    ></iconify-icon>
                                    <iconify-icon
                                       icon="heroicons:star-20-solid"
                                       className="text-tertiary"
                                    ></iconify-icon>
                                 </div>
                                 <div className='mb-1 font-semibold text-black'>
                                    Greatest Passion in...
                                 </div>
                                 <span className='text-secondary font-semibold'>
                                    $38.00
                                 </span>
                              </div>
                           </li>
                           <li className='flex space-x-4 border-[#ECECEC] pb-6 mb-6 last:pb-0 last:mb-0 last:border-0 border-b'>
                              <div className='flex-none'>
                                 <div className='h-20 w-20 rounded'>
                                    <img 
                                       src={bannerImg1} 
                                       alt=""
                                       className='w-full h-full object-cover rounded'   
                                    />
                                 </div>
                              </div>
                              <div className='flex-1'>
                                 <div className='mb-1 font-semibold text-black'>
                                    Greatest Passion in...
                                 </div>
                                 <span className='text-secondary font-semibold'>
                                       $38.00
                                 </span>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
    </>
  )
}

export default SingleClass