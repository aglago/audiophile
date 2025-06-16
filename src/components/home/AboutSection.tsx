import Image from "next/image";

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 md:py-24 lg:py-52">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse gap-12 items-center justify-center lg:justify-between">
          {/* Image */}
          <div className="relative h-80  w-[540px] lg:h-[588px]">
            <Image
              src="/assets/shared/desktop/image-best-gear.jpg"
              alt="About Audiophile"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6  max-w-[327px] lg:max-w-[445px] md:max-w-[573px] text-center lg:text-left">
            <h2 className="text-3xl lg:text-[40px] font-bold text-black tracking-[1px] leading-[38px] uppercase">
              Bringing you the <span className="text-primary">best</span> audio
              gear
            </h2>
            <p className="text-lg text-black/50">
              Located at the heart of New York City, Audiophile is the premier
              store for high-end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
