import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface Column {
  title: string;
  render: (row: any) => React.ReactNode;
}

interface AdsTableProps {
  columns: Column[];
  data: any[];
  emptyMessage: string;
}

const AdsTable = ({ columns, data, emptyMessage }: AdsTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        {columns.map((col) => (
          <TableHead key={col.title}>{col.title}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data?.length > 0 ? (
        data.map((row, idx) => (
          <TableRow key={row._id || idx}>
            {columns.map((col, i) => (
              <TableCell key={i}>{col.render(row)}</TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={columns.length}
            className="h-24 text-center text-base"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default AdsTable;
