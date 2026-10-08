import { useId } from "react";
import { ITEM_OPTIONS } from "@/helper/itemTypes";

type Props = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export default function ItemTypeSelect({ value, onChange }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-gray-900">
        What are you sending?{" "}
        <span className="text-xs font-normal text-gray-400">(Optional)</span>
      </label>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="w-full px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      >
        <option value="">Select item type</option>
        {ITEM_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-gray-500">
        Pick one to see which vehicle we recommend.
      </p>
    </div>
  );
}
