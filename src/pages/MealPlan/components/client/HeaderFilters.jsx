import LinkButton from "../../../../components/common/LinkButton";
import TextButton from "../../../../components/common/TextButton";
import PropTypes from "prop-types";
import CustomerSelect from "../../../../components/common/CustomSelect";

export default function HeaderFilters({ options }) {
  return (
    <>
      <div className="z-20 flex w-full flex-col gap-4 px-4 py-3 lg:flex-row lg:items-end">
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-1 xl:grid-cols-3 xl:grid-rows-1">
          <CustomerSelect
            options={options}
            title="City"
            defaultOption="Šiauliai"
          />
          <CustomerSelect
            options={options}
            title="Dietary Preferences"
            defaultOption="Vegetarian"
          />
          <CustomerSelect
            options={options}
            title="Restrictions"
            defaultOption="No-preference"
          />
        </div>
        <div className="flex w-fit items-end justify-end gap-2 md:h-full">
          <TextButton text="Apply filters" primary={true} />
          <LinkButton text="Reset filters" className="px-6 py-2" />
        </div>
      </div>
    </>
  );
}

HeaderFilters.propTypes = {
  options: PropTypes.array.isRequired,
};
