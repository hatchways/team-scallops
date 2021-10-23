import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState, useEffect } from 'react';

export default function DatePicker(props: any): JSX.Element {
  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const select = (ranges: any) => {
    props.handleSelect(ranges);
    setSelection([ranges.selection]);
  };

  return <DateRange onChange={select} minDate={new Date()} ranges={selection} />;
}
