<?php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
class Usuario
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('usuario')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('usuario')]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups('usuario')]
    private ?string $apellidos = null;

    #[ORM\Column(length: 9)]
    #[Groups('usuario')]
    private ?string $dni = null;

    #[ORM\Column(length: 255)]
    #[Groups('usuario')]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups('usuario')]
    private ?string $contrasena = null;

    #[ORM\Column(type: 'role')]
    #[Groups('usuario')]
    private ?string $rol = null;

    /**
     * @var Collection<int, Cita>
     */
    #[ORM\OneToMany(targetEntity: Cita::class, mappedBy: 'cliente')]
    #[Groups('usuarioCitas')]
    private Collection $citas;

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

    public function getContrasena(): ?string
    {
        return $this->contrasena;
    }

    public function setContrasena(string $contrasena): static
    {
        $this->contrasena = $contrasena;

        return $this;
    }

    public function getRol(): ?string
    {
        return $this->rol;
    }

    public function setRol(string $rol): static
    {
        $this->rol = $rol;
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
}
