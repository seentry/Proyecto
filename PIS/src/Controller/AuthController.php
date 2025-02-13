<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Trabajador;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends AbstractController
{
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): Response{
        // Get data from body
        $parameters = json_decode($request->getContent(), true);
        $email = $parameters['email'];
        $password = $parameters['contrasenya'];

        // Hash password
        $password = md5($password);

        // Comprobar datos en tabla Trabajador y Cliente
        $resultado = $entityManager->getRepository(Trabajador::class)->findOneBy(['email' => $email, 'contrasenya' => $password]);
        if($resultado != null){
            return $this->json($resultado, Response::HTTP_OK,[],['groups' => ['login']]);
        }

        $resultado = $entityManager->getRepository(Cliente::class)->findOneBy(['email' => $email, 'contrasenya' => $password]);
        if($resultado != null){
            return $this->json($resultado, Response::HTTP_OK,[],['groups' => ['login']]);
        }

        return new Response('ERROR: DATOS INCORRECTOS', Response::HTTP_UNAUTHORIZED);
    }
}