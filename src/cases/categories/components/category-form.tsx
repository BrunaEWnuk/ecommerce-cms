import { SidebarForm } from "@/components/layout/sidebar-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCategory, useCreateCategory, useDeleteCategory, useUpdateCategory } from "../hooks/use-category";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, 'Informe pelo menos 2 caractéres').max(60, 'Máximo 60 caractéres'),
})
export function CategoryForm(){
    
    const {id} = useParams<{id: string}>(); //garantir que ele recupere o parametro que ta vindo
    const navigate = useNavigate();
    const {data, isLoading} = useCategory(id ?? '') // ?? = se a da esquerda nao existir pega o da direita

    const createCategory = useCreateCategory(); // nao desestrutura pra usar o create o category no mesmo evento
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        }
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name: data.name
            })
        }
    }, [data, form])

    function onSubmit(value: z.infer<typeof formSchema>){
        console.log('Dados:', value)
        if (id) {
            updateCategory.mutate(
                {id, category:{name:value.name}},
                {
                    onSettled: () => {
                        navigate('/categories')
                    }
                }
            );
        } else {
            createCategory.mutate(
                {name:value.name},
                {
                    onSettled: () => {
                        navigate('/categories')
                    }
                }
            );
        }

    }

    function onDelete(){
        if (id) {
            deleteCategory.mutate(id, {
                onSettled: () => {
                    navigate('/categories')
                }
            })
        }
    }

 return (   
<SidebarForm 
title="Cadastro de Categoria"
        onSave={form.handleSubmit(onSubmit)} 
        onDelete={onDelete}
        loading={isLoading}
        {...(id && {onDelete: onDelete})}
        >
    
    <div className="space-y-4">
    <Form {...form}>
 <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Categoria</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </Form>
    </div>
</SidebarForm>

 )   
}
