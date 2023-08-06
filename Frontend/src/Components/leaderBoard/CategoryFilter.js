import React from "react";

const CategoryFilter = ({ selectedCategory, handleCategoryChange }) => {
  const categories = ["", "science", "sports", "general_knowledge"];

  return (
    <div className="filter-container">
      <h2>Filter Leaderboards by Category:</h2>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category ? category.replace("_", " ") : "Select Category"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
