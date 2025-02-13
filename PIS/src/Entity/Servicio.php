<?php

namespace App\Entity;

use App\Repository\ServicioRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServicioRepository::class)]
class Servicio
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('servicio')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('servicio')]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups('servicio')]
    private ?string $descripcion = null;

    #[ORM\Column(nullable: true)]
    #[Groups('servicio')]
    private ?int $stock = null;

    #[ORM\Column]
    #[Groups('servicio')]
    private ?float $precio = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
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

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getPrecio(): ?float
    {
        return $this->precio;
    }

    public function setPrecio(float $precio): static
    {
        $this->precio = $precio;

        return $this;
    }
}
