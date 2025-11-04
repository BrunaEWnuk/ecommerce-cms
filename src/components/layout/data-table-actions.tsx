import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type DataTableActionProps = {
    itemId: string | number;
}
export function DataTableAction({
    itemId
}:DataTableActionProps) {
        const location = useLocation();
        const navigate = useNavigate();

    function handleNavigateToId(){
        const path = location.pathname;
        navigate(`${path}/${itemId}`);

    }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleNavigateToId}></Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Adicionar Registro</p>
      </TooltipContent>
    </Tooltip>
  );
}
