import { Select } from "./Select";

export function SelectField<F extends Record<string, string>>({
  fields,
  name,
  class: className = "",
  prefix = "",
  options,
  values,
  value,
  setValue,
  onChange = ()=>{},
}: {
  fields: F;
  name: string & keyof F;
  type?: React.HTMLInputTypeAttribute;
  pattern?: string;
  class?: string;
  prefix?: string;
  options: string[];
  values: any[];
  value: any;
  setValue: (value: any) => void;
  required?: boolean;
  disabled?: boolean,
  onChange?: () => void;
}) {
  return (
    <div className={"relative " + className}>
      <label
        htmlFor={prefix + name}
        className="
          transform transition-all
          text-slate-400 peer-focus:text-cerise font-medium
          cursor-pointer autofill:bg-transparent uppercase
          md:text-lg text-xs text-[9px] pr-3
        "
      >
        {fields[name]}:
      </label>
      <Select 
          name={name}
          id={prefix + name}
          options={options}
          values={values}
          value={value}
          setValue={setValue}
          onChange={onChange}
          />
    </div>
  );
}

