<?php

namespace App\Controller;

use App\Entity\Cliente;
use App\Entity\Trabajador;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ClienteController extends AbstractController
{
    #[Route('/cliente', name: 'cliente', methods: 'GET', format: 'json')]
    public function getAllClientes(EntityManagerInterface $entityManager): JsonResponse
    {
        $trabajadores = $entityManager->getRepository(Cliente::class)->findAll();
        return $this->json($trabajadores, 200, [], ['groups' => ['cliente']]);
    }
    #[Route('/cliente', name: 'clienteCreate', methods: 'POST', format: 'json')]
    public function createCliente(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);
        $cliente = new Cliente();

        $cliente->setNombre($requestContent['nombre']);
        $cliente->setApellidos($requestContent['apellidos']);
        $cliente->setEmail($requestContent['email']);
        $cliente->setDni($requestContent['dni']);
        $cliente->setContrasenya($requestContent['contrasenya']);

        $entityManager->persist($cliente);
        $entityManager->flush();
        return $this->json($cliente, 200, [], ['groups' => ['cliente']]);
    }
}
