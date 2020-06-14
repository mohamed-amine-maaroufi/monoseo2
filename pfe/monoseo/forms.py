from django import forms
from monoseo.models import UserProfileInfo
from django.contrib.auth.models import User


class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())
    class Meta():
        model = User

        widgets = {

            'password': forms.TextInput(attrs={'class': 'form-control'}),
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.TextInput(attrs={'class': 'form-control', 'required': 'true'}),
        }
        fields = ('username','email','password')



class UserProfileInfoForm(forms.ModelForm):
     class Meta():
         model = UserProfileInfo
         widgets = {
             'societe': forms.TextInput(attrs={'class': 'form-control'}),
             'tel': forms.TextInput(attrs={'class': 'form-control'}),
             'adresse': forms.TextInput(attrs={'class': 'form-control'}),
         }

         fields = ('societe','tel','adresse')


