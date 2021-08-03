import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";

const RangeBar = ({ state, onChange }) => {
  const { price } = state;
  const onChange2 = (range) => {
    onChange({
      type: state.price.label,
      value: range,
    });
  };
  return (
    <div className="slider">
      <span>Prix entre : </span>
      <InputRange
        minValue={0}
        maxValue={500}
        step={1}
        onChange={onChange2}
        value={price.value}
      />
    </div>
  );
};

export default RangeBar;
