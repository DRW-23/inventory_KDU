// ============================================================
// KDU Asset Tracker – CreatableSelect Component
// Mantine v9 compatible creatable dropdown
// ============================================================
import { useState, useEffect } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';

interface CreatableSelectProps {
  label?: string;
  placeholder?: string;
  data: string[];
  value: string;
  onChange: (value: string) => void;
  size?: string;
}

export function CreatableSelect({
  label,
  placeholder = 'Select or type...',
  data: initialData,
  value,
  onChange,
  size: _size,
}: CreatableSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState(value || '');

  useEffect(() => {
    setSearch(value || '');
  }, [value]);

  const exactOptionMatch = data.some((item) => item === search);
  const filteredOptions = exactOptionMatch
    ? data
    : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <div>
      {label && (
        <label
          style={{
            display: 'block',
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 500,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          {label}
        </label>
      )}
      <Combobox
        store={combobox}
        withinPortal
        onOptionSubmit={(val) => {
          if (val === '$create') {
            setData((current) => [...current, search]);
            onChange(search);
            setSearch(search);
          } else {
            onChange(val);
            setSearch(val);
          }
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            rightSection={<Combobox.Chevron />}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value || '');
            }}
            placeholder={placeholder}
            rightSectionPointerEvents="none"
            size="sm"
            styles={{
              input: {
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.9)',
              },
            }}
          />
        </Combobox.Target>

        <Combobox.Dropdown
          styles={{
            dropdown: {
              background: '#1a2150',
              border: '1px solid rgba(255,255,255,0.1)',
            },
          }}
        >
          <Combobox.Options>
            {options}

            {!exactOptionMatch && search.trim().length > 0 && (
              <Combobox.Option value="$create">
                <span style={{ color: '#ffc828' }}>+ Custom:</span> {search}
              </Combobox.Option>
            )}

            {options.length === 0 && !search.trim() && (
              <Combobox.Empty>No options available</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
