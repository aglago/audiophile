import Image from "next/image";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Bringing you the <span className="text-primary">best</span> audio gear
            </h2>
            <p className="text-lg text-gray-600">
              Located at the heart of New York City, Audiophile is the premier store
              for high-end headphones, earphones, speakers, and audio accessories.
              We have a large showroom and luxury demonstration rooms available for
              you to browse and experience a wide range of our products. Stop by our
              store to meet some of the fantastic people who make Audiophile the best
              place to buy your portable audio equipment.
            </p>
          </div>

          {/* Image */}
          <div className="relative h-64 lg:h-80">
            <Image
              src="/about-image.jpg"
              alt="About Audiophile"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
