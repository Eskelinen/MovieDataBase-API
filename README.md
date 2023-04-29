# FullstackProject2

API jonka avulla voi ottaa yhteyden elokuvatietokantaan. Data collectionina on käytetty MongoDB:n tarjoamaa valmista 'mflix' samplea.

API:lla ei ole tässä vaiheessa frontendiä, joten sen käyttäminen vaatii jonkun sovelluksen. Videoesimerkissäni käytän Postmania.

API:ssä on 5 eri reittiä:

GET https://fullstack-project2.onrender.com/api/leffat : Hakee 10 elokuvaa tietokannasta.

GET https://fullstack-project2.onrender.com/api/hae/:id : Hakee elokuvan tiedot id:n mukaan.

POST https://fullstack-project2.onrender.com/api/lisaa : Lisää elokuvan tietokantaan. Elokuvan nimi ja julkaisuvuosi annetaan pyynnön bodyssä.

PUT https://fullstack-project2.onrender.com/api/muokkaa/:id : Muokkaa id:n mukaan valitun elokuvan tietoja. Halutut muokkaukset annetaan pyynnön bodyssä.

DELETE https://fullstack-project2.onrender.com/api/poista/:id : Poistaa id:n mukaan valitun elokuvan.


Sovellus on ladattu Renderiin osoitteessa: https://fullstack-project2.onrender.com
