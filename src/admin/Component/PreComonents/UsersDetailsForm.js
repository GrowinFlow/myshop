import React from 'react'
import { FaUser, FaEnvelope, FaLock, FaImage, FaMap, FaAddressBook, FaBuilding, FaHome, FaCity, FaGlobeAfrica, FaRegCalendar, FaUserCog, FaUserTie, FaZhihu, FaCode, FaPlus } from 'react-icons/fa'
import { FaUsersRays } from 'react-icons/fa6'
import Button from "./../../../Common/Components/Button"
import WelcomeCard from './WelcomeCard'


function UsersDetailsForm() {
  return (
    <>
      <div className=" flex flex-col gap-2 h-[95vh]">

        <div className="themeGlassBg rounded-xl p-6 themeText">

          <span className='text-xl font-bold'>Add user:</span>



        </div>
        <form action="" className='flex flex-col items-center gap-2 themeGlassBg rounded-xl p-4 themeText'>

          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUser />
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUserTie />
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaZhihu />
              </div>
              <input
                type="text"
                name="username"
                placeholder="User_Name ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Strong Password ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
          </div>

          <div className='flex w-full  items-center flex-wrap md:flex-nowrap gap-2'>

            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
          </div>

          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaImage />
              </div>
              <input
                type="text"
                name="avatar"
                placeholder="Avatar Link ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaRegCalendar />
              </div>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
          </div>

          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaHome />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address Link ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                required />
            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCity />
              </div>
              <input
                type="text"
                name="city"
                placeholder="City ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>

          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaMap />
              </div>
              <input
                type="text"
                name="state"
                placeholder="state ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaGlobeAfrica />
              </div>
              <input
                type="text"
                name="country"
                placeholder="Country ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
              />
            </div>
          </div>


          <div className='flex  w-full items-center flex-wrap md:flex-nowrap gap-2'>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaCode />
              </div>
              <input
                type="text"
                name="zipCode"
                placeholder="zipCode ..."
                id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" />

            </div>
            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
                <FaUsersRays />
              </div>
              <select name="" id="" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent">
                <option value="client" selected>Client</option>
                <option value="manager" >Manager</option>
                <option value="admin" >Admin</option>
              </select>
            </div>
          </div>

          <div className='flex w-full  items-center flex-wrap md:flex-nowrap gap-2'>

            <div class="relative flex gap-2 bg rounded-xl items-center h-16 p-2 w-full ">
              <Button text="Add" styleClass="items-center justify-center h-12 gap-4 font-bold text-xl w-full" />
            </div>
          </div>






        </form>
      </div>
    </>
  )
}

export default UsersDetailsForm