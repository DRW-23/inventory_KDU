// ============================================================
// KDU Asset Tracker – StatsCards Component
// ============================================================
import type { AssetRecord } from '../types';
import {
  IconPackage,
  IconCurrencyDollar,
  IconCircleCheck,
  IconClock,
} from '@tabler/icons-react';

interface StatsCardsProps {
  records: AssetRecord[];
}

export function StatsCards({ records }: StatsCardsProps) {
  const totalRecords = records.length;
  const totalItems = records.reduce(
    (sum, r) => sum + r.items.reduce((s, item) => s + item.quantity, 0),
    0
  );
  const totalValue = records.reduce((sum, r) => sum + r.totalValue, 0);
  const pendingApprovals = records.filter(
    (r) => r.entryApproval === 'Pending' || r.removalApproval === 'Pending'
  ).length;

  const formatCurrency = (val: number) =>
    `Rs. ${val.toLocaleString('en-LK')}`;

  return (
    <div className="stats-grid">
      <div className="stat-card blue">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <IconPackage size={24} style={{ color: 'rgba(100, 150, 235, 0.6)' }} />
        </div>
        <div className="stat-card-value">{totalRecords}</div>
        <div className="stat-card-label">Total Records</div>
      </div>

      <div className="stat-card gold">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <IconCurrencyDollar size={24} style={{ color: 'rgba(255, 200, 56, 0.6)' }} />
        </div>
        <div className="stat-card-value">{formatCurrency(totalValue)}</div>
        <div className="stat-card-label">Total Asset Value</div>
      </div>

      <div className="stat-card green">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <IconCircleCheck size={24} style={{ color: 'rgba(34, 197, 94, 0.6)' }} />
        </div>
        <div className="stat-card-value">{totalItems}</div>
        <div className="stat-card-label">Total Item Units</div>
      </div>

      <div className="stat-card amber">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <IconClock size={24} style={{ color: 'rgba(251, 191, 36, 0.6)' }} />
        </div>
        <div className="stat-card-value">{pendingApprovals}</div>
        <div className="stat-card-label">Pending Approvals</div>
      </div>
    </div>
  );
}
