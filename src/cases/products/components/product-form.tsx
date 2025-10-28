import { SidebarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/use-product";

export function ProductForm(){
    
    const {id} = useParams<{id: string}>(); 
    const {data, isLoading} = useProduct(id ?? '')

    function handleSave(){

    }

    return(
        <SidebarForm title="Cadastro de Produto"
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