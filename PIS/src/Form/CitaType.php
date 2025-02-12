<?php

namespace App\Form;

use App\Entity\Cita;
use App\Entity\Cliente;
use App\Entity\Trabajador;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CitaType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('fecha', null, [
                'widget' => 'single_text',
            ])
            ->add('precio')
            ->add('pagado')
            ->add('cliente', EntityType::class, [
                'class' => Cliente::class,
                'choice_label' => 'id',
            ])
            ->add('trabajador', EntityType::class, [
                'class' => Trabajador::class,
                'choice_label' => 'id',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Cita::class,
        ]);
    }
}
