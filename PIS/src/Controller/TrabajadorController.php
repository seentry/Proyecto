<?php

namespace App\Controller;

use App\Entity\Trabajador;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class TrabajadorController extends AbstractController
{
    #[Route('/trabajador', name: 'trabajador', methods: 'GET', format: 'json')]
    public function getAllTrabajadores(EntityManagerInterface $entityManager): JsonResponse
    {
        $trabajadores = $entityManager->getRepository(Trabajador::class)->findAll();
        return $this->json($trabajadores, 200, [], ['groups' => ['trabajador']]);
    }
    #[Route('/trabajador', name: 'trabajadorCreate', methods: 'POST', format: 'json')]
    public function createTrabajador(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);
        $trabajador = new Trabajador();

        $trabajador->setNombre($requestContent['nombre']);
        $trabajador->setApellidos($requestContent['apellidos']);
        $trabajador->setDni($requestContent['dni']);
        $trabajador->setEmail($requestContent['email']);
        $trabajador->setSalario($requestContent['salario']);
        $trabajador->setContrasenya($requestContent['contrasenya']);

        $entityManager->persist($trabajador);
        $entityManager->flush();

        return $this->json($trabajador, 200, [], ['groups' => ['trabajador']]);
    }
}