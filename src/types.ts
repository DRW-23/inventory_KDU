// ============================================================
// KDU Asset Tracker – Data Types
// ============================================================

/** A single item line within a ledger record */
export interface AssetItem {
  itemName: string;       // භාණ්ඩ නාමාවලිය
  quantity: number;       // ප්රමාණය
  model: string;          // මාදිලිය/ ඛාණ්ඩ අංකය
  warrantyPeriod: string; // වගකීම් කාල
  unitPrice: number;      // ඒකක වටිනාකම
}

/** Approval workflow states */
export type ApprovalStatus = 'Request' | 'Pending' | 'Accept';

/** Stock removal reasons */
export type RemovalReason = '' | 'අස්ථානගතවීම්' | 'අලාභ හානි වීම්' | 'කල් ඉකුත් වීම්';

/** A single ledger record that may contain multiple items */
export interface AssetRecord {
  id: string;                         // internal unique key
  indexNumber: number;                // අනු අංකය
  receiptNumber: string;             // ලැබීම් අංකය
  ledgerDate: string;                // ලෙජර් දිනය  (YYYY.MM.DD)
  billDate: string;                  // බිල් දිනය    (YYYY.MM.DD)
  supplier: string;                  // භාණ්ඩ මිළ දී ගත් ආයතනය
  items: AssetItem[];                // 1-to-many item rows
  totalValue: number;                // මුළු වටිනාකම  (auto-calculated)
  faculty: string;                   // නිකුත් කළ ආයතනය/ පීඨය (top level)
  department: string;                // sub-department or intake
  issuedDate: string;                // නිකුත් කළ දිනය
  quartermasterOfficer: string;      // භකාස නිළධාරී
  entryApproval: ApprovalStatus;     // ඇතුළත් කිරීම සහතික කිරීම
  removalReason: RemovalReason;      // තොගයෙන් ඉවත් කිරීම
  removalApproval: ApprovalStatus;   // ඉවත් කිරීම සහතික කිරීම
  codeNo: string;                    // CODE NO
  year: number;                      // acquisition year for filtering
}

/** Faculty → Department hierarchy */
export interface FacultyDepartment {
  faculty: string;
  shortCode: string;
  departments: string[];
}

/** View mode for role simulation */
export type ViewMode = 'ledger' | 'payments' | 'faculty' | 'approval';
