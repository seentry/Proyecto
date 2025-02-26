<?php

namespace App\Controller;

use App\Entity\Servicio;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ServicioController extends AbstractController
{
    #[Route('/api/servicio', name: 'servicio', methods: 'GET', format: 'json')]
    public function getAllServicios(EntityManagerInterface $entityManager): JsonResponse
    {
        $servicios = $entityManager->getRepository(Servicio::class)->findAll();
        return $this->json($servicios, 200, [], ['groups' => ['servicio']]);
    }

    #[Route('/api/servicio', name: 'servicioCreate', methods: 'POST', format: 'json')]
    public function createServicio(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);
        $servicio = new Servicio();

        $servicio->setNombre($requestContent['nombre']);
        $servicio->setDescripcion($requestContent['descripcion']);
        $servicio->setStock($requestContent['stock']);
        $servicio->setPrecio($requestContent['precio']);

        $servicio->setImagen($requestContent['imagen'] ?? null);

        $entityManager->persist($servicio);
        $entityManager->flush();
        return $this->json($servicio, 200, [], ['groups' => ['servicio']]);
    }

    #[Route('/api/servicio/{id}', name: 'servicioDelete', methods: 'DELETE', format: 'json')]
    public function deleteServicio(EntityManagerInterface $entityManager, Servicio $servicio): JsonResponse
    {

        $entityManager->remove($servicio);
        $entityManager->flush();

        return $this->json(['message' => 'Servicio eliminado correctamente']);
    }
}