import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../utils/api";

export default function SearchInput() {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{ value: string; label: string }> | undefined
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults(query: string) {
      try {
        const searchData = await searchProducts(query);
        setSearchResults(searchData.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const optionList =
    searchResults.length > 0
      ? searchResults.map((product: { id: number; title: string }) => ({
          value: product.id.toString(),
          label: product.title,
        }))
      : [];

  function handleSelect(
    data: MultiValue<{ value: string; label: string }> | undefined
  ) {
    setSelectedOptions(data);

    if (data && data.length > 0) {
      navigate("/all-products");
    }
  }

  return (
    <div className="app  sm:w-[20vh] lg:w-[50vh] ">
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Search Product"
          value={selectedOptions}
          onChange={handleSelect}
          onInputChange={(inputValue) => setSearchQuery(inputValue)}
          isSearchable={true}
          isMulti={true}
        />
      </div>
    </div>
  );
}
