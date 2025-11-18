import { OrderStatus } from "@/cases/orders/dtos/order-dto";
import { Badge } from "@/components/ui/badge";


type DataTableBadgeProps = {
    status: string | number;
}
export function DataTableBadge({
    status
}: DataTableBadgeProps) {
    const info = OrderStatus.find((s) => s.value === status)

    return (
        status ? (
            <Badge
                variant="outline"
                className={`${info?.bg} ${info?.border} ${info?.text}`}
            >
                {info?.label}
            </Badge>
        ) : (
            <p>Não Econtrado!</p>
        )
    )

}