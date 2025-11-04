import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";
import { toast } from "react-toastify";


export function useCategories() {
    return useQuery<CategoryDTO[]>({
        queryKey: ['categories'],
        queryFn: CategoryService.list //sem o parênteses quando não tem argumento exemplo = getById(id)
    });
}

export function useCategory(id: string ){
    return useQuery<CategoryDTO>({
        queryKey: ['category', id],
        queryFn: () => CategoryService.getById(id), 
        enabled: !!id // uma ! false, e !! nega a negação, então é true -- forçando ser booleano ou usar Boolean(id)
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();
    
    return useMutation<CategoryDTO, Error, Omit<CategoryDTO, 'id'>>({ //se forçar a inserção do id, já barra ele
        mutationFn: (category: Omit<CategoryDTO, 'id'>) => CategoryService.create(category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            toast.success('Registro adicionado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao adicionar! Motivo: ${error.message}`)
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation<CategoryDTO, Error, {id: string, category: CategoryDTO}>({ //não precisa omitir nada
        mutationFn: ({id, category}) => CategoryService.update(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            toast.success('Registro atualizado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao atualizar! Motivo: ${error.message}`)
        }
        
    });
}
export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, string>({
        mutationFn: (id: string) => CategoryService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['categories']});
            toast.success('Registro deletado com sucesso!')
        },
        onError: (error) => {
            toast.error(`Erro ao deletar! Motivo: ${error.message}`)
        }
    });
};