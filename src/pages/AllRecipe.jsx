import React, { useEffect, useState } from "react";
import { getAllRecipe } from "../services/getAllRecipe";
import Recipe from "../components/Recipe";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Loading from "./shared/Loading";

const AllRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [category, country, searchQuery, recipes]);

  const fetchRecipes = async (pageNumber = 1) => {
    setIsLoading(true);
    const response = await getAllRecipe(pageNumber);
    const recipesData = response.data;

    if (recipesData.length === 0) {
      setHasMore(false);
    } else {
      setRecipes((prev) =>
        pageNumber === 1 ? recipesData : [...prev, ...recipesData]
      );
      setFilteredRecipes((prev) =>
        pageNumber === 1 ? recipesData : [...prev, ...recipesData]
      );
      extractCategoriesAndCountries(recipesData);
    }

    setIsLoading(false);
  };

  const extractCategoriesAndCountries = (recipesData) => {
    const categories = [
      ...new Set(recipesData.map((recipe) => recipe.category)),
    ];
    const countries = [...new Set(recipesData.map((recipe) => recipe.country))];

    setCategories(categories);
    setCountries(countries);
  };

  const filterRecipes = () => {
    let filtered = recipes;

    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    if (country) {
      filtered = filtered.filter((recipe) => recipe.country === country);
    }

    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRecipes(nextPage);
  };

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: loadMore,
    scrollContainer: "parent",
  });

  return (
    <div>
      <div className="flex space-x-4 mb-4 justify-center items-center">
        <label>
          <span className="block text-sm font-medium text-gray-700">
            Category:
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected value="">
              Select category
            </option>
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-gray-700">
            Country:
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected value="">
              Select country
            </option>
            <option value="">All</option>
            {countries.map((coun) => (
              <option key={coun} value={coun}>
                {coun}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-gray-700">
            Search:
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered w-full max-w-xs"
            placeholder="Search by title"
          />
        </label>
      </div>

      <div style={{ overflowY: "auto", height: "80vh" }}>
        {filteredRecipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
        {isLoading && <Loading />}
        <div ref={sentryRef} />
      </div>
    </div>
  );
};

export default AllRecipe;
