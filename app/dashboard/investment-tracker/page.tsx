import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCryptoPrices } from "./actions";
import { currencyFormatter } from "../components/balance";

export default async function Page() {
  const bitcoinPrice = await fetchCryptoPrices();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ticks</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Market Cap</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>{currencyFormatter(bitcoinPrice.bitcoin.idr)}</TableCell>
          <TableCell>
            {currencyFormatter(bitcoinPrice.bitcoin.idr_market_cap)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
