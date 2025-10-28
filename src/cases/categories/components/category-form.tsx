import { SidebarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useCategory } from "../hooks/use-category";

export function CategoryForm(){
    
    const {id} = useParams<{id: string}>(); //garantir que ele recupere o parametro que ta vindo
    const {data, isLoading} = useCategory(id ?? '') // ?? = se a da esquerda nao existir pega o da direita

    function handleSave(){

    }

    return(
        <SidebarForm title="Cadastro de Categoria"
        onSave={handleSave}
        >

            {isLoading ? (
                <h4>Carregando</h4>
            ) : (
                <p>
                    {JSON.stringify(data)}
                </p>
            )}
        </SidebarForm>
    )
}