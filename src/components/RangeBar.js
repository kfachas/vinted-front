import InputRange from "react-input-range";

import "react-input-range/lib/css/index.css";

const RangeBar = ({ ranges, onChange }) => {
  const { price } = ranges;
  const onChange2 = (value) => {
    onChange({
      type: ranges.price.label,
      value: value,
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
