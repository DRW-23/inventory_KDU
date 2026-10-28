// ============================================================
// KDU Asset Tracker – FacultyBadge Component
// ============================================================

interface FacultyBadgeProps {
  faculty: string;
  department: string;
}

const FACULTY_CLASS_MAP: Record<string, string> = {
  FOC: 'faculty-foc',
  FAHS: 'faculty-fahs',
  FDSS: 'faculty-fdss',
  FOE: 'faculty-foe',
  FOCJ: 'faculty-focj',
  FMSH: 'faculty-fmsh',
  OM: 'faculty-om',
  ED: 'faculty-ed',
};

export function FacultyBadge({ faculty, department }: FacultyBadgeProps) {
  const className = FACULTY_CLASS_MAP[faculty] || 'faculty-foc';

  return (
    <div>
      <span className={`faculty-badge ${className}`}>{faculty}</span>
      <div
        style={{
          marginTop: 4,
          fontSize: 11,
          color: 'rgba(255,255,255,0.55)',
          paddingLeft: 2,
        }}
      >
        {department}
      </div>
    </div>
  );
}
