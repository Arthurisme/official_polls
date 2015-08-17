from django.conf.urls import include, url
from django.contrib import admin
from polls import views

urlpatterns = [

    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^polls/', include('polls.urls', namespace="polls")),
    url(r'^fill/', include('fill.urls', namespace="fill")),
    url(r'^admin/', include(admin.site.urls)),
]