import React, { useState } from 'react'
import GlassCard from '../Components/GlassCard'
import Button from '../Components/Button';
import { FaEnvelope, FaLock, FaPaperPlane } from 'react-icons/fa';


function LoginPage() {


    const [formData, setFormData] = useState({
        email: ''
    });
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        // Process form data
        console.log("Form submitted with data: ", formData);
        // Here, you can send the data to the server or perform any action you want
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

  return (
    <>  
      <div className="mb-4 container mx-auto px-4 h-auto flex flex-col  justify-center gap-4">
    <GlassCard styleClass={"flex flex-col gap-4"}>

        <div className="heading themeGlassBg themeText rounded-xl p-4 text-2xl font-bold flex justify-center items-center">
        <h1>Login</h1>
        </div>

        <div className="form themeGlassBg themeText rounded-xl p-4 text-2xl font-bold flex justify-center items-center">
   
        <form  onSubmit={handleSubmit} class="w-full mx-auto flex flex-col justify-center items-center gap-4">  

    
    <div class="relative flex  gap-4 bg rounded-xl items-center h-16 px-2 w-full md:w-2/3">

        <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
            <FaEnvelope />
        </div>
        <input 
         type="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
          id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" placeholder="Enter Your Email . . ." required />
    </div>

    <div class="relative flex gap-2 bg rounded-xl items-center h-16 px-2 w-full md:w-2/3">

        <div class="absolute z-10 inset-y-0 start-0 flex items-center ps-3 ml-2 pointer-events-none">
            <FaLock className='text-ms' />
        </div>
        <input 
         type="password"
         name="password"
         value={formData.password}
         onChange={handleChange}
          id="default-search" class="block w-full p-4 ps-10 text-sm bg-glassl dark:bg-glassd backdrop-blur-md rounded-lg focus:ring-transparent border-transparent focus:border-transparent dark:placeholder-gray-200 dark:text-white dark:focus:ring-transparent dark:focus:border-transparent" placeholder="Enter Your Password . . ." required />
    </div>  
     <div class="relative flex justify-center gap-2 rounded-xl items-center h-16 px-2 w-full md:w-2/3">


        <Button text="Login"
                icon={<FaPaperPlane className='text-xl' />}
                 type="submit" styleClass="w-fl p-4 h-12 justify-center items-center gap-4"/>
    </div>
</form>

        </div>









    </GlassCard>
    </div>
    </>
  )
}

export default LoginPage