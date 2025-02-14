<?php

namespace App\Controller;

use App\Entity\Usuario;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UsuarioController extends AbstractController
{
    #[Route('/api/usuario', name: 'usuarios', methods: 'GET', format: 'json')]
    public function getAllUsuarios(EntityManagerInterface $entityManager): JsonResponse
    {
        $usuarios = $entityManager->getRepository(Usuario::class)->findAll();

        // Modificacion de usuarios a usuario
        return $this->json($usuarios, Response::HTTP_OK, [], ['groups' => ['usuario']]);
    }

    #[Route('/api/usuario/{id}', name: 'usuario', methods: 'GET', format: 'json')]
    public function getUsuario(Usuario $usuario): JsonResponse
    {
        // Modificacion de usuarios a usuario
        return $this->json($usuario, Response::HTTP_OK, [], ['groups' => ['usuario']]);
    }

    #[Route('/api/usuario', name: 'usuarioCreate', methods: 'POST', format: 'json')]
    public function createUsuario(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);
        $usuario = new Usuario();

        $usuario->setNombre($requestContent['nombre']);
        $usuario->setApellidos($requestContent['apellidos']);
        $usuario->setDni($requestContent['dni']);
        $usuario->setEmail($requestContent['email']);
        $usuario->setContrasena($requestContent['contrasena']);
        $usuario->setRol($requestContent['rol']);

        $entityManager->persist($usuario);
        $entityManager->flush();

        // Modificacion de usuarios a usuario
        return $this->json($usuario, Response::HTTP_CREATED, [], ['groups' => ['usuario']]);
    }

}