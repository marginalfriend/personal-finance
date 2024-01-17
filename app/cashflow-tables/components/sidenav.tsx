import { ModeToggle } from "@/components/theme-switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsCash, BsCashStack, BsTable } from "react-icons/bs";

export function SideNav() {
  const sideNavContent = [
    {
      text: "CASHFLOW",
      icon: <BsCashStack size={20} />,
      link: "/cashflow-tables",
    },
    {
      text: "DASHBOARD",
      icon: <BsTable size={20} />,
      link: "/dashboard",
    },
  ];
  return (
    <aside className="border rounded-lg w-[20%] p-2">
      <Table>
        <TableHeader>
          <TableRow className="pb-4">
            <TableHead className="text-xl ">SELFFIN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sideNavContent.map((item) => (
            <TableRow className="justify-around" key={item.text}>
              <TableCell className="text-left">{item.text}</TableCell>
              <TableCell className="flex justify-end">{item.icon}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className="flex flex-row justify-around align-middle">
        <h1 className="text-xl">This is Sidenav</h1>
        <ModeToggle />
      </div>
      <ul>

      </ul> */}
    </aside>
  );
}
