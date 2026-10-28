// ============================================================
// KDU Asset Tracker – FilterBar Component
// ============================================================
import { useMemo } from 'react';
import { Select, TextInput, Button, Group } from '@mantine/core';
import { IconSearch, IconPlus, IconFilter } from '@tabler/icons-react';
import { FACULTY_HIERARCHY, YEAR_RANGE } from '../data';

interface FilterBarProps {
  yearFilter: string;
  onYearChange: (val: string | null) => void;
  facultyFilter: string;
  onFacultyChange: (val: string | null) => void;
  departmentFilter: string;
  onDepartmentChange: (val: string | null) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onAddClick: () => void;
}

const darkInputStyles = {
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.9)',
  },
  label: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 500 as const,
    fontSize: 12,
    marginBottom: 4,
  },
  dropdown: {
    background: '#1a2150',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  option: {
    color: 'rgba(255,255,255,0.85)',
  },
};

export function FilterBar({
  yearFilter,
  onYearChange,
  facultyFilter,
  onFacultyChange,
  departmentFilter,
  onDepartmentChange,
  searchQuery,
  onSearchChange,
  onAddClick,
}: FilterBarProps) {
  const yearData = [
    { value: 'all', label: 'All Years' },
    ...YEAR_RANGE.map((y) => ({ value: String(y), label: String(y) })),
  ];

  const facultyData = [
    { value: 'all', label: 'All Faculties' },
    ...FACULTY_HIERARCHY.map((f) => ({
      value: f.shortCode,
      label: `${f.shortCode} – ${f.faculty}`,
    })),
  ];

  const departmentData = useMemo(() => {
    const items = [{ value: 'all', label: 'All Departments' }];
    if (facultyFilter && facultyFilter !== 'all') {
      const fac = FACULTY_HIERARCHY.find((f) => f.shortCode === facultyFilter);
      if (fac) {
        fac.departments.forEach((d) => items.push({ value: d, label: d }));
      }
    }
    return items;
  }, [facultyFilter]);

  return (
    <div className="filter-bar">
      <div className="glass-card-light" style={{ padding: '16px 20px' }}>
        <Group gap="sm" align="flex-end" wrap="wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,200,56,0.8)', marginRight: 4 }}>
            <IconFilter size={18} />
            <span style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Filters
            </span>
          </div>

          <Select
            label="Year"
            data={yearData}
            value={yearFilter}
            onChange={onYearChange}
            styles={darkInputStyles}
            size="sm"
            w={120}
          />

          <Select
            label="Faculty / Section"
            data={facultyData}
            value={facultyFilter}
            onChange={(val) => {
              onFacultyChange(val);
              onDepartmentChange('all');
            }}
            styles={darkInputStyles}
            size="sm"
            w={240}
            searchable
          />

          <Select
            label="Department"
            data={departmentData}
            value={departmentFilter}
            onChange={onDepartmentChange}
            disabled={!facultyFilter || facultyFilter === 'all'}
            styles={darkInputStyles}
            size="sm"
            w={240}
            searchable
          />

          <TextInput
            label="Search"
            placeholder="Search items, suppliers..."
            leftSection={<IconSearch size={14} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
            styles={darkInputStyles}
            size="sm"
            w={220}
          />

          <div style={{ flex: 1 }} />

          <Button
            leftSection={<IconPlus size={16} />}
            variant="gradient"
            gradient={{ from: '#1d58e0', to: '#4476e5' }}
            size="sm"
            onClick={onAddClick}
            style={{ marginBottom: 1 }}
          >
            Add New Record
          </Button>
        </Group>
      </div>
    </div>
  );
}
