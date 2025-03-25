import { AdminSelect } from "./AdminSelect";

export function AdminSelectField<F extends Record<string, string>>({
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
          block mb-2 text-xl font-normal text-white dark:text-white tracking-wider
        "
      >
        {fields[name]}:
      </label>
      <AdminSelect 
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