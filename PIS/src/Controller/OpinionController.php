<?php

namespace App\Controller;

use App\Entity\Opinion;
use App\Entity\Usuario;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class OpinionController extends AbstractController
{
    #[Route('/api/opinion', name: 'opinions', methods: 'GET', format: 'json')]
    public function getAllOpinions(EntityManagerInterface $entityManager): JsonResponse
    {
        $opinions = $entityManager->getRepository(Opinion::class)->findAll();
        return $this->json($opinions, 200, [], ['groups' => ['opinionUsuario', 'opinion', 'usuario']]);
    }

    #[Route('/api/opinion/{id}', name: 'opinion', methods: 'GET', format: 'json')]
    public function getOpinion(Opinion $opinion): JsonResponse
    {
        return $this->json($opinion, 200, [], ['groups' => ['opinion']]);
    }

    #[Route('/api/opinion', name: 'opinionCreate', methods: 'POST', format: 'json')]
    public function opinionCreate(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $requestContent = json_decode($request->getContent(), true);
        $opinion = new Opinion();

        try {
            $opinion->setDescripcion($requestContent['descripcion']);
            $opinion->setTitulo($requestContent['titulo']);
            $opinion->setValoracion($requestContent['valoracion']);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }

        try {
            // Conseguimos el usuario por ID
            $usuario = $entityManager->getRepository(Usuario::class)->findBy(['id' => $requestContent['usuario']])[0];
            $opinion->setUsuario($usuario);
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], 400);
        }

        $entityManager->persist($opinion);
        $entityManager->flush();

        return $this->json($opinion, 201, [], ['groups' => ['opinion']]);
    }

    #[Route('/api/opinion/{id}', name: 'opinionDelete', methods: ['DELETE'], format: 'json')]
    public function deleteOpinion(EntityManagerInterface $entityManager, Opinion $opinion): JsonResponse
    {
        $entityManager->remove($opinion);
        $entityManager->flush();

        return $this->json('OPINION ELIMINADA');
    }
}