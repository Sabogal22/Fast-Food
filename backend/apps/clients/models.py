from django.db import models

class Client(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('TI', 'Tarjeta de Identidad'),
        ('PA', 'Pasaporte'),
        ('NIT', 'NIT'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Nombre")
    last_name = models.CharField(max_length=100, verbose_name="Apellido")
    document_type = models.CharField(
        max_length=3, 
        choices=DOCUMENT_TYPE_CHOICES,
        default='CC',
        verbose_name="Tipo de documento"
    )
    document_number = models.CharField(max_length=20, verbose_name="Número de documento")
    phone = models.CharField(max_length=20, verbose_name="Teléfono")
    address = models.CharField(max_length=200, verbose_name="Dirección")
    email = models.EmailField(blank=True, null=True, verbose_name="Correo electrónico")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")

    def __str__(self):
        return f"{self.name} {self.last_name}"

    class Meta:
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"
        ordering = ['name', 'last_name']