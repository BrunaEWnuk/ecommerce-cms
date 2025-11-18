
import { BreadCrumb } from "@/components/layout/bread-crumb"
import { Outlet } from "react-router-dom"
import { OrderDataTable } from "./data-table/order-data-table"

export function OrderLayout() {

    return (
        <div className="p-4">

            <BreadCrumb title="Pedidos" />

            <div className="flex flex-col py-4 gap-4">

                <div>
                    <OrderDataTable />
                    <Outlet />
                </div>

            </div>
        </div>
    )
}