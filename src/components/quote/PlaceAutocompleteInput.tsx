import { useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin } from "lucide-react";
import {
  createPlacesSession,
  MIN_QUERY_LENGTH,
  type PlaceCoords,
  type PlaceSuggestion,
} from "@/lib/googlePlaces";

export type SelectedPlace = { label: string; coords: PlaceCoords };

type Props = {
  label: string;
  placeholder: string;
  /** null while the user is typing / nothing chosen. */
  onChange: (place: SelectedPlace | null) => void;
  disabled?: boolean;
};

const DEBOUNCE_MS = 300;

export default function PlaceAutocompleteInput({
  label,
  placeholder,
  onChange,
  disabled,
}: Props) {
  const inputId = useId();
  const session = useRef(createPlacesSession());
  // Ignore results from superseded requests (the Places SDK cannot abort).
  const requestSeq = useRef(0);

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [error, setError] = useState("");
  // The text of the confirmed selection, so edits can invalidate it.
  const [confirmedText, setConfirmedText] = useState<string | null>(null);

  useEffect(() => {
    const query = text.trim();
    if (query.length < MIN_QUERY_LENGTH || query === confirmedText) {
      setSuggestions([]);
      setSearching(false);
      return;
    }

    const seq = ++requestSeq.current;
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await session.current.search(query);
        if (seq !== requestSeq.current) return;
        setSuggestions(results);
        setOpen(true);
        setError("");
      } catch (e) {
        console.error(e);
        if (seq !== requestSeq.current) return;
        setSuggestions([]);
        setError("Address search is unavailable right now.");
      } finally {
        if (seq === requestSeq.current) setSearching(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [text, confirmedText]);

  const handleInput = (value: string) => {
    setText(value);
    setError("");
    if (confirmedText !== null) {
      setConfirmedText(null);
      onChange(null);
    }
  };

  const handleSelect = async (suggestion: PlaceSuggestion) => {
    requestSeq.current++; // drop any in-flight search
    setOpen(false);
    setSuggestions([]);
    setResolving(true);
    setError("");
    try {
      const coords = await session.current.resolve(suggestion);
      setText(suggestion.fullText);
      setConfirmedText(suggestion.fullText.trim());
      onChange({ label: suggestion.fullText, coords });
    } catch {
      setError("We couldn't get that location. Please pick another.");
      onChange(null);
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-semibold text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          id={inputId}
          type="text"
          value={text}
          maxLength={200}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          className="w-full py-2.5 pl-9 pr-9 text-sm bg-white border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100"
        />
        {(searching || resolving) && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 animate-spin" />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 w-full mt-1 overflow-hidden bg-white border border-gray-200 shadow-lg rounded-lg"
        >
          {suggestions.map((s) => (
            <li key={s.id} role="option" aria-selected={false}>
              <button
                type="button"
                // mousedown fires before the input blur closes the list
                onMouseDown={(e) => {
                  e.preventDefault();
                  void handleSelect(s);
                }}
                className="w-full px-3 py-2.5 text-left hover:bg-gray-50 cursor-pointer"
              >
                <span className="block text-sm font-medium text-gray-900">
                  {s.mainText}
                </span>
                {s.secondaryText && (
                  <span className="block text-xs text-gray-500">
                    {s.secondaryText}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      {text.trim().length > 0 && text.trim().length < MIN_QUERY_LENGTH && (
        <p className="mt-1 text-xs text-gray-500">
          Type at least {MIN_QUERY_LENGTH} characters.
        </p>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
