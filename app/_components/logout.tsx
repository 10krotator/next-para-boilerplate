import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

function LogoutButton() {
    const {ready, authenticated, logout} = usePrivy();
    const disableLogout = !ready || (ready && !authenticated);

    return (
        <Button variant="retro" disabled={disableLogout} onClick={logout}>
            logout
        </Button>
    );
}

export default LogoutButton;