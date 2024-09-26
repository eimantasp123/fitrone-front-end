import PropTypes from "prop-types";
import { MdSearch } from "react-icons/md";

const OutlineSearchInput = ({ className, setSearchQuery, searchQuery }) => {
  return (
    <div
      className={`relative min-w-[200px] max-w-[650px] ${className} mx-auto`}
    >
      <div className="flex items-center">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <MdSearch className="text-xl text-textSecondary" />
        </div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          value={searchQuery}
          placeholder="Search for people"
          className="w-full rounded-full border bg-backgroundSecondary px-14 py-2 placeholder-textSecondary outline-none transition-all duration-300 ease-out focus:border-borderPrimary focus:shadow-custom-light2"
        />
      </div>
    </div>
  );
};

OutlineSearchInput.propTypes = {
  className: PropTypes.string,
  setSearchQuery: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default OutlineSearchInput;
