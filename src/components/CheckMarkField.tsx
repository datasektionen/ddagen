import { CheckMark } from "./CheckMark";

export function CheckMarkField<F extends Record<string, string>>({
  fields,
  name,
  class: className = "",
  prefix = "",
  onChange = ()=>{},
  checked,
  defaultChecked,
  onClick,
}: {
  fields: F;
  name: string & keyof F;
  type?: React.HTMLInputTypeAttribute;
  pattern?: string;
  class?: string;
  prefix?: string;
  required?: boolean;
  step?: number;
  disabled?: boolean,
  onChange?: () => void;
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: () => void;
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
      <CheckMark 
          name={name}
          id={prefix + name}
          checked={checked}
          defaultChecked={defaultChecked}
          onClick={onClick}
          onChange={onChange}
          />
    </div>
  );
}

