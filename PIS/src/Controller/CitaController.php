<?php

namespace App\Controller;

use App\Entity\Cita;
use App\Entity\Cliente;
use App\Entity\Trabajador; //Añadiendo trabajador
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
            ['groups' => ['cita', 'citaCliente', 'cliente', 'citaTrabajador', 'trabajador']]
        );
    }

    #[Route('/cita', name: 'citaCreate', methods: 'POST', format: 'json')]
    public function createCita(EntityManagerInterface $entityManager, Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        $cita = new Cita();

        try {
            $cita->setFecha(new DateTime($requestContent['fecha']));
        } catch (Exception $e) { // 🔹 Se cambió DateMalformedStringException por Exception, ya que la anterior no existe en PHP
            return new Response('ERROR: Formato de fecha inválido', Response::HTTP_BAD_REQUEST);
        }

        $cita->setPrecio($requestContent['precio']);
        $cita->setPagado(false);

        try {
            $cliente = $entityManager->getRepository(Cliente::class)->find($requestContent['cliente']);
            $trabajador = $entityManager->getRepository(Trabajador::class)->find($requestContent['trabajador']); // Se añade la búsqueda del trabajador

            if (!$cliente) {
                return new Response('ERROR: El cliente no existe', Response::HTTP_NOT_FOUND);
            }
            if (!$trabajador) { // 🔹 Se añadió esta validación para evitar que trabajador_id sea NULL
                return new Response('ERROR: El trabajador no existe', Response::HTTP_NOT_FOUND);
            }

            $cita->setCliente($cliente);
            $cita->setTrabajador($trabajador); //Se añade el campo de trabajador, ya que la entidad cuenta con una relaicon con trabajador
        } catch (Exception $e) {
            return new Response('ERROR: ' . $e->getMessage(), Response::HTTP_BAD_REQUEST);
        }

        $entityManager->persist($cita);
        $entityManager->flush();
        
        return $this->json(['message' => 'CITA CREADA'], Response::HTTP_CREATED); //Se fuerza a que sea un json ya que si no da un error en la consola de angular, aunque funciona de todas formas 
    }
}
