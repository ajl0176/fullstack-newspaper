from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    DRAFT = 'DT'
    SUBMITTED = 'SB'
    PUBLISHED = 'PB'

    ENTERTAINMENT = 'ET'
    EDITORIALS = 'ED'
    SPORTS = 'SP'

    STATUS = {
    (DRAFT, 'Draft'),
    (SUBMITTED, 'Submitted'),
    (PUBLISHED, 'Published')
    }

    CATEGORY = {
    (ENTERTAINMENT, 'Entertainment'),
    (EDITORIALS, 'Editorials'),
    (SPORTS, 'Sports')
    }

    title = models.CharField(max_length=255)
    body = models.TextField()
    category = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    headliners = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="articles/", blank=True, null=True)


    def __str__(self):
        return self.title
