<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250214104847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cita (id INT AUTO_INCREMENT NOT NULL, cliente_id INT NOT NULL, trabajador_id INT DEFAULT NULL, fecha DATETIME NOT NULL, precio DOUBLE PRECISION NOT NULL, pagado TINYINT(1) NOT NULL, INDEX IDX_3E379A62DE734E51 (cliente_id), INDEX IDX_3E379A62EC3656E (trabajador_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE opinion (id INT AUTO_INCREMENT NOT NULL, usuario_id INT NOT NULL, descripcion VARCHAR(255) NOT NULL, titulo VARCHAR(255) NOT NULL, valoracion INT NOT NULL, INDEX IDX_AB02B027DB38439E (usuario_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE servicio (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, descripcion VARCHAR(255) NOT NULL, stock INT DEFAULT NULL, precio DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE usuario (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, apellidos VARCHAR(255) NOT NULL, dni VARCHAR(9) NOT NULL, email VARCHAR(255) NOT NULL, contrasena VARCHAR(255) NOT NULL, rol ENUM(\'ROL_ADMIN\', \'ROL_TRABAJADOR\', \'ROL_CLIENTE\') NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A62DE734E51 FOREIGN KEY (cliente_id) REFERENCES usuario (id)');
        $this->addSql('ALTER TABLE cita ADD CONSTRAINT FK_3E379A62EC3656E FOREIGN KEY (trabajador_id) REFERENCES usuario (id)');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027DB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cita DROP FOREIGN KEY FK_3E379A62DE734E51');
        $this->addSql('ALTER TABLE cita DROP FOREIGN KEY FK_3E379A62EC3656E');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027DB38439E');
        $this->addSql('DROP TABLE cita');
        $this->addSql('DROP TABLE opinion');
        $this->addSql('DROP TABLE servicio');
        $this->addSql('DROP TABLE usuario');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
