<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CitaController extends AbstractController
{
    #[Route('/cita', name: 'app_cita')]
    public function index(): Response
    {
        return $this->render('cita/index.html.twig', [
            'controller_name' => 'CitaController',
        ]);
    }
}
