export function InputField<F extends Record<string, string>>({
  fields,
  name,
  type = "text",
  pattern,
  value,
  setValue,
  class: className = "",
  prefix = "",
  required = true,
  step,
}: {
  fields: F;
  name: string & keyof F;
  type?: React.HTMLInputTypeAttribute;
  pattern?: string;
  value: string;
  setValue: (value: string, element: HTMLInputElement) => void;
  class?: string;
  prefix?: string;
  required?: boolean;
  step?: number;
}) {
  return (
    <div className={"relative " + className}>
      <input
        required={required}
        placeholder=" "
        type={type}
        pattern={pattern}
        className="
          w-full py-2 px-1 leading-tight
          bg-transparent appearance-none
          text-white
          border-0 border-b-2
          placeholder-shown:border-white focus:border-white
          focus:outline-none
          peer
        "
        id={prefix + name}
        name={name}
        value={value}
        step={step}
        onChange={(e) => setValue(e.target.value, e.target)}
      />
      <label
        htmlFor={prefix + name}
        className="
          transform transition-all absolute top-0 left-0 -translate-y-full
          text-white peer-focus:text-white font-normal
          peer-focus:-translate-y-full peer-placeholder-shown:translate-y-0
          cursor-text autofill:bg-transparent uppercase
          md:peer-placeholder-shown:text-lg md:text-sm md:peer-focus:text-sm
          peer-placeholder-shown:text-xs text-[9px] peer-focus:text-[9px]
        "
      >
        {fields[name]}
      </label>
    </div>
  );
}

