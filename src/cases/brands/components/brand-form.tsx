import { SidebarForm } from "@/components/layout/sidebar-form";
import { useParams } from "react-router-dom";
import { useBrand } from "../hooks/use-brand";

export function BrandForm(){
    
    const {id} = useParams<{id: string}>();
    const {data, isLoading} = useBrand(id ?? '')

    function handleSave(){

    }

    return(
        <SidebarForm title="Cadastro de Marcas"
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