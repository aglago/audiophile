import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const FeaturedProductsSection = () => {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-32 md:pb-24 lg:pb-52">
        <div className="space-y-6 lg:space-y-8">
          {/* ZX9 Speaker - Hero Featured Product */}
          <div className="relative bg-primary rounded-lg overflow-hidden min-h-[600px] lg:min-h-[560px] flex items-center justify-center">
            {/* Background Pattern */}
            <div className="absolute inset-0">
              {/* Circular pattern rings */}
              <Image
                alt="pattern circles"
                src="/assets/home/desktop/pattern-circles.svg"
                width={300}
                height={300}
                className="absolute -top-7 md:-top-36 lg:-bottom-10 lg:-left-1/5 h-auto w-full scale-150 md:scale-100"
              />
            </div>

            <div className="relative z-10 flex flex-1 flex-col lg:flex-row lg:items-center h-full">
              {/* Product Image */}
              <div className="flex-1 flex justify-center items-end lg:items-center pt-12 lg:pt-0 pb-8 lg:pb-0">
                <div className="relative lg:absolute lg:-bottom-[100px] w-48 h-64 sm:w-56 sm:h-72 lg:w-80 lg:h-96">
                  <Image
                    src="/assets/home/desktop/image-speaker-zx9.png"
                    alt="ZX9 Speaker"
                    fill
                    className="object-cover lg:scale-120"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left px-6 pb-12 lg:pb-0 lg:pr-16">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-wide">
                  ZX9
                  <br />
                  SPEAKER
                </h2>
                <p className="text-white/75 text-base sm:text-lg mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Upgrade to premium speakers that are phenomenally built to
                  deliver truly remarkable sound.
                </p>

                <Link href="/products/zx9-speaker">
                  <Button size={"lg"} variant={"secondary"}>See Product</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker */}
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden h-80 lg:h-96 
          bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] 
          md:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')] 
          lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')] 
          bg-center bg-cover bg-no-repeat"
          >
            <div className="relative z-10 flex items-center h-full">
              <div className="px-6 sm:px-12 lg:px-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 lg:mb-8 tracking-wide">
                  ZX7 SPEAKER
                </h2>
                <Link href="/products/zx7-speaker">
                  <Button size={"lg"} variant={"outline"}>See Product</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* YX1 Earphones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Image */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden h-64 lg:h-80">
              <Image
                src="/assets/home/mobile/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="bg-gray-100 rounded-lg flex items-center h-64 lg:h-80">
              <div className="px-6 sm:px-12 lg:px-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6 lg:mb-8 tracking-wide">
                  YX1 EARPHONES
                </h2>
                <Link href="/products/yx1-earphones">
                  <Button size={"lg"} variant={"outline"}>See Product</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
