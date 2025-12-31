package com.cabinet.medical.admin.dto.request;

import lombok.Data;

@Data
public class CabinetRequest {
    private String nom;
    private String adresse;
    private String tel;
    private String logo;
    private Long specialiteId;
}