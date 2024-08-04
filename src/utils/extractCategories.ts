const extractUniqueCategories = (items: Post[]): string[] => {
  const categoriesSet = new Set<string>();

  try {
    items.forEach((item) => {
      if (item.category) {
        item.category.forEach((cat) => {
          categoriesSet.add(cat._);
        });
      }
    });
  } catch (error) {
    console.error("Error extracting unique categories:", error);
  }
  return Array.from(categoriesSet);
};

export default extractUniqueCategories;
