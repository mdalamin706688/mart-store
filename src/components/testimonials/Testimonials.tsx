import React from 'react';

interface Testimonial {
  name: string;
  position: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="testimonials flex flex-col p-4 gap-8 my-4 sm:flex-row">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="rounded-md mb-4 sm:mb-0">
          <div className="">
            <img
              className="w-full sm:w-[50%] md:w-[80%] lg:w-[50%] h-[20vh] rounded-md mx-auto sm:mx-"
              src={testimonial.avatar}
              alt={testimonial.name}
            />
          </div>
          <div className="content">
            <p>{testimonial.content}</p>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name={`rating-${index}`}
                  className={`mask mask-star-2 bg-orange-400${
                    i < testimonial.rating ? ' checked' : ''
                  }`}
                  readOnly
                />
              ))}
            </div>
            <div className="info flex flex-col">
              <strong>{testimonial.name}</strong>
              <span>{testimonial.position}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
