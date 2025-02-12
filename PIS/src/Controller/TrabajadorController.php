<?php

namespace App\Controller;

use App\Entity\Trabajador;
use App\Form\TrabajadorType;
use App\Repository\TrabajadorRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/trabajador')]
final class TrabajadorController extends AbstractController
{
    #[Route(name: 'app_trabajador_index', methods: ['GET'])]
    public function index(TrabajadorRepository $trabajadorRepository): Response
    {
        return $this->render('trabajador/index.html.twig', [
            'trabajadors' => $trabajadorRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_trabajador_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $trabajador = new Trabajador();
        $form = $this->createForm(TrabajadorType::class, $trabajador);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($trabajador);
            $entityManager->flush();

            return $this->redirectToRoute('app_trabajador_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('trabajador/new.html.twig', [
            'trabajador' => $trabajador,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_trabajador_show', methods: ['GET'])]
    public function show(Trabajador $trabajador): Response
    {
        return $this->render('trabajador/show.html.twig', [
            'trabajador' => $trabajador,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_trabajador_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Trabajador $trabajador, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(TrabajadorType::class, $trabajador);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_trabajador_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('trabajador/edit.html.twig', [
            'trabajador' => $trabajador,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_trabajador_delete', methods: ['POST'])]
    public function delete(Request $request, Trabajador $trabajador, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$trabajador->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($trabajador);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_trabajador_index', [], Response::HTTP_SEE_OTHER);
    }
}
