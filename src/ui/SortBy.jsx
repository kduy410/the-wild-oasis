import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortValue = searchParams.get('sortBy') || options[0].value;
    function handleChange(event) {
        const value = event.target.value;
        searchParams.set('sortBy', value);
        setSearchParams(searchParams);
    }
    return (
        <Select options={options} type='white' onChange={handleChange} value={currentSortValue} />
    )
}

export default SortBy;