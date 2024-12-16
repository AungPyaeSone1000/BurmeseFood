import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden w-full object-cover rounded-lg group aspect-video">
      <Link to={"/category" + category.href}>
        <div className="w-full h-auto cursor-pointer">
          <div className="absolute insert-0 bg-gradient-to-b from-transparent via-transparent to-black  z-10">
            <img
              src={category.imageUrl}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <h3 className="text-white text-2xl font-extrabold mb-2">
                {category.name}
              </h3>
              <p className="text-gray-100 font-bold text-sm">
                Click for more {category.name}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CategoryItem;
