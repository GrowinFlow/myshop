import '../../../assets/styles/swiper.css'
import GlassCard from '../../../Common/Components/GlassCard';
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { useState } from 'react';

function Testimonial() {
  // Correctly initialize the state with useState
  const [testimonials, setTestimonials] = useState([
    {
      "name": "theo_mr",
      "review": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit doloremque, deleniti, mollitia vel facilis fugit soluta nobis ipsam cum corrupti excepturi, facere eos at explicabo.",
      "dp": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-y-fFn8KjGMJWwHyFA32_Xvysu-c0c3pHIw&s"
    },
    {
      "name": "helna_i",
      "review": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit doloremque, deleniti, mollitia vel facilis fugit soluta nobis ipsam cum corrupti excepturi, facere eos at explicabo.",
      "dp": "https://www.material-tailwind.com/img/avatar5.jpg"
    },
    {
      "name": "bro_de",
      "review": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit doloremque, deleniti, mollitia vel facilis fugit soluta nobis ipsam cum corrupti excepturi, facere eos at explicabo.",
      "dp": "https://img.freepik.com/free-vector/young-hispanic-man-design-character-sketch-vector-illustration_460848-15739.jpg"
    },
    {
      "name": "zara_j",
      "review": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit doloremque, deleniti, mollitia vel facilis fugit soluta nobis ipsam cum corrupti excepturi, facere eos at explicabo.",
      "dp": "https://img.freepik.com/free-vector/thinking-serious-young-woman-tshirt-design-template_460848-14563.jpg"
    },
  ]);

  // Check if testimonials is an array before mapping
  if (!Array.isArray(testimonials)) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="h-56">
      <Swiper
        direction={'horizontal'}
        slidesPerView={1}
        spaceBetween={30}
        mousewheel={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          hiddenClass: true, // Hide pagination dots
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {
          testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className=' SwiperSlide rounded-xl themeGlassBg p-4 backdrop-blur-md'>
              <div className='themeGlassBg h-full w-full rounded-xl themeText p-2'>
                <div className="dp flex justify-center items-center flex-col">
                  <div className="w-16 md:w-20 h-16 md:h-20 rounded-full shadow-lg overflow-hidden text-sm animate-fade">
                    <img src={testimonial.dp} alt="Testimonial" className="object-fit" />
                  </div>
                  <div className="userName themeSpeText">
                    <span>@{testimonial.name}</span>
                  </div>
                </div>
                <div className="content text-[10px] md:text-md overflow-hidden text-ellipsis h-auto">
                  <p>
                    {testimonial.review}
                  </p>
                </div>
                <div className="user-rating dark:text-yellow-300 text-yellow-400 flex justify-center items-center mt-1">
                  <span className='flex justify-center items-center text-sm md:text-md'>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}

export default Testimonial;
