import type { ColumnDef } from "@tanstack/react-table";
import type { ProductDTO } from "../../dtos/product.dto";

export const productColumns: ColumnDef<ProductDTO>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome do produto",
  },
];
