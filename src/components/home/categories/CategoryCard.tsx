import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  onCategoryClick ?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, href, onCategoryClick }) => {
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      onClick={onCategoryClick} 
    >
      <div className="relative flex flex-col items-center justify-end bg-gray-100 rounded-lg p-6 sm:p-8 text-center h-40 sm:h-44 lg:h-52 transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
        {/* Image container */}
        <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
            <Image
              src={image}
              alt={`${name} category`}
              fill
              sizes="(max-width: 640px) 104px, 160px"
              className="object-contain transition-transform duration-300 scale-150 group-hover:scale-105"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
            {name}
          </h3>
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-black/50 group-hover:text-primary transition-colors duration-200">
            <span>Shop</span>
            <div className="w-2 h-2 relative">
              <Image
                alt="Arrow right"
                src="/assets/shared/desktop/icon-arrow-right.svg"
                fill
                className="object-contain transition-transform duration-200 group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
