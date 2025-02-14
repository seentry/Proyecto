<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Trabajador;
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

        // Comprobar datos en tabla Trabajador y Cliente
        $resultado = $entityManager->getRepository(Trabajador::class)->findOneBy(['email' => $email, 'contrasenya' => $password]);
        if ($resultado != null) {
            return $this->json($resultado, Response::HTTP_OK, [], ['groups' => ['login']]);
        }

        $resultado = $entityManager->getRepository(Cliente::class)->findOneBy(['email' => $email, 'contrasenya' => $password]);
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
        $trabajador = $entityManager->getRepository(Trabajador::class)->findOneBy(['email' => $email]);
        if ($trabajador != null) {
            $trabajador->setContrasenya($password);
            $entityManager->persist($trabajador);
            $entityManager->flush();
            return $this->json('CONTRASEÑA CAMBIADA', Response::HTTP_OK);
        }

        // Buscar en cliente
        $cliente = $entityManager->getRepository(Cliente::class)->findOneBy(['email' => $email]);
        if ($cliente != null) {
            $cliente->setContrasenya($password);
            $entityManager->persist($cliente);
            $entityManager->flush();
            return $this->json('CONTRASEÑA CAMBIADA', Response::HTTP_OK);
        }

        return $this->json('USUARIO INCORRECTO', Response::HTTP_UNAUTHORIZED);

    }
}