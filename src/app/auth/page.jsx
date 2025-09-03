'use client';

import { useRouter } from 'next/navigation';
import { Button } from './button';

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = () => {
    // Lógica de login...
    router.replace('/dashboard'); // ¡Navegación!
 
  };

  return <form onSubmit={handleSubmit}>
    <Button text={"boton"} onClick={handleSubmit} ></Button>
  </form>;
}
