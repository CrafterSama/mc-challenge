from io import StringIO

from django.contrib.auth.models import User
from django.core.management import call_command
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Order, OrderItem, Product


class ProductTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.product = Product.objects.create(
            name="Product 1",
            description="desc",
            price=10,
            image_url=(
                "https://i.pinimg.com/736x/df/89/59/df8959a1decb9a0c9dd2e6242459868d.jpg"
            ),
            stock=5,
        )

    def test_create_product(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post("/api/products/", {"name": "Product 1", "description": "desc", "price": 10, "image_url": "https://i.pinimg.com/736x/df/89/59/df8959a1decb9a0c9dd2e6242459868d.jpg", "quantity": 5})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Product.objects.filter(name="Product 1").exists(), True)

    def test_list_products(self):
        response = self.client.get("/api/products/?search=Product 1")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_retrieve_product(self):
        url = f"/api/products/{self.product.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["id"], self.product.id)


class OrderTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser", email="test@example.com", password="password"
        )
        self.user2 = User.objects.create_user(
            username="testuser2", email="test2@example.com", password="password"
        )
        self.product = Product.objects.create(
            name="Product 1",
            description="desc",
            price=10,
            image_url=(
                "https://i.pinimg.com/736x/df/89/59/df8959a1decb9a0c9dd2e6242459868d.jpg"
            ),
            stock=5,
        )
        self.product2 = Product.objects.create(
            name="Product 2",
            description="desc",
            price=10,
            image_url=(
                "https://i.pinimg.com/736x/df/89/59/df8959a1decb9a0c9dd2e6242459868d.jpg"
            ),
            stock=5,
        )

    def test_create_order(self):
        # TODO: Validate the order can't have 2 items of the same product
        self.client.force_authenticate(user=self.user)
        payload = {"items": [{"product": self.product.id, "quantity": 2}]}
        response = self.client.post("/api/orders/", payload, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Order.objects.filter(user=self.user).count(), 1)
        self.assertEqual(OrderItem.objects.count(), 1)

    def test_order_detail(self):
        self.client.force_authenticate(user=self.user)
        order = Order.objects.create(user=self.user)
        OrderItem.objects.create(order=order, product=self.product, quantity=1)
        OrderItem.objects.create(order=order, product=self.product2, quantity=1)
        order_other_user = Order.objects.create(user=self.user2)
        OrderItem.objects.create(order=order_other_user, product=self.product, quantity=2)
        response = self.client.get(f"/api/orders/{order.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["items"]), 2)
        self.assertEqual(response.json()["id"], order.id)

    def test_delete_order(self):
        self.client.force_authenticate(user=self.user)
        order = Order.objects.create(user=self.user)
        OrderItem.objects.create(order=order, product=self.product, quantity=1)
        response = self.client.delete(f"/api/orders/{order.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Order.objects.count(), 0)

class SeedCommandTests(TestCase):
    def test_seed_command(self):
        out = StringIO()
        call_command("seed", stdout=out)
        self.assertEqual(Product.objects.count(), 3)
        self.assertEqual(Order.objects.count(), 1)

        # Running again should warn and not create duplicates
        warning_out = StringIO()
        call_command("seed", stdout=warning_out)
        self.assertIn("Seed data already exists.", warning_out.getvalue())
        self.assertEqual(Product.objects.count(), 3)
        self.assertEqual(Order.objects.count(), 1)

"""class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_user_registration(self):
        self.client = APIClient()
        response = client.post('/api/user/', {'username': 'testuser', 'email': 'test@example.com', 'password': 'password'})
        assert response.status_code == 201
        assert response.json()['username'] == 'testuser'
        assert response.json()['email'] == 'test@example.com'
        assert User.objects.filter(username='testuser').exists()

    def test_user_login(self):
        self.client = APIClient()
        User.objects.create_user(username='testuser', email='test@example.com', password='password')
        response = client.post('/api/token/', {'username': 'testuser', 'password': 'password'})
        assert response.status_code == 200
        assert response.json()['token']

    def test_get_user(self):
        self.client = APIClient()
        User.objects.create_user(username='testuser', email='test@example.com', password='password')
        response = client.get('/api/user/')
        assert response.status_code == 200
        assert response.json()['username'] == 'testuser'
        assert response.json()['email'] == 'test@example.com'
        assert User.objects.filter(username='testuser').exists()"""