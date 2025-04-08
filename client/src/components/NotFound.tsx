import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function NotFound() {
    let navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen items-center gap-4 justify-center mx-auto ">
            <h2>page not found</h2>
            <Button
                onClick={() => {
                    navigate(-1);
                }}
            > Go Back</Button>
        </div>

    );
}
