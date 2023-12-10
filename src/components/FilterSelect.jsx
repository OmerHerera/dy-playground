import Select from 'react-select';
import { products } from '../utils/products';
import { useEffect } from 'react';

const options = [
    { value: "sofa", label: "Sofa" },
    { value: "chair", label: "Chair" },
    { value: "watch", label: "Watch" },
    { value: "mobile", label: "Mobile" },
    { value: "wireless", label: "Wireless" },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: "#0f3460",
        color: "white",
        borderRadius: "5px",
        border: "none",
        boxShadow: "none",
        width: "200px",
        height: "40px",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#0f3460" : "white",
        color: state.isSelected ? "white" : "#0f3460",
        "&:hover": {
        backgroundColor: "#0f3460",
        color: "white",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "white",
    }),
};

const FilterSelect = ({ setFilterList, setRecommendationContextApp }) => {
    function getDefault() {
        const url = new URL(window.location);
        const categoryFromURL = url.searchParams.get('category') || '';
        const value = url.searchParams.get('category') || ''
        const label = `${categoryFromURL.charAt(0).toUpperCase()}${categoryFromURL.slice(1)}`
        let selected = null;
        if (value) {
            selected = {
                value,
                label
            };
        };
        return selected || { value: "", label: "Filter By Category" };
    }

    useEffect(() => {
        const def = getDefault();
        def && handleChange(def);
    }, []);

    const handleChange = (selectedOption) => {
        selectedOption.value && setFilterList(products.filter(item => item.category === selectedOption.value))
        const url = new URL(window.location);
        url.searchParams.set("category", selectedOption.value);
        // eslint-disable-next-line
        selectedOption?.value && history.pushState({}, "", url);
        selectedOption?.value && setRecommendationContextApp({ type: 'CATEGORY' });
    }
    return (
        <Select
            options={options}
            defaultValue={getDefault()}
            styles={customStyles}
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
