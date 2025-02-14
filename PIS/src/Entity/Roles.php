<?php

namespace App\Entity;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

class Roles extends Type
{
    public const ADMIN = 'ROL_ADMIN';
    public const TRABAJADOR = 'ROL_TRABAJADOR';
    public const CLIENTE = 'ROL_CLIENTE';

    public function getSQLDeclaration(array $column, AbstractPlatform $platform): string
    {
        return "ENUM('ROL_ADMIN', 'ROL_TRABAJADOR', 'ROL_CLIENTE')";
    }

    public function getName(): string
    {
        return self::ADMIN;
    }
}