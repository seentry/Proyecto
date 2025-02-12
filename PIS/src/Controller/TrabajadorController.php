<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TrabajadorController extends AbstractController
{
    #[Route('/trabajador', name: 'app_trabajador')]
    public function index(): Response
    {
        return $this->render('trabajador/index.html.twig', [
            'controller_name' => 'TrabajadorController',
        ]);
    }
}
