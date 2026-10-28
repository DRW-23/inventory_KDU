// ============================================================
// KDU Asset Tracker – AddRecordModal Component
// ============================================================
import { useState, useMemo } from 'react';
import {
  Modal,
  TextInput,
  Select,
  Button,
  Group,
  Grid,
  Divider,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconPlus,
  IconTrash,
  IconDeviceFloppy,
} from '@tabler/icons-react';
import type { AssetRecord, AssetItem } from '../types';
import { FACULTY_HIERARCHY, OFFICERS, WARRANTY_PRESETS } from '../data';
import { QuantityStepper } from './QuantityStepper';
import { CreatableSelect } from './CreatableSelect';

interface AddRecordModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (record: AssetRecord) => void;
  nextIndex: number;
}

const EMPTY_ITEM: AssetItem = {
  itemName: '',
  quantity: 1,
  model: '',
  warrantyPeriod: '',
  unitPrice: 0,
};

const darkInputStyles = {
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.9)',
  },
  label: {
    color: 'rgba(255,255,255,0.7)',
    fontWeight: 500 as const,
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

export function AddRecordModal({ opened, onClose, onAdd, nextIndex }: AddRecordModalProps) {
  const [receiptNumber, setReceiptNumber] = useState('');
  const [ledgerDate, setLedgerDate] = useState<string | null>(null);
  const [billDate, setBillDate] = useState<string | null>(null);
  const [supplier, setSupplier] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [officer, setOfficer] = useState<string | null>(null);
  const [codeNo, setCodeNo] = useState('');
  const [items, setItems] = useState<AssetItem[]>([{ ...EMPTY_ITEM }]);

  // Faculty dropdown data
  const facultyData = FACULTY_HIERARCHY.map((f) => ({
    value: f.shortCode,
    label: `${f.shortCode} – ${f.faculty}`,
  }));

  // Department dropdown (cascaded)
  const departmentData = useMemo(() => {
    if (!selectedFaculty) return [];
    const fac = FACULTY_HIERARCHY.find((f) => f.shortCode === selectedFaculty);
    return (fac?.departments || []).map((d) => ({ value: d, label: d }));
  }, [selectedFaculty]);

  // Auto-calc total
  const totalValue = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const formatCurrency = (val: number) => `Rs. ${val.toLocaleString('en-LK')}`;

  const formatDatePickerValue = (d: string | null) => {
    if (!d) return '-';
    return d.replace(/-/g, '.');
  };

  const getYear = (d: string | null) => {
    if (!d) return new Date().getFullYear();
    const parts = d.split(/[-.]/);
    const y = parseInt(parts[0], 10);
    return isNaN(y) ? new Date().getFullYear() : y;
  };

  const handleAddItem = () => {
    setItems([...items, { ...EMPTY_ITEM }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = <K extends keyof AssetItem>(index: number, field: K, value: AssetItem[K]) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = () => {
    const record: AssetRecord = {
      id: `rec-${Date.now()}`,
      indexNumber: nextIndex,
      receiptNumber,
      ledgerDate: formatDatePickerValue(ledgerDate),
      billDate: formatDatePickerValue(billDate),
      supplier,
      items,
      totalValue,
      faculty: selectedFaculty || '',
      department: selectedDepartment || '',
      issuedDate: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      quartermasterOfficer: officer || '',
      entryApproval: 'Request',
      removalReason: '',
      removalApproval: 'Request',
      codeNo,
      year: getYear(ledgerDate),
    };
    onAdd(record);
    // Reset form
    setReceiptNumber('');
    setLedgerDate(null);
    setBillDate(null);
    setSupplier('');
    setSelectedFaculty(null);
    setSelectedDepartment(null);
    setOfficer(null);
    setCodeNo('');
    setItems([{ ...EMPTY_ITEM }]);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <span style={{ fontWeight: 700, fontSize: 18, color: '#fff' }}>
          Add New Asset Record
        </span>
      }
      size="xl"
      centered
      overlayProps={{ backgroundOpacity: 0.6, blur: 8 }}
      styles={{
        content: {
          background: 'linear-gradient(135deg, #0f1535 0%, #1a2150 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
        },
        header: {
          background: 'transparent',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
        close: {
          color: 'rgba(255,255,255,0.6)',
        },
      }}
    >
      {/* Section: Basic Info */}
      <div className="form-section">
        <div className="form-section-title">Basic Information</div>
        <Grid gap="md">
          <Grid.Col span={3}>
            <TextInput
              label="Index No (අනු අංකය)"
              value={String(nextIndex)}
              readOnly
              styles={darkInputStyles}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Receipt No (ලැබීම් අංකය)"
              placeholder="e.g. බැර. ලැර. 42"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.currentTarget.value)}
              styles={darkInputStyles}
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <TextInput
              label="Supplier (භාණ්ඩ මිළ දී ගත් ආයතනය)"
              placeholder="Enter supplier name"
              value={supplier}
              onChange={(e) => setSupplier(e.currentTarget.value)}
              styles={darkInputStyles}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput
              label="Ledger Date (ලෙජර් දිනය)"
              placeholder="Pick date"
              value={ledgerDate}
              onChange={setLedgerDate}
              valueFormat="YYYY.MM.DD"
              styles={darkInputStyles}
              popoverProps={{ styles: { dropdown: { background: '#1a2150', border: '1px solid rgba(255,255,255,0.1)' } } }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <DatePickerInput
              label="Bill Date (බිල් දිනය)"
              placeholder="Pick date"
              value={billDate}
              onChange={setBillDate}
              valueFormat="YYYY.MM.DD"
              styles={darkInputStyles}
              popoverProps={{ styles: { dropdown: { background: '#1a2150', border: '1px solid rgba(255,255,255,0.1)' } } }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="CODE NO"
              placeholder="e.g. KDU-2026-001"
              value={codeNo}
              onChange={(e) => setCodeNo(e.currentTarget.value)}
              styles={darkInputStyles}
            />
          </Grid.Col>
        </Grid>
      </div>

      {/* Section: Faculty & Officer */}
      <div className="form-section">
        <div className="form-section-title">Faculty / Section Assignment</div>
        <Grid gap="md">
          <Grid.Col span={4}>
            <Select
              label="Faculty (ආයතනය/ පීඨය)"
              placeholder="Select faculty"
              data={facultyData}
              value={selectedFaculty}
              onChange={(val) => {
                setSelectedFaculty(val);
                setSelectedDepartment(null);
              }}
              styles={darkInputStyles}
              searchable
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="Department"
              placeholder={selectedFaculty ? 'Select department' : 'Select faculty first'}
              data={departmentData}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
              disabled={!selectedFaculty}
              styles={darkInputStyles}
              searchable
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              label="QM Officer (භකාස නිළධාරී)"
              placeholder="Select officer"
              data={OFFICERS}
              value={officer}
              onChange={setOfficer}
              styles={darkInputStyles}
            />
          </Grid.Col>
        </Grid>
      </div>

      {/* Section: Items */}
      <div className="form-section">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div className="form-section-title" style={{ marginBottom: 0 }}>
            Items (භාණ්ඩ නාමාවලිය)
          </div>
          <Button
            leftSection={<IconPlus size={14} />}
            size="xs"
            variant="light"
            color="kduGold"
            onClick={handleAddItem}
          >
            Add Another Item
          </Button>
        </div>

        {items.map((item, idx) => (
          <div key={idx} className="item-card">
            <span className="item-card-number">Item #{idx + 1}</span>
            <Grid gap="sm" align="flex-end">
              <Grid.Col span={4}>
                <TextInput
                  label="Item Name"
                  placeholder="e.g. Executive Table"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(idx, 'itemName', e.currentTarget.value)}
                  styles={darkInputStyles}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 500,
                      fontSize: 14,
                      marginBottom: 6,
                    }}
                  >
                    Quantity (ප්‍රමාණය)
                  </label>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(v) => handleItemChange(idx, 'quantity', v)}
                  />
                </div>
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput
                  label="Model / Serial"
                  placeholder="e.g. EEC 022"
                  value={item.model}
                  onChange={(e) => handleItemChange(idx, 'model', e.currentTarget.value)}
                  styles={darkInputStyles}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <CreatableSelect
                  label="Warranty (වගකීම් කාල)"
                  placeholder="Select or type"
                  data={WARRANTY_PRESETS}
                  value={item.warrantyPeriod}
                  onChange={(val) => handleItemChange(idx, 'warrantyPeriod', val)}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <TextInput
                  label="Unit Price (ඒකක වටිනාකම) Rs."
                  placeholder="0"
                  type="number"
                  value={item.unitPrice || ''}
                  onChange={(e) =>
                    handleItemChange(idx, 'unitPrice', parseFloat(e.currentTarget.value) || 0)
                  }
                  styles={darkInputStyles}
                  size="sm"
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <div
                  style={{
                    paddingTop: 22,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  Subtotal:{' '}
                  <strong style={{ color: '#ffc828' }}>
                    {formatCurrency(item.quantity * item.unitPrice)}
                  </strong>
                </div>
              </Grid.Col>
              <Grid.Col span={1}>
                {items.length > 1 && (
                  <Tooltip label="Remove item">
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => handleRemoveItem(idx)}
                      style={{ marginTop: 22 }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Grid.Col>
            </Grid>
          </div>
        ))}
      </div>

      {/* Total Calculator */}
      <div className="total-calculator">
        <div className="total-label">
          Total Value (මුළු වටිනාකම)
        </div>
        <div className="total-value">{formatCurrency(totalValue)}</div>
      </div>

      <Divider my="lg" color="rgba(255,255,255,0.06)" />

      <Group justify="flex-end">
        <Button variant="subtle" color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button
          leftSection={<IconDeviceFloppy size={16} />}
          variant="gradient"
          gradient={{ from: '#1d58e0', to: '#4476e5' }}
          onClick={handleSubmit}
        >
          Save Record
        </Button>
      </Group>
    </Modal>
  );
}
