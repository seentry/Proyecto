<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250211094549 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cita CHANGE cliente_id cliente_id INT NOT NULL, CHANGE trabajador_id trabajador_id INT NOT NULL, CHANGE dia_hora fecha DATETIME NOT NULL');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B02771CAA3E7');
        $this->addSql('DROP INDEX IDX_AB02B02771CAA3E7 ON opinion');
        $this->addSql('ALTER TABLE opinion CHANGE servicio_id cliente_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B027DE734E51 FOREIGN KEY (cliente_id) REFERENCES cliente (id)');
        $this->addSql('CREATE INDEX IDX_AB02B027DE734E51 ON opinion (cliente_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cita CHANGE cliente_id cliente_id INT DEFAULT NULL, CHANGE trabajador_id trabajador_id INT DEFAULT NULL, CHANGE fecha dia_hora DATETIME NOT NULL');
        $this->addSql('ALTER TABLE opinion DROP FOREIGN KEY FK_AB02B027DE734E51');
        $this->addSql('DROP INDEX IDX_AB02B027DE734E51 ON opinion');
        $this->addSql('ALTER TABLE opinion CHANGE cliente_id servicio_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE opinion ADD CONSTRAINT FK_AB02B02771CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicio (id)');
        $this->addSql('CREATE INDEX IDX_AB02B02771CAA3E7 ON opinion (servicio_id)');
    }
}
