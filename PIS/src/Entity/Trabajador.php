<?php

namespace App\Entity;

use App\Repository\TrabajadorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: TrabajadorRepository::class)]
class Trabajador
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['trabajador', 'login'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('trabajador')]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups('trabajador')]
    private ?string $apellidos = null;

    #[ORM\Column(length: 9)]
    #[Groups('trabajador')]
    private ?string $dni = null;

    #[ORM\Column(length: 255)]
    #[Groups(['trabajador', 'login'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups('trabajador')]
    private ?float $salario = null;

    /**
     * @var Collection<int, Cita>
     */
    #[ORM\OneToMany(targetEntity: Cita::class, mappedBy: 'trabajador')]
    #[Groups('trabajadorCitas')]
    private Collection $citas;

    #[ORM\Column(length: 255)]
    #[Groups('trabajador')]
    private ?string $contrasenya = null;

    public function __construct()
    {
        $this->citas = new ArrayCollection();
    }

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

    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos): static
    {
        $this->apellidos = $apellidos;

        return $this;
    }

    public function getDni(): ?string
    {
        return $this->dni;
    }

    public function setDni(string $dni): static
    {
        $this->dni = $dni;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getSalario(): ?float
    {
        return $this->salario;
    }

    public function setSalario(float $salario): static
    {
        $this->salario = $salario;

        return $this;
    }

    /**
     * @return Collection<int, Cita>
     */
    public function getCitas(): Collection
    {
        return $this->citas;
    }

    public function addCita(Cita $cita): static
    {
        if (!$this->citas->contains($cita)) {
            $this->citas->add($cita);
            $cita->setTrabajador($this);
        }

        return $this;
    }

    public function removeCita(Cita $cita): static
    {
        if ($this->citas->removeElement($cita)) {
            // set the owning side to null (unless already changed)
            if ($cita->getTrabajador() === $this) {
                $cita->setTrabajador(null);
            }
        }

        return $this;
    }

    public function getContrasenya(): ?string
    {
        return $this->contrasenya;
    }

    public function setContrasenya(string $contrasenya): static
    {
        $this->contrasenya = $contrasenya;

        return $this;
    }
}
