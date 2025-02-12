<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class OpinionController extends AbstractController
{
    #[Route('/opinion', name: 'app_opinion')]
    public function index(): Response
    {
        return $this->render('opinion/index.html.twig', [
            'controller_name' => 'OpinionController',
        ]);
    }
}
