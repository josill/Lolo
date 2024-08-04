const extractUniqueCategories = (items: Post[]): string[] => {
  const categoriesSet = new Set<string>();

  items.forEach((item) => {
    if (item.category) {
      item.category.forEach((cat) => {
        categoriesSet.add(cat._);
      });
    }
  });

  return Array.from(categoriesSet);
};

export default extractUniqueCategories;
