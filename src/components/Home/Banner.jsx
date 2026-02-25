import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    const bannerItems = [
        {
            title: "Earn Coins by Completing Simple Tasks",
            description: "Join thousands of workers earning daily by watching videos, testing apps, and more.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
        },
        {
            title: "Post Tasks and Get Things Done Fast",
            description: "Found a task? Our worldwide community of workers is ready to help you instantly.",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Secure Payments & 24/7 Support",
            description: "With Stripe integration and our support team, your transactions are safe and easy.",
            image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <div className="relative h-[500px] lg:h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl my-6">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="h-full w-full"
            >
                {bannerItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative h-full w-full flex items-center justify-center bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.image})` }}
                        >
                            <div className="text-center text-white px-6 max-w-4xl animate-fade-in-up">
                                <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                                    {item.title}
                                </h1>
                                <p className="text-lg lg:text-xl mb-10 opacity-90 leading-relaxed font-light">
                                    {item.description}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button className="btn btn-primary btn-lg px-8 text-white rounded-full transition-all hover:scale-105 active:scale-95">Get Started</button>
                                    <button className="btn btn-outline btn-lg px-8 text-white rounded-full border-white/30 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
