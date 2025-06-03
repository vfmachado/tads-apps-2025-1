Duas pilhas principais:
    MainStack (Home + Profile)
    AuthStack (Login + Register)

Fluxo de Navegação:
    O aplicativo inicia em AuthStack (Login/Register).
    Após o login, navega para MainStack (Home/Profile).
    A partir de Home, os usuários podem ir para Profile.
    Em Profile, os usuários podem fazer logout e retornar para AuthStack.