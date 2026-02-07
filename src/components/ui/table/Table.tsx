'use client';

import "./Table.scss";

const Table = ({ header, children }: { header: string[]; children: React.ReactNode }) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          {header.map((title, index) => (
            <th key={index} className="table-header">
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;