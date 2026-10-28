// ============================================================
// KDU Asset Tracker – StatusBadge Component
// Cycles: Request → Pending → Accept
// ============================================================
import type { ApprovalStatus } from '../types';
import {
  IconCircleDot,
  IconClock,
  IconCircleCheck,
} from '@tabler/icons-react';

interface StatusBadgeProps {
  status: ApprovalStatus;
  onChange: (next: ApprovalStatus) => void;
  disabled?: boolean;
}

const NEXT_STATE: Record<ApprovalStatus, ApprovalStatus> = {
  Request: 'Pending',
  Pending: 'Accept',
  Accept: 'Request',
};

const STATUS_CONFIG: Record<ApprovalStatus, { className: string; icon: React.ReactNode }> = {
  Request: {
    className: 'status-badge status-request',
    icon: <IconCircleDot size={14} />,
  },
  Pending: {
    className: 'status-badge status-pending',
    icon: <IconClock size={14} />,
  },
  Accept: {
    className: 'status-badge status-accept',
    icon: <IconCircleCheck size={14} />,
  },
};

export function StatusBadge({ status, onChange, disabled }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const handleClick = () => {
    if (disabled) return;
    onChange(NEXT_STATE[status]);
  };

  return (
    <button
      className={config.className}
      onClick={handleClick}
      style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      title={`Click to change status (current: ${status})`}
    >
      {config.icon}
      {status}
    </button>
  );
}
