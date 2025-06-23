from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from shop.models import Order, OrderItem, Product


class Command(BaseCommand):
    help = "Seed the database with sample products and an order"

    def handle(self, *args, **options):
        if Product.objects.exists():
            self.stdout.write(self.style.WARNING("Seed data already exists."))
            return

        # Create sample products
        laptop = Product.objects.create(
            name="Laptop",
            description="High-performance laptop",
            price=999.99,
            image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
            stock=10,
        )
        phone = Product.objects.create(
            name="Phone",
            description="Latest smartphone",
            price=599.99,
            image_url="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
            stock=25,
        )
        headset = Product.objects.create(
            name="Headset",
            description="Wireless headset",
            price=199.99,
            image_url="https://images.unsplash.com/photo-1512499617640-c2f999feea9c?auto=format&fit=crop&w=400&q=80",
            stock=30,
        )

        # Create a sample order using the products above
        user = User.objects.create_user(
            username="testuser", email="test@example.com", password="password"
        )
        order = Order.objects.create(user=user)
        OrderItem.objects.create(order=order, product=laptop, quantity=1)
        OrderItem.objects.create(order=order, product=phone, quantity=2)

        self.stdout.write(self.style.SUCCESS("Database seeded with sample data."))
