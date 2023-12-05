import Select from "react-select";

export default function InputSelect({ options, onChange }) {
  return (
    <div>
      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: "0.9em",
          colors: {
            ...theme.colors,
            primary25: "#a8b2ff",
            primary: "#6065ff",
          },
        })}
        styles={{
          option: (provided) => ({
            ...provided,
          }),
          control: (provided) => ({
            ...provided,
            backgroundColor: "#ececff",
            borderColor: "#a8b2ff",
          }),
          singleValue: (provided) => ({
            ...provided,
          }),
          menu: (provided) => ({
            ...provided,
            overflow: "hidden",
          }),
          input: (provided) => ({
            ...provided,
            padding: "0.3em ",
          }),
          container: (provided) => ({
            ...provided,
          }),
          menuList: (provided) => ({
            ...provided,
            "::-webkit-scrollbar": {
              width: "6px",
              height: "0px",
            },
            "::-webkit-scrollbar-track": {
              background: "#a8b2ff",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#6065ff",
              borderRadius: "5px",
            },
            "::-webkit-scrollbar-thumb:hover": {
              background: "#3d44ff",
            },
          }),
        }}
        placeholder="Selecioner una opcion"
        options={options}
        onChange={onChange}
      />
    </div>
  );
}
