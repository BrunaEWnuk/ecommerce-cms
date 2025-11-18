import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // o tanstack entende que algo foi alterado e atualiza em tela
import { CustomerService, type CustomerDTO } from "../services/customer.service";
import { toast } from "react-toastify";

export interface Customer {
  name: string;
  address?: string;
  zipcode?: string;
  city?: {
    name?: string;
    state?: {
      acronym?: string;
    };
  };
}

export function useCustomers() {
    return useQuery<CustomerDTO[]>({
        queryKey: ['customers'],
        queryFn: CustomerService.list
    });
}

export function useCustomer(id: string) {   // useQuery é para consultar
    return useQuery<CustomerDTO>({
        queryKey: ['customer', id],
        queryFn: () => CustomerService.getById(id),
        enabled: !!id //-> or Boolean(id)
    });
}

export function useCreateCustomer(){
    const queryClient = useQueryClient();

    return useMutation<CustomerDTO, Error, Omit<CustomerDTO, 'id'>>({ // mutate é para alterar != consultar
        mutationFn: (customer: Omit<CustomerDTO, 'id'>) => CustomerService.create(customer as CustomerDTO),  // o Omit foi usado para quando tem uma classe onde o atributo nao tem "?" mas quer omiti-lo
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']}); // para ignorar o cache pq tá sendo alterado
            toast.success('Registro adicionado com sucessso!') // toast: só informando que deu sucesso ou erro
        }, 
        onError: (error) => {
            toast.error(`Erro ao adicionar: ${error.message}`)
        }
    });
}

export function useUpdateCustomer(){
    const queryClient = useQueryClient();

    return useMutation<CustomerDTO, Error, {id: string, customer: CustomerDTO}>({
        mutationFn: ({id, customer}) => CustomerService.update(id, customer),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            toast.success('Registro alterado com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao alterar: ${error.message}`)
        }
    });
}

export function useDeleteCustomer(){
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: (id: string) => CustomerService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            toast.success('Registro exluído com sucessso!')
        }, 
        onError: (error) => {
            toast.error(`Erro ao excluir: ${error.message}`)
        }
    });
}