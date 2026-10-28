// ============================================================
// KDU Asset Tracker – Main App Component
// ============================================================
import { useState, useMemo, useCallback } from 'react';
import { useDisclosure } from '@mantine/hooks';
import type { AssetRecord, ViewMode } from './types';
import { MOCK_DATA } from './data';
import { FilterBar } from './components/FilterBar';
import { ViewSwitcher } from './components/ViewSwitcher';
import { AssetTable } from './components/AssetTable';
import { StatsCards } from './components/StatsCards';
import { AddRecordModal } from './components/AddRecordModal';
import { notifications } from '@mantine/notifications';
import {
  IconShieldCheck,
  IconCheck,
} from '@tabler/icons-react';

export default function App() {
  // ── State ──
  const [records, setRecords] = useState<AssetRecord[]>(MOCK_DATA);
  const [yearFilter, setYearFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('ledger');
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);

  // ── Derived: next index ──
  const nextIndex = useMemo(() => {
    const maxIdx = records.reduce((max, r) => Math.max(max, r.indexNumber), 0);
    return maxIdx + 1;
  }, [records]);

  // ── Filtering Logic ──
  const filteredRecords = useMemo(() => {
    let result = records;

    // Year filter
    if (yearFilter !== 'all') {
      result = result.filter((r) => r.year === parseInt(yearFilter));
    }

    // Faculty filter
    if (facultyFilter !== 'all') {
      result = result.filter((r) => r.faculty === facultyFilter);
    }

    // Department filter
    if (departmentFilter !== 'all') {
      result = result.filter((r) => r.department === departmentFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.supplier.toLowerCase().includes(q) ||
          r.receiptNumber.toLowerCase().includes(q) ||
          r.codeNo.toLowerCase().includes(q) ||
          r.items.some(
            (item) =>
              item.itemName.toLowerCase().includes(q) ||
              item.model.toLowerCase().includes(q)
          )
      );
    }

    // View mode filters
    if (viewMode === 'approval') {
      result = result.filter(
        (r) => r.entryApproval === 'Pending' || r.removalApproval === 'Pending'
      );
    }

    return result;
  }, [records, yearFilter, facultyFilter, departmentFilter, searchQuery, viewMode]);

  // ── Handlers ──
  const handleUpdateRecord = useCallback(
    (id: string, updates: Partial<AssetRecord>) => {
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
      );

      if (updates.entryApproval) {
        notifications.show({
          title: 'Entry Approval Changed',
          message: `Status updated to "${updates.entryApproval}"`,
          color: updates.entryApproval === 'Accept' ? 'teal' : updates.entryApproval === 'Pending' ? 'yellow' : 'blue',
          autoClose: 2500,
        });
      }
      if (updates.removalApproval) {
        notifications.show({
          title: 'Removal Approval Changed',
          message: `Status updated to "${updates.removalApproval}"`,
          color: updates.removalApproval === 'Accept' ? 'teal' : updates.removalApproval === 'Pending' ? 'yellow' : 'blue',
          autoClose: 2500,
        });
      }
      if (updates.removalReason) {
        notifications.show({
          title: 'Stock Removal Flagged',
          message: `Reason: ${updates.removalReason}`,
          color: 'orange',
          autoClose: 2500,
        });
      }
    },
    []
  );

  const handleAddRecord = useCallback((record: AssetRecord) => {
    setRecords((prev) => [record, ...prev]);
    notifications.show({
      title: 'Record Saved Successfully',
      message: `Index #${record.indexNumber} (${record.supplier}) added to ledger with ${record.items.length} item(s).`,
      color: 'teal',
      icon: <IconCheck size={16} />,
      autoClose: 4000,
    });
  }, []);

  return (
    <>
      {/* ── App Header ── */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <div className="header-logo">KDU</div>
            <div className="header-title-group">
              <h1 className="header-title">KDU Asset Tracker</h1>
              <span className="header-subtitle">
                බැරැක්ක ස්ථාවර භාණ්ඩ · Inventory Management System
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <IconShieldCheck size={18} style={{ color: 'rgba(255,200,56,0.8)' }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                General Sir John Kotelawala Defence University
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── View Switcher ── */}
      <div style={{ padding: '20px 32px 0', maxWidth: 1800, margin: '0 auto' }}>
        <ViewSwitcher value={viewMode} onChange={setViewMode} />
      </div>

      {/* ── Filter Bar ── */}
      <FilterBar
        yearFilter={yearFilter}
        onYearChange={(val) => setYearFilter(val || 'all')}
        facultyFilter={facultyFilter}
        onFacultyChange={(val) => setFacultyFilter(val || 'all')}
        departmentFilter={departmentFilter}
        onDepartmentChange={(val) => setDepartmentFilter(val || 'all')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={openModal}
      />

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Stats */}
        <StatsCards records={filteredRecords} />

        {/* Table */}
        <AssetTable
          records={filteredRecords}
          onUpdateRecord={handleUpdateRecord}
          viewMode={viewMode}
        />
      </main>

      {/* ── Add Record Modal ── */}
      <AddRecordModal
        opened={modalOpened}
        onClose={closeModal}
        onAdd={handleAddRecord}
        nextIndex={nextIndex}
      />
    </>
  );
}
