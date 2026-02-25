import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Alexander G.",
            role: "Buyer",
            text: "This platform has completely changed how I manage small tasks. Fast, reliable, and incredibly efficient!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "Sarah M.",
            role: "Worker",
            text: "I earn a steady income during my free time. The withdrawal process is smooth and the tasks are fun.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "John K.",
            role: "Worker",
            text: "The best micro-tasking site I've ever used. The interface is clean and the support team is very helpful.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "Emma W.",
            role: "Buyer",
            text: "Verified proofs and quality work. I highly recommend this for anyone looking to scale their operations.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
        }
    ];

    return (
        <div className="py-24 bg-gray-50 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Our Users Say</h2>
                    <p className="text-gray-500 italic max-w-xl mx-auto font-medium">Verified reviews from our global community of buyers and workers.</p>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="pb-16"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="bg-white p-10 rounded-3xl shadow-xl h-full flex flex-col items-center hover:scale-105 transition-transform duration-300">
                                <div className="mb-6">
                                    <div className="avatar">
                                        <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={t.image} alt={t.name} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-center italic mb-8 flex-grow leading-relaxed">"{t.text}"</p>
                                <div className="text-center">
                                    <h4 className="font-bold text-xl text-gray-900">{t.name}</h4>
                                    <span className="text-primary font-semibold text-sm">{t.role}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;
