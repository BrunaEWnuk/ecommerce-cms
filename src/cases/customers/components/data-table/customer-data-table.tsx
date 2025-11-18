import { DataTable } from "@/components/ui/data-table";
import { customerColumns } from "./customer-columns";
import { useCustomer } from "../../hooks/use-customer";

export function CustomerDataTable() {

    const {data: customers, isLoading} = useCustomers();
    return (
        <div>
            { isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={customerColumns} data={customers!} />
            )}
        </div>

    )
}