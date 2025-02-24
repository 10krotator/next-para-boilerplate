import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";

function LoginButton() {
    const {ready, authenticated, login} = usePrivy();
    const disableLogin = !ready || (ready && authenticated);

    return (
        <Button variant="retro" disabled={disableLogin} onClick={login}>
            login
        </Button>
    );
}

export default LoginButton;