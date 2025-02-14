<?php

namespace App\Entity;

use App\Repository\ClienteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ClienteRepository::class)]
class Cliente
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cliente', 'login'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('cliente')]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups('cliente')]
    private ?string $apellidos = null;

    #[ORM\Column(length: 255)]
    #[Groups(['cliente', 'login'])]
    private ?string $email = null;

    #[ORM\Column(length: 9)]
    #[Groups('cliente')]
    private ?string $dni = null;

    #[ORM\OneToMany(targetEntity: Opinion::class, mappedBy: 'cliente')]
    #[Groups('clienteOpinions')]
    private Collection $opinions;

    #[ORM\OneToMany(targetEntity: Cita::class, mappedBy: 'cliente')]
    #[Groups('clienteCitas')]
    private Collection $citas;

    #[ORM\Column(length: 255)]
    #[Groups('cliente')]
    private ?string $contrasenya = null;

    public function __construct()
    {
        $this->opinions = new ArrayCollection();
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

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

    /**
     * @return Collection<int, Opinion>
     */
    public function getOpinions(): Collection
    {
        return $this->opinions;
    }

    public function addOpinion(Opinion $opinion): static
    {
        if (!$this->opinions->contains($opinion)) {
            $this->opinions->add($opinion);
            $opinion->setCliente($this);
        }

        return $this;
    }

    public function removeOpinion(Opinion $opinion): static
    {
        if ($this->opinions->removeElement($opinion)) {
            // set the owning side to null (unless already changed)
            if ($opinion->getCliente() === $this) {
                $opinion->setCliente(null);
            }
        }

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
            $cita->setCliente($this);
        }

        return $this;
    }

    public function removeCita(Cita $cita): static
    {
        if ($this->citas->removeElement($cita)) {
            // set the owning side to null (unless already changed)
            if ($cita->getCliente() === $this) {
                $cita->setCliente(null);
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
