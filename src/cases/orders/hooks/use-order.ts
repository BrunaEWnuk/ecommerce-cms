import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "../services/order.service";
import type { OrderDTO } from "../dtos/order-dto";
import { toast } from "react-toastify";


export function useOrders() {
    return useQuery<OrderDTO[]>({
        queryKey: ['orders'],
        queryFn: OrderService.list
    });
}

export function useOrder(id: string) {
    return useQuery<OrderDTO>({
        queryKey: ['order', id],
        queryFn: () => OrderService.getById(id),
        enabled: !!id //-> or Boolean(id)
    });
}

export function useCreateOrder(){
    const queryClient = useQueryClient();

    return useMutation<OrderDTO, Error, Omit<OrderDTO, 'id'>>({
        mutationFn: (order: Omit<OrderDTO, 'id'>) => OrderService.create(order),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            toast.success('Registro adicionado com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao adicionar: ${error.message}`)
        }
    });
}

export function useUpdateOrder(){
    const queryClient = useQueryClient();

    return useMutation<OrderDTO, Error, {id: string, order: OrderDTO}>({
        mutationFn: ({id, order}) => OrderService.update(id, order),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            toast.success('Registro alterado com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`)
        }
    });
}

export function useDeleteOrder(){
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => OrderService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']});
            toast.success('Registro exluído com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao excluir: ${error.message}`)
        }
    });
}