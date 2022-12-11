# testtodo

Телеграм @nothinfgfeels, kobyakovatamarah@gmail.com

### 1. Что должно получиться при успешном запуске:

![image](https://user-images.githubusercontent.com/64412561/206899632-f98f7e5a-7e2d-48ce-a713-a646d4c5cb95.png)

Пароль и логин (те что на экране) - логин: olivier@mail.com , пароль: 12345

### 2. Как запустить

1. В папке **backend** открыть **2 окна** консоли.
Потому как будут запущены 2 сервера (один для авторизации и другой для заданий todo list'a - оба json-server)/

1) Установим модули для бэка

```npm i```

2) В первом окне прописать (директория backend):

``` npx json-server --watch info.json -p 3000 ```

![image](https://user-images.githubusercontent.com/64412561/206899965-ff7b29ce-7582-4a56-ac1c-7167a4ce467f.png)


3) Во втором окне прописать (директория backend):

``` npx json-server db.json -m ./node_modules/json-server-auth -p 4000 ```

![image](https://user-images.githubusercontent.com/64412561/206899986-6f49a20b-4b4f-4680-84fb-de2a35c846b3.png)

4) Фронтенд запускать "как обычно" (директория frontend):
![image](https://user-images.githubusercontent.com/64412561/206899942-f84b3ada-b22b-4bbf-a59b-455d5a8ed0ad.png)

```npm i```
 ```npm run start```

Итого
![image](https://user-images.githubusercontent.com/64412561/206900036-4a1c59d4-12ae-4517-a974-a2e5150e72a0.png)
