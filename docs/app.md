# Nome do Aplicativo: 
Podcast Maanager

### Dominío:
Podcasts feitos em vídeos

### Descrição:
Um app ao estilo Netflix aonde eu possa centralizar diferentes episódios de podcasts separados por categoria

### Funcionalidades:
- Listar os episódios de podcasts em sessões de categorias
    -Saúde, fitness, mentalidade, humor
-Filtrar episódios de podcast por nome de podcast

## Como:

### Feature:
 Listar os episódios de podcasts em sessões de categorias
   
### Como vou implementar:
 GET: retorna lista de episódios baseado em um parametro enviado pelo client do nome do podcast

 response:

    ```js
    [
    {
        podcastName: "flow",
        episode: "CBUM - Flow #319",
        videoId: "pQSuQmUfS30",
        thumbnail: "https://i.ytimg.com/vi/pQSuQmUfS30/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCeNGQeHGq3EN9VBoh7CCsKQU0L4Q",
        link: "https://www.youtube.com/live/pQSuQmUfS30?si=hXjqjS3GA2wYkGxl",
        category: ["saude", "fitness"]
        
    },
     {
        podcastName: "flow",
        episode: "RAUL SENA - Flow #651",
        videoId: "DBc68IpXt5U",
        thumbnail: "https://i.ytimg.com/vi/DBc68IpXt5U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAs_LPz7zc5vCemJT3gvJXFXqfIPA",
        link: "https://www.youtube.com/live/DBc68IpXt5U?si=Qoepphj4wOe8oBLk",
        category: ["politica", "mentalidade"]
        
    }
    ]```