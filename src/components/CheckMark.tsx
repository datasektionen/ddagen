export function CheckMark({
  name,
  checked,
  defaultChecked,
  onClick,
}: {
  name: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: () => void;
}) {
  return (
    <input
      type="checkbox"
      className="form-checkbox w-6 h-6 hover:cursor-pointer hover:border-cerise
                bg-black/25 checked:text-cerise rounded-lg focus:ring-0
                border-2 border-yellow"
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onClick={() => {
        if (onClick) onClick();
      }}
    />
  );
}
