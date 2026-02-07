'use client';

import { authClient } from "@/src/lib/auth-client";
import Button from "@/src/components/ui/button/Button";
import Image from "next/image";

const callbackUrl = "/mdt_samd";

const handleDiscordLogin = async () => {
  await authClient.signIn.social({
    provider: "discord",
    callbackURL: callbackUrl,
  });
};
const Login = () => {
	return (
		<>
			<div className='login-container'>
				<div className='login-img-container'>
					<Image src="/logo_samd.webp" alt="Logo SAMD" width={200} height={200} />
				  <Image src="/logo_sasp.webp" alt="Logo SASP" width={200} height={200} />
				  <Image src="/logo_safd.webp" alt="Logo SAFD" width={200} height={200} />
				  <Image src="/logo_doj.webp" alt="Logo DOJ" width={200} height={200} />
				</div>
				<div>
					<Button onClick={handleDiscordLogin} variant="default">Se connecter avec Discord</Button>
				</div>
			</div>
		</>
	);
}

export default Login;