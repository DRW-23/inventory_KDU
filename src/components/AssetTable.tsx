// ============================================================
// KDU Asset Tracker – AssetTable Component
// Grouped multi-item rows with interactive controls
// ============================================================
import { Select } from '@mantine/core';
import type { AssetRecord, ApprovalStatus, RemovalReason, ViewMode } from '../types';
import { StatusBadge } from './StatusBadge';
import { FacultyBadge } from './FacultyBadge';

interface AssetTableProps {
  records: AssetRecord[];
  onUpdateRecord: (id: string, updates: Partial<AssetRecord>) => void;
  viewMode: ViewMode;
}

const formatCurrency = (val: number) => `Rs. ${val.toLocaleString('en-LK')}`;

const REMOVAL_OPTIONS = [
  { value: '', label: '— None —' },
  { value: 'අස්ථානගතවීම්', label: 'අස්ථානගතවීම් (Lost)' },
  { value: 'අලාභ හානි වීම්', label: 'අලාභ හානි වීම් (Damaged)' },
  { value: 'කල් ඉකුත් වීම්', label: 'කල් ඉකුත් වීම් (Expired)' },
];

// Column visibility per view mode
const COLUMN_VISIBILITY: Record<ViewMode, Record<string, boolean>> = {
  ledger: {
    index: true, receipt: true, ledgerDate: true, billDate: true,
    supplier: true, items: true, qty: true, model: true, warranty: true,
    unitPrice: true, total: true, faculty: true, issuedDate: true,
    officer: true, entryApproval: true, removal: true, removalApproval: true,
    codeNo: true,
  },
  payments: {
    index: true, receipt: true, ledgerDate: false, billDate: true,
    supplier: true, items: true, qty: true, model: false, warranty: false,
    unitPrice: true, total: true, faculty: true, issuedDate: false,
    officer: false, entryApproval: false, removal: false, removalApproval: false,
    codeNo: true,
  },
  faculty: {
    index: true, receipt: true, ledgerDate: true, billDate: false,
    supplier: true, items: true, qty: true, model: true, warranty: true,
    unitPrice: true, total: true, faculty: true, issuedDate: true,
    officer: true, entryApproval: true, removal: true, removalApproval: true,
    codeNo: true,
  },
  approval: {
    index: true, receipt: true, ledgerDate: true, billDate: false,
    supplier: true, items: true, qty: true, model: false, warranty: false,
    unitPrice: false, total: true, faculty: true, issuedDate: false,
    officer: true, entryApproval: true, removal: true, removalApproval: true,
    codeNo: false,
  },
};

interface ColumnDef {
  key: string;
  english: string;
  sinhala: string;
}

const COLUMNS: ColumnDef[] = [
  { key: 'index', english: 'Index No', sinhala: 'අනු අංකය' },
  { key: 'receipt', english: 'Receipt No', sinhala: 'ලැබීම් අංකය' },
  { key: 'ledgerDate', english: 'Ledger Date', sinhala: 'ලෙජර් දිනය' },
  { key: 'billDate', english: 'Bill Date', sinhala: 'බිල් දිනය' },
  { key: 'supplier', english: 'Supplier', sinhala: 'භාණ්ඩ මිළ දී ගත් ආයතනය' },
  { key: 'items', english: 'Item Name', sinhala: 'භාණ්ඩ නාමාවලිය' },
  { key: 'qty', english: 'Qty', sinhala: 'ප්‍රමාණය' },
  { key: 'model', english: 'Model / Serial', sinhala: 'මාදිලිය / ඛාණ්ඩ අංකය' },
  { key: 'warranty', english: 'Warranty', sinhala: 'වගකීම් කාල' },
  { key: 'unitPrice', english: 'Unit Price', sinhala: 'ඒකක වටිනාකම' },
  { key: 'total', english: 'Total Value', sinhala: 'මුළු වටිනාකම' },
  { key: 'faculty', english: 'Faculty / Section', sinhala: 'නිකුත් කළ ආයතනය/ පීඨය' },
  { key: 'issuedDate', english: 'Issued Date', sinhala: 'නිකුත් කළ දිනය' },
  { key: 'officer', english: 'QM Officer', sinhala: 'භකාස නිළධාරී' },
  { key: 'entryApproval', english: 'Entry Approval', sinhala: 'ඇතුළත් කිරීම සහතික කිරීම' },
  { key: 'removal', english: 'Stock Removal', sinhala: 'තොගයෙන් ඉවත් කිරීම' },
  { key: 'removalApproval', english: 'Removal Approval', sinhala: 'ඉවත් කිරීම සහතික කිරීම' },
  { key: 'codeNo', english: 'CODE NO', sinhala: '' },
];

export function AssetTable({ records, onUpdateRecord, viewMode }: AssetTableProps) {
  const vis = COLUMN_VISIBILITY[viewMode];
  const visibleCols = COLUMNS.filter((col) => vis[col.key]);

  const handleEntryApprovalChange = (recordId: string, next: ApprovalStatus) => {
    onUpdateRecord(recordId, { entryApproval: next });
  };

  const handleRemovalReasonChange = (recordId: string, value: string | null) => {
    onUpdateRecord(recordId, { removalReason: (value || '') as RemovalReason });
  };

  const handleRemovalApprovalChange = (recordId: string, next: ApprovalStatus) => {
    onUpdateRecord(recordId, { removalApproval: next });
  };

  if (records.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 16,
        }}
      >
        No records found matching the current filters.
      </div>
    );
  }

  return (
    <div className="asset-table-wrapper">
      <table className="asset-table">
        <thead>
          <tr>
            {visibleCols.map((col) => (
              <th key={col.key}>
                {col.english}
                {col.sinhala && <span className="th-sinhala">{col.sinhala}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) =>
            record.items.map((item, itemIdx) => {
              const isFirst = itemIdx === 0;
              const itemCount = record.items.length;

              return (
                <tr
                  key={`${record.id}-${itemIdx}`}
                  className={`${isFirst ? 'group-first' : 'sub-item-row'}`}
                >
                  {/* Shared cells (row-spanning) */}
                  {isFirst && vis.index && (
                    <td className="span-cell" rowSpan={itemCount} style={{ fontWeight: 700, fontSize: 15 }}>
                      {record.indexNumber}
                    </td>
                  )}
                  {isFirst && vis.receipt && (
                    <td className="span-cell" rowSpan={itemCount} style={{ fontSize: 12, fontWeight: 500 }}>
                      {record.receiptNumber}
                    </td>
                  )}
                  {isFirst && vis.ledgerDate && (
                    <td className="span-cell" rowSpan={itemCount}>{record.ledgerDate}</td>
                  )}
                  {isFirst && vis.billDate && (
                    <td className="span-cell" rowSpan={itemCount}>{record.billDate}</td>
                  )}
                  {isFirst && vis.supplier && (
                    <td className="span-cell" rowSpan={itemCount} style={{ maxWidth: 180, fontSize: 12 }}>
                      {record.supplier}
                    </td>
                  )}

                  {/* Per-item cells */}
                  {vis.items && <td style={{ fontSize: 12 }}>{item.itemName}</td>}
                  {vis.qty && (
                    <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.quantity}</td>
                  )}
                  {vis.model && (
                    <td style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{item.model}</td>
                  )}
                  {vis.warranty && <td>{item.warrantyPeriod}</td>}
                  {vis.unitPrice && (
                    <td className="currency">{formatCurrency(item.unitPrice)}</td>
                  )}

                  {/* Shared cells continued */}
                  {isFirst && vis.total && (
                    <td className="span-cell currency-total" rowSpan={itemCount}>
                      {formatCurrency(record.totalValue)}
                    </td>
                  )}
                  {isFirst && vis.faculty && (
                    <td className="span-cell" rowSpan={itemCount}>
                      <FacultyBadge faculty={record.faculty} department={record.department} />
                    </td>
                  )}
                  {isFirst && vis.issuedDate && (
                    <td className="span-cell" rowSpan={itemCount}>{record.issuedDate}</td>
                  )}
                  {isFirst && vis.officer && (
                    <td className="span-cell" rowSpan={itemCount} style={{ fontSize: 12 }}>
                      {record.quartermasterOfficer}
                    </td>
                  )}

                  {/* Workflow columns */}
                  {isFirst && vis.entryApproval && (
                    <td className="span-cell" rowSpan={itemCount}>
                      <StatusBadge
                        status={record.entryApproval}
                        onChange={(next) => handleEntryApprovalChange(record.id, next)}
                      />
                    </td>
                  )}
                  {isFirst && vis.removal && (
                    <td className="span-cell" rowSpan={itemCount}>
                      <Select
                        data={REMOVAL_OPTIONS}
                        value={record.removalReason}
                        onChange={(val) => handleRemovalReasonChange(record.id, val)}
                        size="xs"
                        placeholder="Select..."
                        styles={{
                          input: {
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: 11,
                            minWidth: 140,
                          },
                          dropdown: {
                            background: '#1a2150',
                            border: '1px solid rgba(255,255,255,0.1)',
                          },
                          option: {
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: 12,
                          },
                        }}
                      />
                    </td>
                  )}
                  {isFirst && vis.removalApproval && (
                    <td className="span-cell" rowSpan={itemCount}>
                      <StatusBadge
                        status={record.removalApproval}
                        onChange={(next) => handleRemovalApprovalChange(record.id, next)}
                        disabled={!record.removalReason}
                      />
                    </td>
                  )}
                  {isFirst && vis.codeNo && (
                    <td className="span-cell" rowSpan={itemCount} style={{ fontFamily: 'monospace', fontSize: 11 }}>
                      {record.codeNo}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
