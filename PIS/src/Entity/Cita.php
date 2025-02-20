<?php

namespace App\Entity;

use App\Repository\CitaRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CitaRepository::class)]
class Cita
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('cita')]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups('cita')]
    private ?DateTimeInterface $fecha = null;

    #[ORM\Column]
    #[Groups('cita')]
    private ?float $precio = null;

    #[ORM\Column]
    #[Groups('cita')]
    private ?bool $pagado = null;

    // SE AGREGA Groups('cita') PARA QUE SE SERIALICE EL CLIENTE
    #[ORM\ManyToOne(inversedBy: 'citas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('cita')]
    private ?Usuario $cliente = null;

    // SE AGREGA Groups('cita') PARA QUE SE SERIALICE EL TRABAJADOR
    #[ORM\ManyToOne(inversedBy: 'citas')]
    #[Groups('cita')]
    private ?Usuario $trabajador = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('cita')]
    private ?Servicio $servicio = null;

    /* //Datos que se han modificado
    #[ORM\ManyToOne(inversedBy: 'citas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $cliente = null;

    #[ORM\ManyToOne(inversedBy: 'citas')]
    private ?Usuario $trabajador = null;
    */
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFecha(): ?DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(DateTimeInterface $fecha): static
    {
        $this->fecha = $fecha;

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

    public function isPagado(): ?bool
    {
        return $this->pagado;
    }

    public function setPagado(bool $pagado): static
    {
        $this->pagado = $pagado;

        return $this;
    }

    //MODIFICADO
    public function getCliente(): ?Usuario
    {
        return $this->cliente;
    }

    //MODIFICADO
    public function setCliente(?Usuario $cliente): static
    {
        $this->cliente = $cliente;
        return $this;
    }


    //MODIFICADO
    public function getTrabajador(): ?Usuario
    {
        return $this->trabajador;
    }

    //MODIFICADO
    public function setTrabajador(?Usuario $trabajador): static
    {
        $this->trabajador = $trabajador;
        return $this;
    }

    public function getServicio(): ?Servicio
    {
        return $this->servicio;
    }

    public function setServicio(?Servicio $servicio): static
    {
        $this->servicio = $servicio;

        return $this;
    }

}
