<?php

namespace App\Controller;

use App\Entity\Usuario;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/auth/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): Response
    {
        // Get data from body
        $parameters = json_decode($request->getContent(), true);
        $email = $parameters['email'];
        $password = $parameters['contrasenya'];

        // Hash password
        $password = md5($password);


        // Comprobar datos en tabla Usuarios
        $resultado = $entityManager->getRepository(Usuario::class)->findOneBy(['email' => $email, 'contrasenya' => $password]);
        if ($resultado != null) {
            return $this->json($resultado, Response::HTTP_OK, [], ['groups' => ['login']]);
        }

        return new Response('ERROR: DATOS INCORRECTOS', Response::HTTP_UNAUTHORIZED);
    }

    // Función para que el usuario pueda modificar la contraseña
    #[Route('/auth/change-password', name: 'changePassword', methods: ['POST'])]
    public function changePassword(Request $request, EntityManagerInterface $entityManager): Response
    {
        $parameters = json_decode($request->getContent(), true);
        $email = $parameters['email'];
        $password = $parameters['contrasenya'];
        $password = md5($password);

        // Buscar en trabajador
        $usuario = $entityManager->getRepository(Usuario::class)->findOneBy(['email' => $email]);
        if ($usuario != null) {
            $usuario->setContrasenya($password);
            $entityManager->persist($usuario);
            $entityManager->flush();
            return $this->json('CONTRASEÑA CAMBIADA', Response::HTTP_OK);
        }


        return $this->json('USUARIO INCORRECTO', Response::HTTP_UNAUTHORIZED);

    }
}