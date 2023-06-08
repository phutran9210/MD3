import { Checkbox } from "antd";

const CheckBoxTags = ({ onChange }) => {
  const onTagsChange = (checkedValues) => {
    onChange(checkedValues);
  };

  const options = [
    {
      label: "Java Script",
      value: "1",
    },
    {
      label: "Java Core",
      value: "2",
    },
    {
      label: "C",
      value: "3",
    },
    {
      label: "Node",
      value: "4",
    },
    {
      label: "Express",
      value: "5",
    },
    {
      label: "Python",
      value: "6",
    },
  ];

  return (
    <div>
      <Checkbox.Group options={options} onChange={onTagsChange} />
    </div>
  );
};

export default CheckBoxTags;
