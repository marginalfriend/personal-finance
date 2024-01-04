import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../table'

export function CashInTable() {
  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Cash In</TableHead>
        <TableHead>Source</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell>50$</TableCell>
        <TableCell>Paypal Transfer</TableCell>
        <TableCell>Pending</TableCell>
      </TableRow>
    </TableBody>
  </Table>    
  )
}