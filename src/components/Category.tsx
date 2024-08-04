import React from "react";

interface CategoryProps {
  category: string;
  isSelected: boolean;
  onClick: (category: string) => void;
}

function Category({ category, isSelected, onClick }: CategoryProps) {
  return (
    <span
      onClick={() => onClick(category)}
      className={`cursor-pointer px-4 py-2 rounded-lg mb-2 ${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
      }`}
    >
      {category}
    </span>
  );
}

export default Category;
