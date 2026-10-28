// ============================================================
// KDU Asset Tracker – ViewSwitcher Component
// Simulates role-based views without authentication
// ============================================================
import { SegmentedControl } from '@mantine/core';
import {
  IconLayoutList,
  IconReceipt,
  IconBuildingBank,
  IconShieldCheck,
} from '@tabler/icons-react';
import type { ViewMode } from '../types';

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <div className="view-tabs">
      <SegmentedControl
        value={value}
        onChange={(val) => onChange(val as ViewMode)}
        data={[
          {
            value: 'ledger',
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px' }}>
                <IconLayoutList size={16} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Full Ledger</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>Log Office View</div>
                </div>
              </div>
            ),
          },
          {
            value: 'payments',
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px' }}>
                <IconReceipt size={16} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Payments</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>Bursar's Office</div>
                </div>
              </div>
            ),
          },
          {
            value: 'faculty',
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px' }}>
                <IconBuildingBank size={16} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>Faculty Goods</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>Section View</div>
                </div>
              </div>
            ),
          },
          {
            value: 'approval',
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px' }}>
                <IconShieldCheck size={16} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>VC Approval Queue</div>
                  <div style={{ fontSize: 10, opacity: 0.6 }}>Vice Chancellor's Office</div>
                </div>
              </div>
            ),
          },
        ]}
        styles={{
          root: {
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            padding: 4,
          },
          indicator: {
            background: 'linear-gradient(135deg, rgba(29, 88, 224, 0.4), rgba(29, 88, 224, 0.2))',
            borderRadius: 10,
            boxShadow: '0 2px 8px rgba(29, 88, 224, 0.3)',
          },
          label: {
            color: 'rgba(255,255,255,0.6)',
            fontWeight: 500,
            '&[data-active]': {
              color: '#fff !important',
            },
          },
          control: {
            border: 'none',
          },
        }}
        fullWidth
      />
    </div>
  );
}
