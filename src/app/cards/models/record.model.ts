import { RecordInfo } from './record-info.model';
import { RecordValue } from './record-value.model';
import { RecordComboValue } from './record-combo-value.model';

export interface Record {
  id: string;
  date: any;
  title: string;
  note: string;
  soure: string;

  infos: RecordInfo[];
  values: RecordValue[];
  comboValues: RecordComboValue[];
}
