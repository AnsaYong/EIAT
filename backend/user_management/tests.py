from django.test import TestCase
from .models import User


class UserModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(
            username="testuser", email="testuser@example.com", password="password123"
        )
        self.assertEqual(user.username, "testuser")
        self.assertTrue(user.check_password("password123"))
