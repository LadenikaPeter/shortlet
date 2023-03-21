package com.example.shortletBackend.entities;

import lombok.*;

import javax.persistence.*;

@Entity @Getter @Setter
@ToString @AllArgsConstructor
@NoArgsConstructor
public class Amenities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean wifi;
    private boolean tv;
    private boolean kitchen;
    private boolean washer;
    private boolean freeParking;
    private boolean paidParking;

    private boolean airCondition;
    private boolean workSpace;
    private boolean pool;
    private boolean hotTub;
    private boolean patio;
    private boolean bbqGrill;
    private boolean outdoorDining;
    private boolean poolTable;
    private boolean fireplace;
    private boolean lakeAccess;
    private boolean beachAccess;
    private boolean outdoorShower;
    private boolean smokeAlarm;
    private boolean firstAidKit;
    private boolean fireExtinguisher;





}
