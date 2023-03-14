package com.example.shortletBackend.bootStrap;

import com.example.shortletBackend.entities.Apartments;
import com.example.shortletBackend.entities.Pictures;
import com.example.shortletBackend.entities.Users;
import com.example.shortletBackend.enums.State;
import com.example.shortletBackend.repositories.ApartmentRepo;
import com.example.shortletBackend.repositories.PicturesRepository;
import com.example.shortletBackend.repositories.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@AllArgsConstructor
@Component
public class bootStrap implements CommandLineRunner {
    private final ApartmentRepo apartmentRepo;
    private final PicturesRepository picturesRepository;
    private final UserRepo userRepo;
    @Override
    public void run(String... args) throws Exception {
        Users Admin= new Users();
        Admin.setName("Peter");
        Admin.setEmail("peter@gmail.com");
        userRepo.save(Admin);

        Apartments firstHouse= new Apartments();
        firstHouse.setAddress("Provincia di Leece, Italy ");
        firstHouse.setName("Italian dream home");
        firstHouse.setHouseRefCode(firstHouse.getAddress().substring(0, 3),1);
        firstHouse.setPrice(533);
        firstHouse.setRating(4.7);
        firstHouse.setState(State.VERIFIED);
        firstHouse.setMaxNoOfGuests(5);

        Pictures picture1 = new Pictures();
        picture1.setUrl("https://a0.muscache.com/im/pictures/83738e60-4654-4faa-af1a-f53d02acbe6c.jpg?im_w=1200 ");

        Pictures picture2 = new Pictures();
        picture2.setUrl("https://a0.muscache.com/im/pictures/69faa681-fb85-4817-86f6-9d727c3fe9d2.jpg?im_w=720");

        Pictures picture3 = new Pictures();
        picture3.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43244736/original/a7d388b9-c419-4d1f-8566-26590a847300.jpeg?im_w=1200 ");

        Pictures picture4 = new Pictures();
        picture4.setUrl("https://a0.muscache.com/im/pictures/f4df0d13-ab67-4ca7-bfb8-946b2dc3aa00.jpg?im_w=1200 ");

        Pictures picture5 = new Pictures();
        picture5.setUrl("https://a0.muscache.com/im/pictures/b2fa90f6-1cac-4013-a40b-7653cf4872dd.jpg?im_w=720");

//        firstHouse.getPictures().add(picture5);
        firstHouse.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{picture1,picture2,picture3,picture4,picture5})));
        firstHouse.setUsers(Admin);

        //2nd
        Apartments House2= new Apartments();
        House2.setAddress("Route de IOurika, Morocco");
        House2.setName(" A beautiful house in a beautiful country");
        House2.setHouseRefCode(House2.getAddress().substring(0,3),2);
        House2.setPrice(1371);
        House2.setRating(3.9);
        House2.setState(State.VERIFIED);
        House2.setMaxNoOfGuests(8);

        Pictures picture6 = new Pictures();

        picture6.setUrl("https://a0.muscache.com/im/pictures/6a9cae57-dfe1-4ea6-a570-84856e20d410.jpg?im_w=7200");


        Pictures picture7 = new Pictures();
        picture7.setUrl("https://a0.muscache.com/im/pictures/52737d90-1113-42c9-8787-0911ed7444dc.jpg?im_w=1200");

        Pictures picture8 = new Pictures();
        picture8.setUrl("https://a0.muscache.com/im/pictures/babc53a6-6934-463c-b8f7-85d45692fa76.jpg?im_w=720");

        Pictures picture9 = new Pictures();
        picture9.setUrl("https://a0.muscache.com/im/pictures/f7016064-1a7b-4be7-b9bd-a938d3f59b07.jpg?im_w=1200 ");

        Pictures picture10 = new Pictures();
        picture10.setUrl("https://a0.muscache.com/im/pictures/2a3f591a-a8b3-4ef9-b1bf-d988b2c3bff5.jpg?im_w=1200 ");

        House2.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{picture6,picture7,picture8,
        picture9,picture10})));
        House2.setUsers(Admin);
//        System.out.println(House2);



        //3rd
        Apartments House3= new Apartments();
        House3.setAddress("Santi Ferriol, Spain");
        House3.setName("Beautiful house with a view and a pool");
        House3.setHouseRefCode(House3.getAddress().substring(0,5),3);
        House3.setPrice(838);
        House3.setRating(5.0);
        House3.setState(State.VERIFIED);
        House3.setMaxNoOfGuests(3);

        Pictures picture11 = new Pictures();
        picture11.setUrl("https://a0.muscache.com/im/pictures/6e75f583-5c1f-41e8-b705-511dbffe92b5.jpg?im_w=1200 ");

        Pictures picture12 = new Pictures();
        picture12.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-48307356/original/8dd3d5c3-968b-414a-af09-9fdbf33212f7.jpeg?im_w=720 ");

        Pictures picture13 = new Pictures();
        picture13.setUrl("https://a0.muscache.com/im/pictures/2fc8c4b9-74ff-4a40-8fe7-acad214834e7.jpg?im_w=720 ");

        Pictures picture14 = new Pictures();
        picture14.setUrl("https://a0.muscache.com/im/pictures/4626d93b-e838-47c6-8b9b-01eee3e199e4.jpg?im_w=720 ");

        Pictures picture15 = new Pictures();
        picture15.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-48307356/original/7fd97148-3723-48d8-b2ca-b37dfe275ffd.jpeg?im_w=720 ");

        House3.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{picture11,picture12,picture13,picture14,picture15})));
        House3.setUsers(Admin);

        //4
        Apartments House4= new Apartments();
        House4.setAddress("AlHaouz, Morocco");
        House4.setName("Beach house with cabana and a pool");
        House4.setHouseRefCode(House4.getAddress().substring(0,3),4);
        House4.setPrice(734);
        House4.setRating(4.5);
        House4.setState(State.VERIFIED);
        House4.setMaxNoOfGuests(2);
        House4.setUsers(Admin);

        Pictures picture16 = new Pictures();
        picture16.setUrl("https://a0.muscache.com/im/pictures/11755737/cbefb5d6_original.jpg?im_w=1200 ");

        Pictures picture17 = new Pictures();
        picture17.setUrl("https://a0.muscache.com/im/pictures/11755725/f3d5fd5d_original.jpg?im_w=720 ");

        Pictures picture18 = new Pictures();
        picture18.setUrl("https://a0.muscache.com/im/pictures/11755759/3bfdf199_original.jpg?im_w=720 ");

        Pictures picture19 = new Pictures();
        picture19.setUrl("https://a0.muscache.com/im/pictures/11755763/53c0aaa9_original.jpg?im_w=720 ");

        Pictures picture20 = new Pictures();
        picture20.setUrl("https://a0.muscache.com/im/pictures/890deadc-040e-43b7-ad5a-2391ab90e314.jpg?im_w=720 ");

        House4.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{picture16,picture17,picture18,picture19,picture20})));



        Apartments House5= new Apartments();
        House5.setAddress("Naxos, Greece");
        House5.setName("A beautiful home over looking the beach");
        House5.setHouseRefCode(House5.getAddress().substring(0,3),5);
        House5.setPrice(1265);
        House5.setRating(4.7);
        House5.setMaxNoOfGuests(3);
        House5.setState(State.VERIFIED);
        House5.setUsers(Admin);

        Pictures picture21 = new Pictures();
        picture21.setUrl("https://a0.muscache.com/im/pictures/32233013/785da15f_original.jpg?im_w=1200 ");

        Pictures pictures22 = new Pictures();
        pictures22.setUrl("https://a0.muscache.com/im/pictures/32233110/70706ded_original.jpg?im_w=720 ");

        Pictures pictures23 = new Pictures();
        pictures23.setUrl("https://a0.muscache.com/im/pictures/32233356/fe6bbadd_original.jpg?im_w=720 ");

        Pictures pictures24 = new Pictures();
        pictures24.setUrl("https://a0.muscache.com/im/pictures/32233280/b60c45d8_original.jpg?im_w=720");

        Pictures pictures25 = new Pictures();
        pictures25.setUrl("https://a0.muscache.com/im/pictures/658f0839-9f2a-4bd5-a878-b25b5ef284fc.jpg?im_w=720 ");

        House5.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{picture21,pictures22,pictures23,pictures24,pictures25})));


        Apartments House6= new Apartments();
        House6.setAddress("Chania, Greece");
        House6.setName("A beutiful home with a large yard and a pool");
        House6.setHouseRefCode(House6.getAddress().substring(0,3),6);
        House6.setPrice(923);
        House6.setRating(5.0);
        House6.setState(State.VERIFIED);
        House6.setMaxNoOfGuests(4);
        House6.setUsers(Admin);

        Pictures pictures26 = new Pictures();
        pictures26.setUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-2631155/original/e5f83d80-6e85-4cdc-99b4-ae9cc89e7020.jpeg?im_w=1200 ");

        Pictures pictures27 = new Pictures();
        pictures27.setUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-2631155/original/cf757cd5-7375-4c33-9b58-55a91b512567.jpeg?im_w=720 ");

        Pictures pictures28 = new Pictures();
        pictures28.setUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-2631155/original/70cbf62d-e9cf-4c0e-ae2f-c3029f4cb94d.jpeg?im_w=720 ");

        Pictures pictures29 = new Pictures();
        pictures29.setUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-2631155/original/a164f978-39f4-484d-b544-e1da91b9d470.jpeg?im_w=720 ");

        Pictures pictures30 = new Pictures();
        pictures30.setUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-2631155/original/c19722b5-e048-4778-b4d3-4576c62e0b70.jpeg?im_w=720 ");

        House6.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures26,pictures27,pictures28,pictures29,pictures30})));

        Apartments House7= new Apartments();
        House7.setAddress("Lajita, Spain");
        House7.setName("A home atop a cliff");
        House7.setHouseRefCode(House7.getAddress().substring(0,3),7);
        House7.setPrice(182);
        House7.setRating(4.9);
        House7.setState(State.VERIFIED);
        House7.setMaxNoOfGuests(2);
        House7.setUsers(Admin);

        Pictures pictures33 = new Pictures();
        pictures33.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-49937547/original/0109bbe0-90ca-4645-8112-99b4544a372b.jpeg?im_w=1200 ");

        Pictures pictures31 = new Pictures();
        pictures31.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-50058763/original/2f6f2b10-447e-4486-adeb-9420341cb8ab.jpeg?im_w=720 ");

        Pictures pictures32 = new Pictures();
        pictures32.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-50058763/original/9ffcb84a-f773-4a03-8e78-7b42bda45107.jpeg?im_w=720 ");

        Pictures pictures34 = new Pictures();
        pictures34.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-50058763/original/8174450f-3d6b-4090-95f2-bc6582063c49.jpeg?im_w=720 ");

        Pictures pictures35 = new Pictures();
        pictures35.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-50058763/original/105f5096-1885-498e-88e3-5c7805700227.jpeg?im_w=720 ");

        House7.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures31,pictures32,pictures33,pictures35,pictures34})));

        Apartments House8= new Apartments();
        House8.setAddress("Mogan, Spain");
        House8.setName("A nice house with a luscious pool");
        House8.setHouseRefCode(House8.getAddress().substring(0,3),8);
        House8.setPrice(374);
        House8.setRating(5.0);
        House8.setState(State.VERIFIED);
        House8.setMaxNoOfGuests(8);
        House8.setUsers(Admin);

        Pictures pictures36 = new Pictures();
        pictures36.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-44272075/original/e9a6ab35-85b0-4ffb-b254-7901edf70aed.jpeg?im_w=1200");

        Pictures pictures37 = new Pictures();
        pictures37.setUrl("https://a0.muscache.com/im/pictures/b0e551a4-fd58-44ec-9be7-10f53da910ea.jpg?im_w=720 ");

        Pictures pictures38 = new Pictures();
        pictures38.setUrl("https://a0.muscache.com/im/pictures/2543a9bc-0f49-40c6-acf9-427367f1f5fe.jpg?im_w=720 ");

        Pictures pictures39 = new Pictures();
        pictures39.setUrl("https://a0.muscache.com/im/pictures/e995e3b0-c9cd-4ffb-aad4-0f76f4e00a0a.jpg?im_w=720 ");

        Pictures pictures40 = new Pictures();
        pictures40.setUrl("https://a0.muscache.com/im/pictures/05f93fe3-da99-485d-aada-f8224d714d97.jpg?im_w=720 ");

        House8.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures36,pictures37,pictures38,pictures39,pictures40})));

        Apartments House9= new Apartments();
        House9.setAddress("Lekki, Nigeria");
        House9.setName("A beautiful space that has a pool");
        House9.setHouseRefCode(House9.getAddress().substring(0,3),9);
        House9.setPrice(380);
        House9.setRating(5.0);
        House9.setState(State.VERIFIED);
        House9.setMaxNoOfGuests(6);
        House9.setUsers(Admin);

        Pictures pictures41 = new Pictures();
        pictures41.setUrl("https://a0.muscache.com/im/pictures/e17c7207-25e4-4824-a03b-d2b66847ebed.jpg?im_w=1200 ");

        Pictures pictures42 = new Pictures();
        pictures42.setUrl("https://a0.muscache.com/im/pictures/miso/Hosting-51327545/original/286568cd-c8aa-4665-a73d-ec6cd6884da6.jpeg?im_w=720 ");

        Pictures pictures43 = new Pictures("https://a0.muscache.com/im/pictures/miso/Hosting-51327545/original/c0cae2de-aaf1-4180-920d-cde5c0d9bb92.jpeg?im_w=720 ");


        Pictures pictures44 = new Pictures("https://a0.muscache.com/im/pictures/miso/Hosting-51327545/original/1975c982-9712-4fcd-8380-ff1ca1207f8c.jpeg?im_w=720 ");

        Pictures pictures45 = new Pictures("https://a0.muscache.com/im/pictures/miso/Hosting-51327545/original/430eaa3d-9a8a-45f9-b652-bb110ec0dd0b.jpeg?im_w=720 ");

        House9.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures41,pictures42,pictures43,pictures44,pictures45})));


        Apartments House10= new Apartments();
        House10.setAddress("Ikoyi, Nigeria");
        House10.setName("A nice home with a game room");
        House10.setHouseRefCode(House10.getAddress().substring(0,5),10);
        House10.setPrice(120);
        House10.setRating(3.9);
        House10.setState(State.VERIFIED);
        House10.setMaxNoOfGuests(5);
        House10.setUsers(Admin);

        Pictures pictures46 = new Pictures("https://a0.muscache.com/im/pictures/3e327003-1cb2-4113-89eb-dfc83de633a9.jpg?im_w=1200 ");


        Pictures pictures47 = new Pictures("https://a0.muscache.com/im/pictures/fd0aaf7a-2b3f-463a-9148-027724af9c8b.jpg?im_w=720 ");


        Pictures pictures48 = new Pictures("https://a0.muscache.com/im/pictures/6acb596f-8106-48a7-994f-7ba7e70eaf89.jpg?im_w=720 ");

        Pictures pictures49 = new Pictures("https://a0.muscache.com/im/pictures/23379e50-b3c9-42dc-9e78-6aba9c9a1449.jpg?im_w=720 ");

        Pictures pictures50 = new Pictures("https://a0.muscache.com/im/pictures/f0e93743-59be-4a53-b4de-118103b44ff5.jpg?im_w=720 ");

        House10.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures46,pictures47,pictures48,pictures49,pictures50})));

        Apartments House11= new Apartments();
        House11.setAddress("Avendia Juan carlos , Spain ");
        House11.setName("A spanish villa overlooking the beach");
        House11.setHouseRefCode(House11.getAddress().substring(0,3),11);
        House11.setPrice(445);
        House11.setRating(3.9);
        House11.setState(State.VERIFIED);
        House11.setMaxNoOfGuests(4);
        House11.setUsers(Admin);

        Pictures pictures51 = new Pictures("https://a0.muscache.com/im/pictures/ba8d2e6f-968a-4fde-a21b-c56bdd60556c.jpg?im_w=1200 ");

        Pictures pictures52 = new Pictures("https://a0.muscache.com/im/pictures/2864374b-2833-43da-96b6-5b47c8dcd6fa.jpg?im_w=720 ");


        Pictures pictures53 = new Pictures("https://a0.muscache.com/im/pictures/miso/Hosting-594589887674215403/original/b604bcfc-7251-4f5e-a40e-e4d97c6b840f.jpeg?im_w=720 ");


        Pictures pictures54 = new Pictures("https://a0.muscache.com/im/pictures/177fdf77-8e87-422b-b1a1-dab439393c84.jpg?im_w=720 ");


        Pictures pictures55 = new Pictures("https://a0.muscache.com/im/pictures/80da7330-2992-48c5-b6c6-dd3cf6797a8c.jpg?im_w=720 ");


        House11.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures51,pictures52,pictures53,pictures54,pictures55})));


        Apartments House12= new Apartments();
        House12.setAddress("Milopotas, Greece");
        House12.setName("A beautiful spot for stargazing ");
        House12.setHouseRefCode(House12.getAddress().substring(0,3),12);
        House12.setPrice(962);
        House12.setRating(5.0);
        House12.setState(State.VERIFIED);
        House12.setMaxNoOfGuests(10);
        House12.setUsers(Admin);

        Pictures pictures56 = new Pictures("https://a0.muscache.com/im/pictures/74192cff-0e84-43fc-ac8c-1c5a98039ca8.jpg?im_w=1200");


        Pictures pictures57 = new Pictures("https://a0.muscache.com/im/pictures/8981847a-d41b-446f-8c71-99bc4eb77fba.jpg?im_w=720 ");


        Pictures pictures58 = new Pictures("https://a0.muscache.com/im/pictures/2ecb5e87-d1bf-418f-a89e-5a090d92dfc6.jpg?im_w=720 ");


        Pictures pictures59 = new Pictures("https://a0.muscache.com/im/pictures/a500265f-2414-47d1-b521-d99d126a53b3.jpg?im_w=720 ");


        Pictures pictures60 = new Pictures("https://a0.muscache.com/im/pictures/db09b862-4a15-4f3b-94a9-814eadb1492f.jpg?im_w=720 ");

        House12.getPictures().addAll(new ArrayList<>(Arrays.asList(new Pictures[]{pictures56,pictures57,pictures58,pictures59,pictures60})));


        ArrayList<Apartments> houseCollection = new ArrayList<>(Arrays.asList(new Apartments[]{firstHouse,House2,
        House3,House4,House5,House6,House7,House8,House9,House10,House11,House12})) ;
        ArrayList<Pictures> picturesCollection = new ArrayList<>(Arrays.asList(new Pictures[]{picture1, picture2, picture3, picture4,
                picture5,picture6,picture7,picture8,picture9,picture10,picture11,picture12,picture13,picture14,picture15,
        picture16,picture17,picture18,picture19,picture20,picture21,pictures22,pictures23,pictures24,pictures25,pictures26,
        pictures27,pictures28,pictures29,pictures30,pictures31,pictures32,pictures33,pictures34,pictures35,pictures36,pictures37,
        pictures38,pictures39,pictures40,pictures41,pictures42,pictures43,pictures44,pictures45,pictures46,pictures47,pictures48,
        pictures49,pictures50,pictures51,pictures52,pictures53,pictures54,pictures55,pictures56,pictures57,pictures58,pictures59,
        pictures60})) ;

//        System.out.println(Admin);
//        System.out.println(House2);

        Admin.getApartmentsSet().addAll(new ArrayList<>(Arrays.asList(new Apartments[]{firstHouse,House2,House3,House4,House5
                ,House6,House7,House8,House9,House10,House11,House12})));

        picturesRepository.saveAll(picturesCollection);
        userRepo.save(Admin);
        apartmentRepo.saveAll(houseCollection);


        System.out.println("house..........."+House2);
        System.out.println("user ......."+Admin);
//        System.out.println(House3);

//        picturesRepository.saveAll(Collection);
//        house.getPictures().add(pictures);
//        picturesRepository.save(pictures);
//
//        apartmentRepo.save(house);
    }
}
