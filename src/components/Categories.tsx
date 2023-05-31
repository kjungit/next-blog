import React from "react";

type Props = {
  categories: string[];
  selected: string;
  onClick: (category: string) => void;
};

function Categories({ categories, selected, onClick }: Props) {
  return (
    <section className="p-4 text-center">
      <h2 className="p-1 mb-1 text-lg font-bold border-b border-sky-500">
        Category
      </h2>
      <ul>
        {categories.map((category) => (
          <li
            className={`cursor-pointer hover:text-sky-500 ${
              category === selected && "text-sky-500 font-bold"
            }`}
            key={category}
            onClick={() => onClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Categories;
