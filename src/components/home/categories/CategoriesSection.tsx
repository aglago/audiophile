import CategoryCard from "./CategoryCard";

interface CategoriesSectionProps {
  onCategoryClick?: () => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onCategoryClick }) => {
  interface Category {
    name: string;
    image: string;
    href: string;
  }

  const categories: Category[] = [
    {
      name: "Headphones",
      image:
        "/assets/shared/desktop/image-category-thumbnail-headphones.png",
      href: "/products?category=headphones",
    },
    {
      name: "Speakers",
      image:
        "/assets/shared/desktop/image-category-thumbnail-speakers.png",
      href: "/products?category=speakers",
    },
    {
      name: "Earphones",
      image:
        "/assets/shared/desktop/image-category-thumbnail-earphones.png",
      href: "/products?category=earphones",
    },
  ];

  return (
    <section className="pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-2 lg:gap-7">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              image={category.image}
              href={category.href}
              onCategoryClick={onCategoryClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
