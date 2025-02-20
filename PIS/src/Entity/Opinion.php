<?php

namespace App\Entity;

use App\Repository\OpinionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: OpinionRepository::class)]
class Opinion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('opinion')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('opinion')]
    private ?string $descripcion = null;

    #[ORM\Column(length: 255)]
    #[Groups('opinion')]
    private ?string $titulo = null;

    #[ORM\Column]
    #[Groups('opinion')]
    private ?int $valoracion = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('opinionUsuario')]
    private ?Usuario $usuario = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): static
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getValoracion(): ?int
    {
        return $this->valoracion;
    }

    public function setValoracion(int $valoracion): static
    {
        $this->valoracion = $valoracion;

        return $this;
    }

    public function getCliente(): ?Cliente
    {
        return $this->cliente;
    }

    public function setCliente(?Cliente $cliente): static
    {
        $this->cliente = $cliente;

        return $this;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): static
    {
        $this->usuario = $usuario;

        return $this;
    }
}
