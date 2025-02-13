<?php

namespace App\Controller;

use App\Entity\Cita;
use App\Entity\Cliente;
use DateMalformedStringException;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class CitaController extends AbstractController
{
    #[Route('/cita', name: 'citas', methods: 'GET', format: 'json')]
    public function getAllCitas(EntityManagerInterface $entityManager): JsonResponse
    {
        $citas = $entityManager->getRepository(Cita::class)->findAll();
        return $this->json(
            $citas,
            200,
            [],
            ['groups' => ['cita', 'citaCliente', 'cliente','citaTrabajador','trabajador']]
        );
    }

    #[Route('/cita', name: 'citaCreate', methods: 'POST', format: 'json')]
    public function createCita(EntityManagerInterface $entityManager, Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        $cita = new Cita();
        try {
            $cita->setFecha(new DateTime($requestContent['fecha']));
        } catch (DateMalformedStringException $e) {
            return new Response('ERROR: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }
        $cita->setPrecio($requestContent['precio']);
        $cita->setPagado(false);
        try {

            $cita->setCliente($entityManager->getRepository(Cliente::class)->find($requestContent['cliente']));
            if ($cita->getCliente() == null) {
                return new Response('ERROR: ' . 'El cliente no existe', Response::HTTP_NOT_FOUND);
            }
        } catch (Exception $e) {
            return new Response('ERROR: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($cita);
        $entityManager->flush();
        return new Response('CITA CREADA', Response::HTTP_CREATED);
    }
}
