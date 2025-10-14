import { useMutation, useQuery } from "@tanstack/react-query";
import type { CategoryDTO } from "../dtos/category.dto";
import { CategoryService } from "../services/category.service";


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
    return useMutation<CategoryDTO, Error, Omit<CategoryDTO, 'id'>>({ //se forçar a inserção do id, já barra ele
        mutationFn: (category: Omit<CategoryDTO, 'id'>) => CategoryService.create(category)
    });
}

export function useUpdateCategory() {
    return useMutation<CategoryDTO, Error, {id: string, category: CategoryDTO}>({ //não precisa omitir nada
        mutationFn: ({id, category}) => CategoryService.update(id, category)
    });
}

export function useDeleteCategory() {
    return useMutation<void, Error, string>({
        mutationFn: (id: string) => CategoryService.delete(id)
    });
}